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

interface CommentListProps {
    thoughtId: string;
    comments: Comment[];
    isLoading: boolean;
}

function CommentList({ thoughtId, comments, isLoading }: CommentListProps) {
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
        <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                💬 Comments ({comments.length})
            </h3>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1"></div>
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-6">
                    <p className="text-slate-600 dark:text-slate-400">
                        No comments yet. Be the first to share your thoughts below!
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
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
        </div>
    );
}

export default function CommentSection({ thoughtId }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch comments on mount
    useEffect(() => {
        fetchComments();
    }, [thoughtId]);

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

    return (
        <div className="mt-12">
            <CommentList thoughtId={thoughtId} comments={comments} isLoading={isLoading} />
        </div>
    );
}
