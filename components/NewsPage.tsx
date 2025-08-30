import React from 'react';
import { NEWS_ARTICLES } from '../constants';
import type { NewsArticle } from '../types';
import { useAppearance } from '../App';

const NewsArticleCard: React.FC<{ article: NewsArticle; onSelectNews: (id: number) => void; }> = ({ article, onSelectNews }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg group flex flex-col hover:shadow-2xl transition-shadow duration-300">
        <div className="overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-${themeColor}-500 transition-colors`}>{article.title}</h3>
            <div className="text-sm text-neutral-400 mb-4">
                <span>{article.date}</span>
            </div>
            <p className="text-neutral-300 flex-grow">{article.excerpt}</p>
            <button onClick={() => onSelectNews(article.id)} className={`mt-4 text-${themeColor}-500 font-semibold inline-block self-start hover:text-${themeColor}-400 text-left`}>
                Lire la suite &rarr;
            </button>
        </div>
    </div>
)};

const NewsPage: React.FC<{ onSelectNews: (id: number) => void; }> = ({ onSelectNews }) => {
    return (
        <div className="space-y-8">
            <div 
                className="relative bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center text-center min-h-[300px] p-8 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: "url('https://picsum.photos/id/1018/1200/400')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold text-white leading-tight">Nos Actualités</h1>
                    <p className="text-xl text-neutral-300 mt-2">Restez informé des dernières nouvelles et événements de FoodWar.</p>
                </div>
            </div>

            <main className="w-full">
                {NEWS_ARTICLES.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {NEWS_ARTICLES.map(article => 
                            <NewsArticleCard key={article.id} article={article} onSelectNews={onSelectNews} />
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md">
                        <span className="material-icons-outlined text-6xl text-neutral-600">newspaper</span>
                        <p className="text-xl text-neutral-400 mt-4">Aucune actualité pour le moment.</p>
                        <p className="text-neutral-500">Revenez bientôt !</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NewsPage;