const dataService = require('../services/dataService');

async function getTopUsers(req, res) {
    const users = await dataService.fetchUsers();
    if (!users) return res.status(500).json({ error: 'Failed to fetch users' });

    const postCounts = [];

    await Promise.all(
        Object.entries(users).map(async ([id, name]) => {
            const posts = await dataService.fetchPostsByUser(id);
            postCounts.push({ id, name, postCount: posts.length });
        })
    );

    postCounts.sort((a, b) => b.postCount - a.postCount);
    res.json(postCounts.slice(0, 5));
}

async function getPostsByType(req, res) {
    const { type } = req.query;
    if (!type || !['latest', 'popular'].includes(type)) {
        return res.status(400).json({ error: "Invalid type. Use 'latest' or 'popular'." });
    }

    const users = await dataService.fetchUsers();
    if (!users) return res.status(500).json({ error: 'Failed to fetch users' });

    let allPosts = [];
    await Promise.all(
        Object.keys(users).map(async (userId) => {
            const posts = await dataService.fetchPostsByUser(userId);
            allPosts.push(...posts);
        })
    );

    if (type === 'latest') {
        allPosts.sort((a, b) => b.id - a.id); // Assuming newer posts have higher IDs
        return res.json(allPosts.slice(0, 5));
    }

    if (type === 'popular') {
        const postComments = [];
        await Promise.all(
            allPosts.map(async (post) => {
                const comments = await dataService.fetchComments(post.id);
                postComments.push({ ...post, commentCount: comments.length });
            })
        );

        postComments.sort((a, b) => b.commentCount - a.commentCount);
        return res.json(postComments.filter(post => post.commentCount > 0));
    }
}

module.exports = { getTopUsers, getPostsByType };