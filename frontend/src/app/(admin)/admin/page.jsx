'use client';

import React from 'react';

import { useArticles } from '../../../hooks/useArticles';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { articles, loading, error } = useArticles();
    const { isAuthenticated, user } = useAuth();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user && user.role !== 'admin') {
            setShowError(true);
        }
    }, [isAuthenticated, user]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">Debes iniciar sesión para acceder a esta página.</p>
                </div>
            </div>
        );
    }

    if (showError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">No tienes permisos para acceder a esta página.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center gap-4 max-w-xl w-full mt-8">
                <div className="flex justify-between w-full mb-6">
                    <h1 className="text-2xl font-bold mb-6">Artículos</h1>
                    <Link
                        href="/admin/article/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Crear Artículo
                    </Link>
                </div>
                {error && !loading && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                <ul className="w-full">
                    {loading ? (
                        <li className="text-gray-500 text-center">Cargando...</li>
                    ) : (
                        articles.length === 0 && (
                            <li className="text-gray-500 text-center">No hay artículos disponibles.</li>
                        )
                    )}
                    {articles.length > 0 && (
                        articles.map(article => (
                            <li
                                key={article.id}
                                className="mb-4 text-lg flex justify-between items-center"
                            >
                                <Link
                                    href={`/article/${article.id}`}
                                    className="hover:underline flex-1"
                                >
                                    {article.title}
                                </Link>
                                <span className="text-gray-500 text-sm ml-24">
                                    {new Date(article.createdAt).toLocaleDateString()}
                                </span>

                                <Link
                                    href={`/admin/article/edit/${article.id}`}
                                    className="text-blue-600 hover:underline ml-4"
                                >
                                    Editar
                                </Link>
                                <Link
                                    href={`/admin/article/delete/${article.id}`}
                                    className="text-red-600 hover:underline ml-4"
                                >
                                    Eliminar
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;