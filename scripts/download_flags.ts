
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FLAGS_DIR = path.resolve(__dirname, '../public/assets/geoguru/flags');
const CODES_URL = 'https://flagcdn.com/en/codes.json';
const BASE_IMAGE_URL = 'https://flagpedia.net/data/flags/w580'; // Bigger & nicer than flagcdn w320

async function downloadFlags() {
    console.log('Fetching country codes...');
    const response = await fetch(CODES_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch codes: ${response.statusText}`);
    }
    const codes = await response.json();

    // Create directory if it doesn't exist
    if (!fs.existsSync(FLAGS_DIR)) {
        fs.mkdirSync(FLAGS_DIR, { recursive: true });
    }

    // Filter keys: 2 letters only (excludes us-tx, etc.)
    const countryCodes = Object.keys(codes).filter(code => code.length === 2);

    console.log(`Found ${countryCodes.length} countries. Starting download...`);

    let successCount = 0;
    let failCount = 0;

    // Process in chunks to avoid overwhelming the server
    const CHUNK_SIZE = 10;
    for (let i = 0; i < countryCodes.length; i += CHUNK_SIZE) {
        const chunk = countryCodes.slice(i, i + CHUNK_SIZE);

        await Promise.all(chunk.map(async (code) => {
            try {
                const imageUrl = `${BASE_IMAGE_URL}/${code}.png`;
                const destPath = path.join(FLAGS_DIR, `${code}.png`);

                // Skip if already exists? NO, we want to overwrite with bigger flags.
                // if (fs.existsSync(destPath)) {
                //     successCount++;
                //     return;
                // }

                const imgRes = await fetch(imageUrl);
                if (!imgRes.ok) throw new Error(`Status ${imgRes.status}`);

                const buffer = Buffer.from(await imgRes.arrayBuffer());
                fs.writeFileSync(destPath, buffer);
                successCount++;
                // minimal log
                process.stdout.write('.');
            } catch (err) {
                console.error(`\nFailed to download ${code}:`, err);
                failCount++;
            }
        }));
    }

    console.log(`\n\nDownload complete! Success: ${successCount}, Failed: ${failCount}`);

    // Generate countries.ts
    console.log('Generating countries.ts...');
    const countriesData = countryCodes.map(code => ({
        code,
        name: codes[code]
    }));

    const fileContent = `export interface Country {
  code: string;
  name: string;
}

export const COUNTRIES: Country[] = ${JSON.stringify(countriesData, null, 2)};
`;

    const countriesFilePath = path.resolve(__dirname, '../src/components/GeoGuru/countries.ts');
    fs.writeFileSync(countriesFilePath, fileContent);
    console.log(`Updated ${countriesFilePath}`);
}

downloadFlags().catch(console.error);
