import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { jsonResponse, optionsResponse } from './http';

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
        return optionsResponse('GET, POST');
    }

    try {
        if (req.method === 'GET') {
            // Get reaction counts for a thought
            const url = new URL(req.url);
            const thoughtId = url.searchParams.get('thoughtId');

            if (!thoughtId) {
                return jsonResponse({ error: 'thoughtId required' }, 400);
            }

            const data = await store.get(thoughtId, { type: 'json' }) as ReactionData | null;
            const reactions = data || { likes: 0, likedIPs: [], lastUpdated: new Date().toISOString() };

            // Check if current IP has liked
            const hasLiked = reactions.likedIPs.includes(clientIP);

            return jsonResponse(
                {
                    likes: reactions.likes,
                    hasLiked,
                },
                200
            );
        }

        if (req.method === 'POST') {
            // Add a reaction
            const body = await req.json();
            const { thoughtId, action } = body;

            if (!thoughtId || action !== 'like') {
                return jsonResponse({ error: 'Invalid request' }, 400);
            }

            // Rate limiting check
            const rateLimitKey = `ratelimit:${clientIP}`;
            const rateLimitData = await store.get(rateLimitKey, { type: 'json' }) as RateLimitData | null;
            const now = Date.now();

            if (rateLimitData) {
                if (now < rateLimitData.resetTime) {
                    if (rateLimitData.count >= MAX_REACTIONS_PER_HOUR) {
                        return jsonResponse({ error: 'Rate limit exceeded. Try again later.' }, 429);
                    }
                }
            }

            // Get current reaction data
            const data = await store.get(thoughtId, { type: 'json' }) as ReactionData | null;
            const reactions = data || { likes: 0, likedIPs: [], lastUpdated: new Date().toISOString() };

            // Check if already liked
            if (reactions.likedIPs.includes(clientIP)) {
                return jsonResponse(
                    {
                        likes: reactions.likes,
                        hasLiked: true,
                        message: 'Already liked',
                    },
                    200
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

            return jsonResponse(
                {
                    likes: reactions.likes,
                    hasLiked: true,
                    message: 'Like added',
                },
                200
            );
        }

        return jsonResponse({ error: 'Method not allowed' }, 405);
    } catch (error) {
        console.error('Reactions error:', error);
        return jsonResponse({ error: 'Internal server error' }, 500);
    }
};

export const config = {
    path: '/api/reactions',
};
