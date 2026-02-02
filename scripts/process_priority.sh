#!/usr/bin/env bash
set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOWNLOADS_DIR="$PROJECT_ROOT/downloads/countries"
SHAPEFILE="$DOWNLOADS_DIR/ne_10m_admin_0_countries.shp"
OUT_DIR="$PROJECT_ROOT/public/assets/geoguru/borders"
TMP_DIR="$PROJECT_ROOT/tmp_shapes_priority"

mkdir -p "$OUT_DIR" "$TMP_DIR"

# Priority Codes: Easy + Some Medium
CODES="us gb fr de it jp cn ru br ca au in kr es mx"

echo "Using Shapefile: $SHAPEFILE"

for code in $CODES; do
  UPPER=$(echo $code | tr 'a-z' 'A-Z')
  echo "Priority Processing: $UPPER"
  
  if [ -f "$SHAPEFILE" ]; then
      ogr2ogr -f GeoJSON "$TMP_DIR/$code.geojson" "$SHAPEFILE" -where "ISO_A2='$UPPER'"
      
      if [ -f "$TMP_DIR/$code.geojson" ]; then
          mapshaper "$TMP_DIR/$code.geojson" -simplify 10% -o format=svg "$TMP_DIR/$code.svg"
          
          if [ -f "$TMP_DIR/$code.svg" ]; then
            magick convert -background none -density 300 "$TMP_DIR/$code.svg" -resize 512x512 -gravity center -extent 512x512 -quality 85 "$OUT_DIR/$code.webp"
          fi
      fi
  else
      echo "Shapefile not found!"
      exit 1
  fi
done

rm -rf "$TMP_DIR"
echo "Priority assets generated."
