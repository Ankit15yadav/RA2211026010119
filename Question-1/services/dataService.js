const axios = require('axios');
const config = require('../config/config');
const cache = require('../utils/cache');

const apiClient = axios.create({
    baseURL: config.baseUrl,
    headers: { Authorization: `Bearer ${process.env.AUTH_TOKEN}` },
});

// Fetch all users
async function fetchUsers() {
    const cacheKey = 'users';
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await apiClient.get('/users');
        cache.set(cacheKey, response.data.users);
        return response.data.users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

// Fetch posts by a user
async function fetchPostsByUser(userId) {
    try {
        const response = await apiClient.get(`/users/${userId}/posts`);
        return response.data.posts || [];
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error);
        return [];
    }
}

// Fetch comments on a post
async function fetchComments(postId) {
    try {
        const response = await apiClient.get(`/posts/${postId}/comments`);
        return response.data.comments || [];
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        return [];
    }
}

module.exports = { fetchUsers, fetchPostsByUser, fetchComments };