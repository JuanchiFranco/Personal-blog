const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchArticles() {
    console.log('Fetching articles from API:', API_URL);
    try {
        const response = await fetch(`${API_URL}/api/articles`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if(!data || !Array.isArray(data.articles)) {
            throw new Error('Invalid data format');
        }

        return data.articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}

export async function fetchArticleById(id) {
    try {
        const response = await fetch(`${API_URL}/api/articles/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Article data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
}