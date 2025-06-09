const fs = require('fs');
const path = require('path');

const articleService = {
    async getAllArticles() {
        const filePath = path.join(__dirname, '../data/articles.json');
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading articles:', error);
            return [];
        }
    },

    async getArticleById(id) {
        const articles = await this.getAllArticles();
        if (!articles) {
            return null;
        }

        return articles?.articles?.find(article => article.id === parseInt(id, 10));
    },

    async createArticle(articleData) {
        const filePath = path.join(__dirname, '../data/articles.json');
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const articles = JSON.parse(data);
            const newArticle = {
                id: articles.articles.length + 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                ...articleData
            };
            articles.articles.push(newArticle);
            fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
            return newArticle;
        } catch (error) {
            console.error('Error writing article:', error);
            throw new Error('Could not create article');
        }
    },

    async updateArticle(id, articleData) {
        const filePath = path.join(__dirname, '../data/articles.json');
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const articles = JSON.parse(data);
            const articleIndex = this.getArticleById(id)?.id - 1;
            if (articleIndex === -1 || !articles.articles[articleIndex]) {
                throw new Error('Artículo no encontrado');
            }

            const updatedArticle = {
                ...articles.articles[articleIndex],
                ...articleData,
                updatedAt: new Date().toISOString()
            };
            articles.articles[articleIndex] = updatedArticle;
            fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
            return updatedArticle;
        }catch (error) {
            console.error('Error actualizando el artículo:', error);
            throw new Error('No se pudo actualizar el artículo');
        }

    }
}

module.exports = articleService;