#!/usr/bin/env bash
set -euo pipefail

# --- CONFIGURATION ---
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOWNLOADS_DIR="${DOWNLOADS_DIR:-$PROJECT_ROOT/downloads/countries}"
SHAPEFILE_NAME="${SHAPEFILE_NAME:-ne_10m_admin_0_countries.shp}"
SHAPEFILE_PATH="$DOWNLOADS_DIR/$SHAPEFILE_NAME"
OUT_DIR="$PROJECT_ROOT/public/assets/geoguru/borders"
TMP_DIR="$PROJECT_ROOT/tmp_shapes_fix"

# Target problematic codes (skewed by islands/colonies)
# US: Alaska/Hawaii make mainland small
# FR: Guiana makes mainland small
# CA: Arctic islands
# ES: Canaries
# PT: Azores
# NO: Svalbard
# RU: Islands
CODES="us fr ru ca es pt no"

echo "--- GeoGuru Shape Fixer (Largest Polygon) ---"
echo "Targets: $CODES"

mkdir -p "$OUT_DIR" "$TMP_DIR"

for code in $CODES; do
    UPPER=$(echo $code | tr 'a-z' 'A-Z')
    echo "Processing $UPPER..."
    
    # 1. Extract Raw GeoJSON
    # Use OR logic for France/Norway support
    ogr2ogr -f GeoJSON "$TMP_DIR/$code.geojson" "$SHAPEFILE_PATH" -where "ISO_A2='$UPPER' OR ISO_A2_EH='$UPPER'"
    
    if [ ! -s "$TMP_DIR/$code.geojson" ]; then
        echo "  [WARN] No data for $UPPER"
        continue
    fi
    
    # 2. Filter using Node script (Reliable "Keep Largest")
    node scripts/keep_largest.js "$TMP_DIR/$code.geojson"

    # 3. Mapshaper for Styling only
    mapshaper "$TMP_DIR/$code.geojson" \
        -simplify 10% \
        -style fill='#FFD700' stroke='#000000' stroke-width=6 \
        -o format=svg width=1024 "$TMP_DIR/$code.svg"
        
    # 3. Convert to WebP
    if [ -f "$TMP_DIR/$code.svg" ]; then
        magick convert -background none -density 300 \
            "$TMP_DIR/$code.svg" \
            -resize 512x512 \
            -gravity center -extent 512x512 \
            -quality 85 \
            "$OUT_DIR/$code.webp"
        echo "  -> Fixed: $OUT_DIR/$code.webp"
    else
        echo "  [FAIL] SVG not generated for $UPPER"
    fi
done

echo "--- Cleanup ---"
rm -rf "$TMP_DIR"
