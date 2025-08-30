import React, { useState } from 'react';
import type { Product } from '../types';
import { PRODUCTS } from '../constants';
import { useCart, useFavorites, useAppearance } from '../App';
import ProductCard from './ProductCard';
import ShareButtons from './ShareButtons';
import { FEATURE_FLAGS } from '../featureFlags';

const ProductDetailPage: React.FC<{ product: Product; onBack: () => void; onSelectProduct: (id: number) => void; }> = ({ product, onBack, onSelectProduct }) => {
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { themeColor } = useAppearance();
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const isFav = isFavorite(product.id);
    const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const images = Array.isArray(product.image) ? product.image : [product.image];

    const shareUrl = `${window.location.href.split('#')[0]}#product/${product.id}`;
    const shareTitle = `Découvrez ${product.name} chez FoodWar !`;

    const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };
    
    const incrementQuantity = () => setQuantity(q => q + 1);
    const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    return (
        <div className="animate-fadeIn">
            <button onClick={onBack} className={`mb-8 inline-flex items-center gap-2 text-${themeColor}-500 hover:text-${themeColor}-400 font-semibold`}>
                <span className="material-icons-outlined">arrow_back</span>
                Retour
            </button>

            <div className="bg-neutral-800 p-6 md:p-8 rounded-lg shadow-xl mb-12">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img 
                            key={currentImageIndex}
                            src={images[currentImageIndex]} 
                            alt={`${product.name} ${currentImageIndex + 1}`} 
                            className="w-full h-auto max-h-[500px] object-cover rounded-lg animate-fadeIn" 
                        />
                        {images.length > 1 && (
                            <>
                                <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity">
                                    <span className="material-icons-outlined">chevron_left</span>
                                </button>
                                <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity">
                                    <span className="material-icons-outlined">chevron_right</span>
                                </button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {images.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentImageIndex ? `bg-${themeColor}-500 scale-125` : 'bg-gray-400 hover:bg-gray-200'}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        ></div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                        {product.tag && (
                            <span className={`bg-${themeColor}-600 text-white text-xs font-bold px-3 py-1 rounded self-start mb-2`}>{product.tag}</span>
                        )}
                        <div className="flex items-start gap-4">
                            <h1 className="text-4xl font-extrabold text-white mb-3 flex-grow">{product.name}</h1>
                             <button 
                                onClick={() => toggleFavorite(product.id)}
                                aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                                className={`bg-neutral-700 p-3 rounded-full text-white hover:text-${themeColor}-500 transition-colors duration-200`}
                            >
                                <span className={`material-icons-outlined ${isFav ? `text-${themeColor}-500` : ''}`}>
                                {isFav ? 'favorite' : 'favorite_border'}
                                </span>
                            </button>
                        </div>
                        <p className="text-neutral-400 mb-4">{product.description || 'Aucune description disponible.'}</p>
                        
                        <div className={`text-3xl font-bold text-${themeColor}-500 mb-6`}>
                           {product.originalPrice && <span className="text-neutral-500 line-through mr-4 text-2xl">{product.originalPrice.toLocaleString()} CFA</span>}
                           <span>{product.price.toLocaleString()} CFA</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border border-neutral-700 rounded-lg">
                                <button onClick={decrementQuantity} className="px-3 py-2 text-neutral-400 hover:text-white">-</button>
                                <span className="px-4 py-2 text-white">{quantity}</span>
                                <button onClick={incrementQuantity} className="px-3 py-2 text-neutral-400 hover:text-white">+</button>
                            </div>
                            <button 
                                onClick={handleAddToCart}
                                className={`flex-1 bg-${themeColor}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${themeColor}-700 transition-all flex items-center justify-center space-x-2`}
                            >
                                <span className="material-icons-outlined">add_shopping_cart</span>
                                <span>Ajouter au Panier</span>
                            </button>
                        </div>
                        
                        <div className="border-t border-neutral-700 pt-4 space-y-4">
                            <p className="text-neutral-400"><span className="font-semibold text-neutral-300">Catégorie:</span> <span className="capitalize">{product.category}</span></p>
                            {FEATURE_FLAGS.productDetailPage.showShareButtons && <ShareButtons url={shareUrl} title={shareTitle} />}
                        </div>
                    </div>
                </div>
            </div>

            {FEATURE_FLAGS.productDetailPage.showRelatedProducts && relatedProducts.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Produits similaires</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;