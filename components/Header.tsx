import React, { useState } from 'react';
import { APP_CONFIG, NavLinks } from '../constants';
import { useCart, useAppearance } from '../App';
import Logo from './Logo';

const Header: React.FC<{ onMenuClick: () => void; page: string; setPage: (page: string) => void; onSearch: (query: string) => void; }> = ({ onMenuClick, page, setPage, onSearch }) => {
    const { getCartItemCount } = useCart();
    const { themeColor } = useAppearance();
    const itemCount = getCartItemCount();
    const [searchQuery, setSearchQuery] = useState('');

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
        e.preventDefault();
        setPage(pageId);
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
            setSearchQuery('');
        }
    };

    return (
        <header className="text-white">
            {/* Mobile Header */}
            <div className="lg:hidden flex justify-between items-center py-4">
                <button onClick={onMenuClick} className="text-neutral-300 hover:text-white" aria-label="Ouvrir le menu">
                    <span className="material-icons-outlined">menu</span>
                </button>
                <div onClick={() => setPage('home')} style={{cursor: 'pointer'}} className="flex items-center gap-2">
                    <Logo size="sm" />
                    <h1 className="text-3xl font-bold text-white">{APP_CONFIG.BUSINESS_NAME}</h1>
                </div>
                <button onClick={() => setPage('cart')} className="relative" aria-label={`Voir le panier, ${itemCount} articles`}>
                    <span className="material-icons-outlined">shopping_cart</span>
                    {itemCount > 0 && (
                        <span className={`absolute -top-2 -right-2 bg-${themeColor}-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>{itemCount}</span>
                    )}
                </button>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block">
                <div className="border-b border-neutral-700">
                    <div className="py-4 flex justify-between items-center">
                        <div onClick={() => setPage('home')} style={{cursor: 'pointer'}} className="flex items-center gap-3">
                            <Logo size="sm" />
                            <h1 className="text-3xl font-bold text-white">{APP_CONFIG.BUSINESS_NAME}</h1>
                        </div>
                        <div className="flex-1 max-w-xl mx-8">
                            <form className="flex" onSubmit={handleSearchSubmit}>
                                <input 
                                    type="text" 
                                    placeholder="Rechercher un produit" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`bg-neutral-900 border border-neutral-700 w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                                <button type="submit" className={`bg-${themeColor}-600 px-4 py-2 rounded-r-md hover:bg-${themeColor}-700 flex items-center justify-center`}>
                                    <span className="material-icons-outlined">search</span>
                                </button>
                            </form>
                        </div>
                        <div className="flex items-center space-x-6">
                            <button onClick={() => setPage('favorites')} className="flex items-center space-x-2 text-neutral-300 hover:text-white" aria-label="Voir mes favoris">
                                <span className="material-icons-outlined text-2xl">favorite_border</span>
                            </button>
                            <button onClick={() => setPage('account')} className="flex items-center space-x-2 text-neutral-300 hover:text-white" aria-label="Mon compte">
                                <span className="material-icons-outlined text-2xl">person_outline</span>
                            </button>
                            <div className="flex items-center">
                                <button onClick={() => setPage('cart')} className="relative p-2 text-neutral-300 hover:text-white" aria-label={`Voir le panier, ${itemCount} articles`}>
                                    <span className="material-icons-outlined text-3xl">shopping_cart</span>
                                    {itemCount > 0 && <span className={`absolute top-0 right-0 bg-${themeColor}-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>{itemCount}</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="py-4 flex justify-between items-center">
                    <ul className="flex space-x-6">
                        {NavLinks.map(link => (
                            <li key={link.id}>
                                <a 
                                  href="#" 
                                  onClick={(e) => handleNavClick(e, link.id)} 
                                  className={`${page === link.id ? `text-${themeColor}-500 border-b-2 border-${themeColor}-500 pb-1` : `hover:text-${themeColor}-500`}`}
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-icons-outlined text-xl">{link.icon}</span>
                                        <span>{link.name}</span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className={`flex items-center space-x-2 text-${themeColor}-500`}>
                         <p>Bienvenue chez {APP_CONFIG.BUSINESS_NAME}</p>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;