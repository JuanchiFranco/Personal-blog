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
    }
}

module.exports = articleService;