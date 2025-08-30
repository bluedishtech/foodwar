import React from 'react';
import type { BlogPost } from '../types';
import { BLOG_POSTS, APP_CONFIG } from '../constants';
import ShareButtons from './ShareButtons';
import AdBanner from './AdBanner';
import { FEATURE_FLAGS } from '../featureFlags';
import { useAppearance } from '../App';

const ArticlePage: React.FC<{ post: BlogPost; onBack: () => void; onSelectPost: (id: number) => void; }> = ({ post, onBack, onSelectPost }) => {
    const { themeColor } = useAppearance();
    const otherPosts = BLOG_POSTS.filter(p => p.id !== post.id);

    const shareUrl = `${window.location.href.split('#')[0]}#article/${post.id}`;
    const shareTitle = `Lisez "${post.title}" sur le blog de FoodWar !`;

    return (
        <div>
            <button onClick={onBack} className={`mb-8 inline-flex items-center gap-2 text-${themeColor}-500 hover:text-${themeColor}-400 font-semibold`}>
                <span className="material-icons-outlined">arrow_back</span>
                Retour au blog
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <main className="w-full lg:w-2/3">
                    <article className="bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
                        <div className="p-6 md:p-8">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{post.title}</h1>
                            <div className="text-sm text-neutral-400 mb-6">
                                <span>Par {post.author}</span> | <span>{post.date}</span>
                            </div>
                            <div
                                className="prose text-neutral-300 max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
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
                            <h3 className="font-bold text-white text-xl mb-4">Autres Articles</h3>
                            <div className="space-y-4">
                                {otherPosts.map(otherPost => (
                                    <div key={otherPost.id} className="flex items-center space-x-4 group">
                                        <img src={otherPost.image} alt={otherPost.title} className="w-20 h-20 rounded-md object-cover"/>
                                        <div>
                                            <button onClick={() => onSelectPost(otherPost.id)} className={`text-white text-left font-semibold group-hover:text-${themeColor}-500 transition-colors leading-tight`}>
                                                {otherPost.title}
                                            </button>
                                            <p className="text-neutral-500 text-xs mt-1">{otherPost.date}</p>
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

export default ArticlePage;