const service = require('../services/articleService');

const getAllArticles = async (req, res) => {
    try {
        const articles = await service.getAllArticles();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await service.getArticleById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllArticles,
    getArticleById,
};