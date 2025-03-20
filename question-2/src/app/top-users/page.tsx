'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    postCount: number;
}

const TopUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const response = await axios.get<User[]>('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch top users');
            } finally {
                setLoading(false);
            }
        };
        fetchTopUsers();
    }, []);

    if (loading) return <div className="p-4">Loading...</div>
    if (error) return <div className="p-4 text-red-500">{error}</div>

    return (

        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Top Users</h1>
            {/* Responsive grid for user cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {users.map(user => (
                    <div key={user.id} className="bg-white p-4 rounded shadow">
                        <img
                            src={`https://picsum.photos/seed/${user.id}/200/200`}
                            alt={user.name}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
                        <p>Posts: {user.postCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopUsers;