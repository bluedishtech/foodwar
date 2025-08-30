import React from 'react';
import type { NewsArticle } from '../types';
import { NEWS_ARTICLES, APP_CONFIG } from '../constants';
import ShareButtons from './ShareButtons';
import AdBanner from './AdBanner';
import { FEATURE_FLAGS } from '../featureFlags';
import { useAppearance } from '../App';

const NewsArticlePage: React.FC<{ article: NewsArticle; onBack: () => void; onSelectNews: (id: number) => void; }> = ({ article, onBack, onSelectNews }) => {
    const { themeColor } = useAppearance();
    const otherArticles = NEWS_ARTICLES.filter(p => p.id !== article.id).slice(0, 3);

    const shareUrl = `${window.location.href.split('#')[0]}#news/${article.id}`;
    const shareTitle = `Lisez "${article.title}" sur FoodWar !`;

    return (
        <div>
            <button onClick={onBack} className={`mb-8 inline-flex items-center gap-2 text-${themeColor}-500 hover:text-${themeColor}-400 font-semibold`}>
                <span className="material-icons-outlined">arrow_back</span>
                Retour aux actualités
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <main className="w-full lg:w-2/3">
                    <article className="bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-96 object-cover" />
                        <div className="p-6 md:p-8">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{article.title}</h1>
                            <div className="text-sm text-neutral-400 mb-6">
                                <span>Publié le {article.date}</span>
                            </div>
                            <div
                                className="prose text-neutral-300 max-w-none"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                            {FEATURE_FLAGS.articlePages.showShareButtons && (
                                <div className="border-t border-neutral-700 mt-8 pt-6">
                                    <ShareButtons url={shareUrl} title={shareTitle} />
                                </div>
                            )}
                        </div>
                    </article>
                </main>
                {FEATURE_FLAGS.articlePages.showRelatedPostsSidebar && (
                    <aside className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
                            <h3 className="font-bold text-white text-xl mb-4">Autres Actualités</h3>
                            <div className="space-y-4">
                                {otherArticles.map(other => (
                                    <div key={other.id} className="flex items-center space-x-4 group cursor-pointer" onClick={() => onSelectNews(other.id)}>
                                        <img src={other.image} alt={other.title} className="w-20 h-20 rounded-md object-cover"/>
                                        <div>
                                            <p className={`text-white text-left font-semibold group-hover:text-${themeColor}-500 transition-colors leading-tight`}>
                                                {other.title}
                                            </p>
                                            <p className="text-neutral-500 text-xs mt-1">{other.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {FEATURE_FLAGS.articlePages.showAdBannerInSidebar && APP_CONFIG.ADS_CONFIG[0] && (
                            <div className="mt-8">
                                <AdBanner ad={APP_CONFIG.ADS_CONFIG[0]} layout="vertical" />
                            </div>
                        )}
                    </aside>
                )}
            </div>
        </div>
    );
};

export default NewsArticlePage;