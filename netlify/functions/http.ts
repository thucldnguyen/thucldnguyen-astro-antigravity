const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export function jsonResponse(payload: unknown, status = 200): Response {
    return new Response(JSON.stringify(payload), {
        status,
        headers: {
            ...CORS_HEADERS,
            'Content-Type': 'application/json',
        },
    });
}

export function optionsResponse(allowedMethods: string): Response {
    return new Response(null, {
        status: 204,
        headers: {
            ...CORS_HEADERS,
            'Access-Control-Allow-Methods': allowedMethods,
        },
    });
}
