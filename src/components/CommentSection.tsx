import { useState, useEffect } from 'react';

interface Comment {
    id: string;
    name: string;
    text: string;
    timestamp: string;
}

interface Props {
    thoughtId: string;
}

declare global {
    interface Window {
        turnstile?: {
            render: (element: string | HTMLElement, options: any) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

export default function CommentSection({ thoughtId }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [website, setWebsite] = useState(''); // Honeypot
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [turnstileToken, setTurnstileToken] = useState('');

    // Fetch comments on mount
    useEffect(() => {
        fetchComments();
    }, [thoughtId]);

    // Load Turnstile script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comments?thoughtId=${thoughtId}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data.comments);
            }
        } catch (err) {
            console.error('Failed to fetch comments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!name.trim() || !text.trim()) {
            setError('Please fill in all fields');
            return;
        }

        if (name.length > 50) {
            setError('Name is too long (max 50 characters)');
            return;
        }

        if (text.length > 500) {
            setError('Comment is too long (max 500 characters)');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    thoughtId,
                    name: name.trim(),
                    text: text.trim(),
                    website, // Honeypot field
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to post comment');
                setIsSubmitting(false);
                return;
            }

            // Success
            setSuccess('Comment posted successfully!');
            setName('');
            setText('');
            setWebsite('');

            // Refresh comments
            await fetchComments();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Failed to post comment:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="comment-section glass-comment-card">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                💬 Comments ({comments.length})
            </h3>

            {/* Comments List - Show first */}
            {isLoading ? (
                <div className="space-y-4 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1"></div>
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-8 mb-8 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-400">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                </div>
            ) : (
                <div className="space-y-6 mb-8 pb-8 border-b-2 border-slate-300 dark:border-slate-600">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-0"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <strong className="text-slate-900 dark:text-white font-semibold">
                                    {comment.name}
                                </strong>
                                <time className="text-sm text-slate-500 dark:text-slate-400">
                                    {formatDate(comment.timestamp)}
                                </time>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                                {comment.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Comment Form - Show after comments */}
            <div className="pt-4">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    ✍️ Leave a Comment
                </h4>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Your Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                maxLength={50}
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label htmlFor="text" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Your Comment
                            </label>
                            <textarea
                                id="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Share your thoughts..."
                                maxLength={500}
                                rows={4}
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {text.length}/500 characters
                            </p>
                        </div>

                        {/* Honeypot field - hidden from users */}
                        <input
                            type="text"
                            name="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        {error && (
                            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                                {success}
                            </div>
                        )}

                        {isSubmitting && (
                            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <div>
                                        <p className="font-medium">Posting your comment...</p>
                                        <p className="text-sm opacity-90">This may take a moment on the first comment</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-all disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
