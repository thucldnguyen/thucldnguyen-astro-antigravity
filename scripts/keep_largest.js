import fs from 'fs';

const file = process.argv[2];
if (!file) {
    console.error("Usage: node keep_largest.js <geojson_file>");
    process.exit(1);
}

try {
    const raw = fs.readFileSync(file, 'utf8');
    const geo = JSON.parse(raw);

    let largestPolygon = null;
    let maxArea = -1;

    // Shoelace formula for polygon area (simple planar approximation)
    // Sufficient for distinguishing massive landmass from islands
    function getArea(coords) {
        let area = 0;
        for (let i = 0; i < coords.length; i++) {
            const [x1, y1] = coords[i];
            const [x2, y2] = coords[(i + 1) % coords.length];
            area += (x1 * y2 - x2 * y1);
        }
        return Math.abs(area) / 2;
    }

    // Helper to request processing
    function processPolygon(rings, properties) {
        if (!rings || rings.length === 0) return;
        // Ring 0 is outer
        const outer = rings[0];
        const area = getArea(outer);

        if (area > maxArea) {
            maxArea = area;
            largestPolygon = {
                type: 'Polygon',
                coordinates: rings, // Keep holes if any
                properties: properties
            };
        }
    }

    const features = geo.features || (geo.type === 'Feature' ? [geo] : []);

    features.forEach(f => {
        if (!f.geometry) return;

        if (f.geometry.type === 'Polygon') {
            processPolygon(f.geometry.coordinates, f.properties);
        } else if (f.geometry.type === 'MultiPolygon') {
            f.geometry.coordinates.forEach(polyCoords => {
                processPolygon(polyCoords, f.properties);
            });
        }
    });

    if (largestPolygon) {
        // Construct new GeoJSON
        const newGeo = {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: largestPolygon.properties,
                geometry: {
                    type: 'Polygon',
                    coordinates: largestPolygon.coordinates
                }
            }]
        };
        fs.writeFileSync(file, JSON.stringify(newGeo));
        console.log(`[KeepLargest] Kept polygon with area index ${maxArea.toFixed(2)}`);
    } else {
        console.warn("[KeepLargest] No polygons found.");
    }
} catch (e) {
    console.error("[KeepLargest] Error:", e);
    process.exit(1);
}
