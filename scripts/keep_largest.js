import fs from 'fs';

const file = process.argv[2];
const thresholdRatio = parseFloat(process.argv[3]) || 1.0;

if (!file) {
    console.error("Usage: node keep_largest.js <geojson_file> [threshold_ratio]");
    process.exit(1);
}

try {
    const raw = fs.readFileSync(file, 'utf8');
    const geo = JSON.parse(raw);

    let allPolygons = [];

    // Shoelace formula for polygon area
    function getArea(coords) {
        let area = 0;
        for (let i = 0; i < coords.length; i++) {
            const [x1, y1] = coords[i];
            const [x2, y2] = coords[(i + 1) % coords.length];
            area += (x1 * y2 - x2 * y1);
        }
        return Math.abs(area) / 2;
    }

    function collectPolygon(rings, properties) {
        if (!rings || rings.length === 0) return;
        const outer = rings[0];
        const area = getArea(outer);
        allPolygons.push({
            type: 'Polygon',
            coordinates: rings,
            properties: properties,
            area: area
        });
    }

    const features = geo.features || (geo.type === 'Feature' ? [geo] : []);

    features.forEach(f => {
        if (!f.geometry) return;

        if (f.geometry.type === 'Polygon') {
            collectPolygon(f.geometry.coordinates, f.properties);
        } else if (f.geometry.type === 'MultiPolygon') {
            f.geometry.coordinates.forEach(polyCoords => {
                collectPolygon(polyCoords, f.properties);
            });
        }
    });

    if (allPolygons.length > 0) {
        // Find max area
        allPolygons.sort((a, b) => b.area - a.area);
        const maxArea = allPolygons[0].area;
        const cutoff = maxArea * thresholdRatio;

        // Filter
        const kept = allPolygons.filter(p => p.area >= cutoff);

        console.log(`[KeepLargest] Max Area: ${maxArea.toFixed(2)}. Threshold: ${thresholdRatio} (Cutoff: ${cutoff.toFixed(2)}). Kept ${kept.length}/${allPolygons.length} polygons.`);

        // Determine output type (Polygon if 1, MultiPolygon if > 1)
        let newGeometry;
        if (kept.length === 1) {
            newGeometry = {
                type: 'Polygon',
                coordinates: kept[0].coordinates
            };
        } else {
            newGeometry = {
                type: 'MultiPolygon',
                coordinates: kept.map(p => p.coordinates)
            };
        }

        const newGeo = {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: kept[0].properties, // Inherit form largest
                geometry: newGeometry
            }]
        };

        fs.writeFileSync(file, JSON.stringify(newGeo));
    } else {
        console.warn("[KeepLargest] No polygons found.");
    }
} catch (e) {
    console.error("[KeepLargest] Error:", e);
    process.exit(1);
}
