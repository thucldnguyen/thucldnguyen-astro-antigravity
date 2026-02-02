
async function checkUrl(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${url}: ${res.status}`);
    } catch (e) {
        console.log(`${url}: Error ${e.message}`);
    }
}

async function checkCodes() {
    const res = await fetch('https://flagcdn.com/en/codes.json');
    const data = await res.json();
    console.log('Sample Code (VN):', data.vn);
    console.log('Sample Code (US):', data.us);
}

// Test Potential Waving URLs
await checkUrl('https://flagcdn.com/256x192/ua.png');
await checkUrl('https://flagcdn.com/waving/ua.png');
await checkUrl('https://flagpedia.net/data/flags/w580/ua.png'); // Common pattern
await checkUrl('https://flagpedia.net/data/flags/normal/ua.png');
await checkUrl('https://flagpedia.net/data/flags/waving/ua.png');
await checkUrl('https://flagpedia.net/data/flags/w704/ua.png'); // Another common size
await checkUrl('https://flagpedia.net/data/flags/h240/ua.png');

await checkCodes();
