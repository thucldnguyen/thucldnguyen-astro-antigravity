import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

interface ReactionData {
    likes: number;
    likedIPs: string[];
    lastUpdated: string;
}

interface RateLimitData {
    count: number;
    resetTime: number;
}

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REACTIONS_PER_HOUR = 10;

export default async (req: Request, context: Context) => {
    const store = getStore('reactions');
    const clientIP = context.ip;

    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    try {
        if (req.method === 'GET') {
            // Get reaction counts for a thought
            const url = new URL(req.url);
            const thoughtId = url.searchParams.get('thoughtId');

            if (!thoughtId) {
                return new Response(JSON.stringify({ error: 'thoughtId required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const data = await store.get(thoughtId, { type: 'json' }) as ReactionData | null;
            const reactions = data || { likes: 0, likedIPs: [], lastUpdated: new Date().toISOString() };

            // Check if current IP has liked
            const hasLiked = reactions.likedIPs.includes(clientIP);

            return new Response(
                JSON.stringify({
                    likes: reactions.likes,
                    hasLiked,
                }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
        }

        if (req.method === 'POST') {
            // Add a reaction
            const body = await req.json();
            const { thoughtId, action } = body;

            if (!thoughtId || action !== 'like') {
                return new Response(JSON.stringify({ error: 'Invalid request' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            // Rate limiting check
            const rateLimitKey = `ratelimit:${clientIP}`;
            const rateLimitData = await store.get(rateLimitKey, { type: 'json' }) as RateLimitData | null;
            const now = Date.now();

            if (rateLimitData) {
                if (now < rateLimitData.resetTime) {
                    if (rateLimitData.count >= MAX_REACTIONS_PER_HOUR) {
                        return new Response(
                            JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }),
                            {
                                status: 429,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                },
                            }
                        );
                    }
                }
            }

            // Get current reaction data
            const data = await store.get(thoughtId, { type: 'json' }) as ReactionData | null;
            const reactions = data || { likes: 0, likedIPs: [], lastUpdated: new Date().toISOString() };

            // Check if already liked
            if (reactions.likedIPs.includes(clientIP)) {
                return new Response(
                    JSON.stringify({
                        likes: reactions.likes,
                        hasLiked: true,
                        message: 'Already liked',
                    }),
                    {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }
                );
            }

            // Add like
            reactions.likes += 1;
            reactions.likedIPs.push(clientIP);
            reactions.lastUpdated = new Date().toISOString();

            await store.setJSON(thoughtId, reactions);

            // Update rate limit
            const newRateLimitData: RateLimitData = {
                count: rateLimitData && now < rateLimitData.resetTime ? rateLimitData.count + 1 : 1,
                resetTime: rateLimitData && now < rateLimitData.resetTime ? rateLimitData.resetTime : now + RATE_LIMIT_WINDOW,
            };
            await store.setJSON(rateLimitKey, newRateLimitData);

            return new Response(
                JSON.stringify({
                    likes: reactions.likes,
                    hasLiked: true,
                    message: 'Like added',
                }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
        }

        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Reactions error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
};

export const config = {
    path: '/api/reactions',
};
