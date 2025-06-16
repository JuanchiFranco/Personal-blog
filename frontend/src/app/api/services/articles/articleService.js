import apiClient from '../../config/axios';

const ArticleService = {
    async getArticles() {
        try {
            const response = await apiClient.get('/articles');
            return response.data?.articles || []; // Return articles or an empty array
        } catch (error) {
            throw error;
        }
    },

    async getArticleById(id) {
        try {
            const response = await apiClient.get(`/articles/${id}`);
            return response.data || null; // Return the article or null if not found
        } catch (error) {
            throw error;
        }
    },

    async createArticle(articleData) {
        try {
            const response = await apiClient.post('/articles', articleData);
            return response.data?.article || null; // Return the created article or null
        } catch (error) {
            throw error;
        }
    },

    async updateArticle(id, articleData) {
        try {
            const response = await apiClient.put(`/articles/${id}`, articleData);
            return response.data?.article || null; // Return the updated article or null
        } catch (error) {
            throw error;
        }
    },

    async deleteArticle(id) {
        try {
            const response = await apiClient.delete(`/articles/${id}`);
            return response.data?.message || 'Article deleted successfully'; // Return success message
        } catch (error) {
            throw error;
        }
    },
}

export default ArticleService;