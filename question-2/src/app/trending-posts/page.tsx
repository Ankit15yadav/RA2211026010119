'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';


interface Post {
    id: string;
    content: string;
    commentCount: number;
}

const TrendingPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            try {
                const response = await axios.get<Post[]>('http://localhost:5000/api/posts?type=popular');
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch trending posts');
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingPosts();
    }, []);

    if (loading) return <div className="p-4">Loading...</div>
    if (error) return <div className="p-4 text-red-500">{error}</div>

    return (

        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded shadow">
                        <img
                            src={`https://picsum.photos/seed/${post.id}/200/200`}
                            alt="Post"
                            className="w-full h-48 object-cover rounded"
                        />
                        <p className="mt-2">{post.content}</p>
                        <p className="text-sm text-gray-500">Comments: {post.commentCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingPosts;