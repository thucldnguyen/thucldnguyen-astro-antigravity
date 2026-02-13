import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

interface Comment {
    id: string;
    thoughtId: string;
    name: string;
    text: string;
    timestamp: string;
    ip: string;
}

interface RateLimitData {
    count: number;
    resetTime: number;
}

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_COMMENTS_PER_HOUR = 5;

// Simple profanity filter (basic example)
const PROFANITY_WORDS = ['spam', 'viagra', 'casino']; // Add more as needed

function containsProfanity(text: string): boolean {
    const lowerText = text.toLowerCase();
    return PROFANITY_WORDS.some(word => lowerText.includes(word));
}

export default async (req: Request, context: Context) => {
    const store = getStore('comments');
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
            // Get comments for a thought
            const url = new URL(req.url);
            const thoughtId = url.searchParams.get('thoughtId');

            if (!thoughtId) {
                return new Response(JSON.stringify({ error: 'thoughtId required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const commentsKey = `comments:${thoughtId}`;
            const comments = await store.get(commentsKey, { type: 'json' }) as Comment[] | null;

            return new Response(
                JSON.stringify({
                    comments: comments || [],
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
            // Submit a new comment
            const body = await req.json();
            const { thoughtId, name, text, website } = body;

            // Honeypot check
            if (website) {
                console.log('Honeypot triggered:', clientIP);
                return new Response(
                    JSON.stringify({ error: 'Invalid submission' }),
                    {
                        status: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }
                );
            }

            // Validation
            if (!thoughtId || !name || !text) {
                return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            if (name.length > 50 || text.length > 500) {
                return new Response(JSON.stringify({ error: 'Content too long' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            // Profanity filter
            if (containsProfanity(text) || containsProfanity(name)) {
                return new Response(
                    JSON.stringify({ error: 'Comment contains inappropriate content' }),
                    {
                        status: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }
                );
            }

            // Rate limiting check
            const rateLimitKey = `ratelimit:comments:${clientIP}`;
            const rateLimitData = await store.get(rateLimitKey, { type: 'json' }) as RateLimitData | null;
            const now = Date.now();

            if (rateLimitData) {
                if (now < rateLimitData.resetTime) {
                    if (rateLimitData.count >= MAX_COMMENTS_PER_HOUR) {
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

            // Create comment
            const comment: Comment = {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                thoughtId,
                name: name.trim(),
                text: text.trim(),
                timestamp: new Date().toISOString(),
                ip: clientIP,
            };

            // Get existing comments
            const commentsKey = `comments:${thoughtId}`;
            const existingComments = await store.get(commentsKey, { type: 'json' }) as Comment[] | null;
            const comments = existingComments || [];
            comments.push(comment);

            // Save comments
            await store.setJSON(commentsKey, comments);

            // Update rate limit
            const newRateLimitData: RateLimitData = {
                count: rateLimitData && now < rateLimitData.resetTime ? rateLimitData.count + 1 : 1,
                resetTime: rateLimitData && now < rateLimitData.resetTime ? rateLimitData.resetTime : now + RATE_LIMIT_WINDOW,
            };
            await store.setJSON(rateLimitKey, newRateLimitData);

            return new Response(
                JSON.stringify({
                    comment: {
                        id: comment.id,
                        name: comment.name,
                        text: comment.text,
                        timestamp: comment.timestamp,
                    },
                    message: 'Comment added',
                }),
                {
                    status: 201,
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
        console.error('Comments error:', error);
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
    path: '/api/comments',
};
