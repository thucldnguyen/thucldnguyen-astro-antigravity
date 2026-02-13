import { useState, useEffect } from 'react';

interface Props {
    thoughtId: string;
    compact?: boolean;
}

export default function ReactionButtons({ thoughtId, compact = false }: Props) {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch initial reaction data
    useEffect(() => {
        fetchReactions();
    }, [thoughtId]);

    const fetchReactions = async () => {
        try {
            const res = await fetch(`/api/reactions?thoughtId=${thoughtId}`);
            if (res.ok) {
                const data = await res.json();
                setLikes(data.likes);
                setHasLiked(data.hasLiked);
            }
        } catch (err) {
            console.error('Failed to fetch reactions:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async () => {
        if (hasLiked) return;

        // Optimistic update
        setLikes(prev => prev + 1);
        setHasLiked(true);
        setError('');

        try {
            const res = await fetch('/api/reactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ thoughtId, action: 'like' }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Revert optimistic update
                setLikes(prev => prev - 1);
                setHasLiked(false);
                setError(data.error || 'Failed to like');
                return;
            }

            // Update with server data
            setLikes(data.likes);
            setHasLiked(data.hasLiked);
        } catch (err) {
            // Revert optimistic update
            setLikes(prev => prev - 1);
            setHasLiked(false);
            setError('Network error');
            console.error('Failed to like:', err);
        }
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/thoughts/${thoughtId}`;
        const title = 'Check out this thought';

        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch (err) {
                // User cancelled or error
                console.log('Share cancelled or failed:', err);
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="reaction-buttons flex items-center gap-4">
                <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-8 w-16 rounded"></div>
                <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-8 w-16 rounded"></div>
            </div>
        );
    }

    return (
        <div className="reaction-buttons">
            <div className="flex items-center gap-4">
                <button
                    onClick={handleLike}
                    disabled={hasLiked}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${hasLiked
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400'
                        }`}
                    title={hasLiked ? 'You already liked this' : 'Like this thought'}
                >
                    <span className={hasLiked ? 'animate-bounce' : ''}>❤️</span>
                    <span className="font-medium">{likes}</span>
                </button>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-all"
                    title="Share this thought"
                >
                    <span>🔗</span>
                    {!compact && <span className="font-medium">Share</span>}
                </button>
            </div>

            {error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
            )}
        </div>
    );
}
