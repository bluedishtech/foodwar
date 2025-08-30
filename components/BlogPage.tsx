import React from 'react';
import { BLOG_POSTS } from '../constants';
import type { BlogPost } from '../types';
import { useAppearance } from '../App';

const BlogPostCard: React.FC<{ post: BlogPost; onSelectPost: (id: number) => void; }> = ({ post, onSelectPost }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg group flex flex-col hover:shadow-2xl transition-shadow duration-300">
        <div className="overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-${themeColor}-500 transition-colors`}>{post.title}</h3>
            <div className="text-sm text-neutral-400 mb-4">
                <span>Par {post.author}</span> | <span>{post.date}</span>
            </div>
            <p className="text-neutral-300 flex-grow">{post.excerpt}</p>
            <button onClick={() => onSelectPost(post.id)} className={`mt-4 text-${themeColor}-500 font-semibold inline-block self-start hover:text-${themeColor}-400 text-left`}>
                Lire la suite &rarr;
            </button>
        </div>
    </div>
)};

const BlogPage: React.FC<{ onSelectPost: (id: number) => void; }> = ({ onSelectPost }) => {
    return (
        <div className="space-y-8">
            <div 
                className="relative bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center text-center min-h-[300px] p-8 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: "url('https://picsum.photos/id/357/1200/400')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold text-white leading-tight">Notre Blog Culinaire</h1>
                    <p className="text-xl text-neutral-300 mt-2">Recettes, astuces et actualités de l'équipe FoodWar.</p>
                </div>
            </div>

            <main className="w-full">
                {BLOG_POSTS.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map(post => 
                            <BlogPostCard key={post.id} post={post} onSelectPost={onSelectPost} />
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md">
                        <span className="material-icons-outlined text-6xl text-neutral-600">article</span>
                        <p className="text-xl text-neutral-400 mt-4">Aucun article de blog disponible pour le moment.</p>
                        <p className="text-neutral-500">Revenez bientôt !</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BlogPage;