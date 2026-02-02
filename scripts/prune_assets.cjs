const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets/geoguru/borders');
const COUNTRIES_FILE = path.join(__dirname, '../src/components/GeoGuru/countries.ts');
const MIN_SIZE_BYTES = 1200; // 1.2KB threshold (Fr was ~1.2KB, so we need to be careful. Maybe 1KB?)
// Let's use 1000 bytes. 
// Note: "Yellow" style might be larger than "Black".
// We will dry-run or check first.

function prune() {
    console.log("--- Pruning Assets ---");

    // 1. Scan Assets
    const files = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.webp'));
    console.log(`Found ${files.length} asset files.`);

    const validCodes = new Set();
    let deletedCount = 0;

    files.forEach(file => {
        const filePath = path.join(ASSETS_DIR, file);
        const stats = fs.statSync(filePath);
        const code = file.replace('.webp', '');

        if (stats.size < 1000) {
            console.log(`[DELETE] ${file} (${stats.size} bytes) - Too small`);
            fs.unlinkSync(filePath);
            deletedCount++;
        } else {
            validCodes.add(code);
        }
    });

    console.log(`Deleted ${deletedCount} files.`);
    console.log(`Remaining valid assets: ${validCodes.size}`);

    // 2. Update countries.ts
    let content = fs.readFileSync(COUNTRIES_FILE, 'utf8');

    // Regex to match the export const COUNTRIES = [ ... ]; block
    // We will parse the array content manually or using regex replacement on lines.

    // Strategy: Read line by line. If a line defines an object "code": "xx", check if xx is in validCodes.
    // If not, skip that block.

    // Actually, the file format is:
    // export const COUNTRIES: Country[] = [
    //   {
    //     "code": "ad",
    //     "name": "Andorra"
    //   },
    // ...
    // ];

    // We can assume standard formatting from my edit.

    const lines = content.split('\n');
    const newLines = [];
    let keepingCurrent = true;
    let currentCode = null;
    let buffer = [];

    let insideList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.includes('export const COUNTRIES')) {
            insideList = true;
            newLines.push(line);
            continue;
        }

        if (!insideList) {
            newLines.push(line);
            continue;
        }

        // Inside list
        if (line.trim() === '];') {
            insideList = false;
            // Flush any buffer?
            if (buffer.length > 0 && keepingCurrent) {
                newLines.push(...buffer);
            }
            newLines.push(line);
            continue;
        }

        // Start of object
        if (line.trim() === '{') {
            // Flush previous buffer if it was valid
            if (buffer.length > 0 && keepingCurrent) {
                newLines.push(...buffer);
            }
            buffer = [line];
            keepingCurrent = false; // default to drop until validated
            currentCode = null;
        }
        else if (line.trim() === '},' || line.trim() === '}') {
            buffer.push(line);
            if (keepingCurrent) {
                newLines.push(...buffer);
            }
            buffer = [];
        }
        else {
            buffer.push(line);
            // Check for code
            const codeMatch = line.match(/"code":\s*"(..)"/);
            if (codeMatch) {
                currentCode = codeMatch[1];
                if (validCodes.has(currentCode)) {
                    keepingCurrent = true;
                } else {
                    // console.log(`[DROP ENTRY] ${currentCode} - No valid asset`);
                }
            }
        }
    }

    // Write back
    fs.writeFileSync(COUNTRIES_FILE, newLines.join('\n'));
    console.log("Updated countries.ts");
}

prune();
