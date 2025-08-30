import React from 'react';
import { useFavorites, useAppearance } from '../App';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

const FavoritesPage: React.FC<{ setPage: (page: string) => void; onSelectProduct: (id: number) => void; }> = ({ setPage, onSelectProduct }) => {
    const { favorites } = useFavorites();
    const { themeColor } = useAppearance();
    const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

    if (favoriteProducts.length === 0) {
        return (
            <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md animate-fadeIn">
                <span className="material-icons-outlined text-6xl text-neutral-600">favorite_border</span>
                <h1 className="text-3xl font-bold text-white mt-4">Votre liste de favoris est vide</h1>
                <p className="text-neutral-400 mt-2">Cliquez sur le cœur d'un produit pour l'ajouter ici.</p>
                <button 
                    onClick={() => setPage('boutique')} 
                    className={`mt-6 bg-${themeColor}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${themeColor}-700 transition-all flex items-center justify-center space-x-2 mx-auto`}
                >
                    <span className="material-icons-outlined">storefront</span>
                    <span>Explorer la boutique</span>
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-8">
            <h1 className="text-4xl font-extrabold text-white">Mes Favoris</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteProducts.map(product => 
                    <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;