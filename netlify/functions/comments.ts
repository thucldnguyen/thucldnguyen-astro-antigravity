import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { jsonResponse, optionsResponse } from './http';

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
        return optionsResponse('GET, POST');
    }

    try {
        if (req.method === 'GET') {
            // Get comments for a thought
            const url = new URL(req.url);
            const thoughtId = url.searchParams.get('thoughtId');

            if (!thoughtId) {
                return jsonResponse({ error: 'thoughtId required' }, 400);
            }

            const commentsKey = `comments:${thoughtId}`;
            const comments = await store.get(commentsKey, { type: 'json' }) as Comment[] | null;

            return jsonResponse({ comments: comments || [] }, 200);
        }

        if (req.method === 'POST') {
            // Submit a new comment
            const body = await req.json();
            const { thoughtId, name, text, website } = body;

            // Honeypot check
            if (website) {
                console.log('Honeypot triggered:', clientIP);
                return jsonResponse({ error: 'Invalid submission' }, 400);
            }

            // Validation
            if (!thoughtId || !name || !text) {
                return jsonResponse({ error: 'Missing required fields' }, 400);
            }

            if (name.length > 50 || text.length > 500) {
                return jsonResponse({ error: 'Content too long' }, 400);
            }

            // Profanity filter
            if (containsProfanity(text) || containsProfanity(name)) {
                return jsonResponse({ error: 'Comment contains inappropriate content' }, 400);
            }

            // Rate limiting check
            const rateLimitKey = `ratelimit:comments:${clientIP}`;
            const rateLimitData = await store.get(rateLimitKey, { type: 'json' }) as RateLimitData | null;
            const now = Date.now();

            if (rateLimitData) {
                if (now < rateLimitData.resetTime) {
                    if (rateLimitData.count >= MAX_COMMENTS_PER_HOUR) {
                        return jsonResponse({ error: 'Rate limit exceeded. Try again later.' }, 429);
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

            return jsonResponse(
                {
                    comment: {
                        id: comment.id,
                        name: comment.name,
                        text: comment.text,
                        timestamp: comment.timestamp,
                    },
                    message: 'Comment added',
                },
                201
            );
        }

        return jsonResponse({ error: 'Method not allowed' }, 405);
    } catch (error) {
        console.error('Comments error:', error);
        return jsonResponse({ error: 'Internal server error' }, 500);
    }
};

export const config = {
    path: '/api/comments',
};
