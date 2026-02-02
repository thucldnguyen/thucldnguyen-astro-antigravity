#!/usr/bin/env bash
set -euo pipefail

# --- CONFIGURATION ---
# Default paths (can be overridden by env vars)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOWNLOADS_DIR="${DOWNLOADS_DIR:-$PROJECT_ROOT/downloads/countries}"
SHAPEFILE_NAME="${SHAPEFILE_NAME:-ne_10m_admin_0_countries.shp}"
SHAPEFILE_PATH="$DOWNLOADS_DIR/$SHAPEFILE_NAME"
OUT_DIR="$PROJECT_ROOT/public/assets/geoguru/borders"
TMP_DIR="$PROJECT_ROOT/tmp_shapes"
COUNTRIES_FILE="$PROJECT_ROOT/src/components/GeoGuru/countries.ts"

SIZE=512
SIMPLIFY_PERCENT="10%"

# --- DEPENDENCY CHECK ---
check_deps() {
    local missing=0
    if ! command -v ogr2ogr &> /dev/null; then
        echo "Error: 'ogr2ogr' (GDAL) is not installed."
        missing=1
    fi
    if ! command -v mapshaper &> /dev/null; then
        echo "Error: 'mapshaper' is not installed. Run: npm install -g mapshaper"
        missing=1
    fi
    if ! command -v magick &> /dev/null; then
        echo "Error: 'magick' (ImageMagick) is not installed. Run: brew install imagemagick"
        missing=1
    fi
    
    if [ $missing -eq 1 ]; then
        exit 1
    fi
}

# --- MAIN ---
main() {
    check_deps

    echo "--- GeoGuru Border Processor ---"
    echo "Input Shapefile: $SHAPEFILE_PATH"
    echo "Output Directory: $OUT_DIR"
    
    if [ ! -f "$SHAPEFILE_PATH" ]; then
        echo "Error: Shapefile not found at $SHAPEFILE_PATH"
        echo "Please place the Natural Earth shapefiles in $DOWNLOADS_DIR"
        exit 1
    fi

    mkdir -p "$OUT_DIR" "$TMP_DIR"

    # Extract codes from typescript file
    # Pattern: "code": "xx",
    echo "Reading country codes from $COUNTRIES_FILE..."
    # We use tr to uppercase because the shapefile matches usually on ISO_A2 uppercase,
    # but our internal codes are lowercase. We need both.
    # Actually, ne_10m_admin_0_countries usually uses ISO_A2 (uppercase).
    
    # Get list of lowercase codes from file
    CODES_LOWER=$(sed -n 's/.*"code": "\(..\)",.*/\1/p' "$COUNTRIES_FILE")
    
    for code_lower in $CODES_LOWER; do
        code_upper=$(echo "$code_lower" | tr 'a-z' 'A-Z')
        
        echo "Processing $code_upper ($code_lower)..."
        
        # 1. Extract GeoJSON
        # We catch errors here in case a code doesn't exist in the shapefile (e.g. some custom codes)
        if ! ogr2ogr -f GeoJSON "$TMP_DIR/$code_lower.geojson" "$SHAPEFILE_PATH" -where "ISO_A2='${code_upper}'" -skipfailures; then
            echo "  [WARN] Failed to extract $code_upper. Skipping."
            continue
        fi

        # Check if file is empty or valid logic (ogr2ogr might produce empty file if no match)
        if [ ! -s "$TMP_DIR/$code_lower.geojson" ]; then
             echo "  [WARN] No data found for $code_upper. Skipping."
             rm -f "$TMP_DIR/$code_lower.geojson"
             continue
        fi

        # 2. Simplify and Convert to SVG with mapshaper
        # -proj wgs84 ensures proper projection if not already
        mapshaper "$TMP_DIR/$code_lower.geojson" \
            -simplify "$SIMPLIFY_PERCENT" \
            -o format=svg "$TMP_DIR/$code_lower.svg"

        # 3. Convert SVG to WebP with ImageMagick
        # -trim removes extra whitespace? Maybe. 
        # But we want consistent sizing. The user script used -gravity center -extent.
        # We need to make sure the SVG exists first.
        if [ -f "$TMP_DIR/$code_lower.svg" ]; then
            magick convert -background none -density 300 \
                "$TMP_DIR/$code_lower.svg" \
                -resize "${SIZE}x${SIZE}" \
                -gravity center -extent "${SIZE}x${SIZE}" \
                -quality 85 \
                "$OUT_DIR/$code_lower.webp"
            
            echo "  -> Saved: $OUT_DIR/$code_lower.webp"
        else
            echo "  [WARN] SVG generation failed for $code_upper."
        fi
    done

    echo "--- Done! ---"
    echo "Cleaning up temp files..."
    rm -rf "$TMP_DIR"
}

main
