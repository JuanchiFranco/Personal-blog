'use client';

import { useEffect, useState } from 'react';
import ArticleService from '../app/api/services/articles/articleService';

export function useArticles () {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await ArticleService.getArticles();
                setArticles(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getArticles();
    }, []);

    return { articles, loading, error };
}

export function useArticle (id) {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await ArticleService.getArticleById(id);
                setArticle(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getArticle();
    }, [id]);

    return { article, loading, error };
}