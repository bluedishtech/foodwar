import React from 'react';
import type { Product } from '../types';
import { useFavorites, useCart, useAppearance } from '../App';

const ProductCard: React.FC<{ product: Product; onSelectProduct: (id: number) => void; }> = ({ product, onSelectProduct }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { themeColor } = useAppearance();
  const isFav = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onSelectProduct when clicking the favorite icon
    toggleFavorite(product.id);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg text-center group relative shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="absolute top-2 right-2 flex flex-col items-center gap-2 z-20">
        {product.tag && (
            <span className={`bg-${themeColor}-600 text-white text-xs font-bold px-2 py-1 rounded`}>
                {product.tag}
            </span>
        )}
        <button 
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className={`bg-neutral-700 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-100 hover:text-${themeColor}-500 transition-colors duration-200`}
        >
          <span className={`material-icons-outlined ${isFav ? `text-${themeColor}-500` : ''}`}>
            {isFav ? 'favorite' : 'favorite_border'}
          </span>
        </button>
        <button 
          onClick={handleAddToCartClick}
          aria-label="Ajouter au panier"
          className={`bg-neutral-700 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-100 hover:text-${themeColor}-500 transition-colors duration-200`}
        >
          <span className="material-icons-outlined">add_shopping_cart</span>
        </button>
      </div>
      
      <div className="relative cursor-pointer" onClick={() => onSelectProduct(product.id)}>
        <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4 transform group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 rounded-md">
            <div 
              className={`bg-${themeColor}-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-${themeColor}-700 transition-all`}
            >
              Voir les détails
            </div>
        </div>
      </div>
      <h4 className="text-white font-semibold mt-2">{product.name}</h4>
      <p className="text-neutral-400">
          {product.originalPrice && <span className="line-through mr-2">{product.originalPrice.toLocaleString()} CFA</span>}
          <span className={`text-${themeColor}-500`}>{product.price.toLocaleString()} CFA</span>
      </p>
    </div>
  );
};

export default ProductCard;