import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, PRODUCTS, APP_CONFIG } from '../constants';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import { useCart, useAppearance } from '../App';
import { FEATURE_FLAGS } from '../featureFlags';
import AdBanner from './AdBanner';

const ProductListItem: React.FC<{ product: Product, onSelectProduct: (id: number) => void, onAddToCart: (p: Product) => void }> = ({ product, onSelectProduct, onAddToCart }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="bg-neutral-800 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 w-full group shadow-md hover:shadow-xl transition-shadow duration-300">
        <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-full sm:w-40 h-40 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300" />
        <div className="flex-1 text-center sm:text-left">
            <h4 className={`text-xl font-semibold text-white group-hover:text-${themeColor}-500 transition-colors`}>{product.name}</h4>
            <p className="text-neutral-400 my-2 text-sm">{product.description ? `${product.description.substring(0, 100)}...` : ''}</p>
            <p className={`text-lg text-${themeColor}-500 font-bold`}>
                {product.originalPrice && <span className="line-through mr-2 text-neutral-500 text-base font-normal">{product.originalPrice.toLocaleString()} CFA</span>}
                {product.price.toLocaleString()} CFA
            </p>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-auto self-center sm:self-end">
            <button onClick={() => onAddToCart(product)} className={`bg-${themeColor}-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-${themeColor}-700 transition-all flex items-center justify-center space-x-2`}>
                <span className="material-icons-outlined">add_shopping_cart</span>
                <span>Ajouter</span>
            </button>
            <button onClick={() => onSelectProduct(product.id)} className="bg-neutral-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-neutral-600 transition-all">
                Détails
            </button>
        </div>
    </div>
)};


const BoutiquePage: React.FC<{ filterRequest: { categoryId: string | null; searchQuery: string | null; key: number }; onSelectProduct: (id: number) => void; }> = ({ filterRequest, onSelectProduct }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('default');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filterRequest.categoryId ? [filterRequest.categoryId] : []);
    const maxPrice = useMemo(() => Math.max(...PRODUCTS.map(p => p.price)), []);
    const [priceRange, setPriceRange] = useState(maxPrice);
    const { addToCart } = useCart();
    const { themeColor } = useAppearance();

    useEffect(() => {
        // This effect runs whenever a new navigation action (search, category select) targets this page.
        setSelectedCategories(filterRequest.categoryId ? [filterRequest.categoryId] : []);
        
        // When a new search or category selection comes from outside, reset filters to default.
        setPriceRange(maxPrice);
        setSortBy('default');
    }, [filterRequest.key, maxPrice]);

    const filteredProducts = useMemo(() => {
        let products = [...PRODUCTS];

        if (filterRequest.searchQuery) {
            const query = filterRequest.searchQuery.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.description && p.description.toLowerCase().includes(query))
            );
        }

        if (selectedCategories.length > 0) {
            products = products.filter(p => selectedCategories.includes(p.category));
        }

        products = products.filter(p => p.price <= priceRange);

        switch (sortBy) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return products;
    }, [selectedCategories, priceRange, sortBy, filterRequest.searchQuery]);
    
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId) 
                ? prev.filter(c => c !== categoryId) 
                : [...prev, categoryId]
        );
    };

    return (
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
          <div className="bg-neutral-800 p-4 rounded-lg space-y-6 shadow-md">
            <div>
              <h3 className="font-bold text-white text-lg mb-3">Catégories</h3>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className={`h-4 w-4 rounded bg-neutral-900 border-neutral-600 focus:ring-${themeColor}-500 focus:ring-offset-neutral-800 accent-${themeColor}-600`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <span className={`text-neutral-300 hover:text-${themeColor}-500`}>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-3">Prix</h3>
              <input 
                type="range" 
                min="0" 
                max={maxPrice} 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className={`w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-${themeColor}-600`}
              />
              <div className="text-sm text-neutral-400 mt-2">
                Jusqu'à: <span className={`font-bold text-${themeColor}-500`}>{priceRange.toLocaleString()} CFA</span>
              </div>
            </div>
          </div>
          {FEATURE_FLAGS.boutiquePage.showAdBannerInSidebar && APP_CONFIG.ADS_CONFIG[0] && (
            <div className="mt-6">
                <AdBanner ad={APP_CONFIG.ADS_CONFIG[0]} layout="vertical" />
            </div>
          )}
        </aside>

        <main className="w-full lg:w-3/4">
          <div className="bg-neutral-800 p-4 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
            <p className="text-neutral-400">Affichage de {filteredProducts.length} sur {PRODUCTS.length} produits</p>
            <div className="flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`bg-neutral-700 border border-neutral-600 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`}
              >
                <option value="default">Trier par défaut</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
              </select>
              <div className="flex items-center gap-1">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? `bg-${themeColor}-600 text-white` : 'bg-neutral-700 hover:bg-neutral-600'}`}>
                  <span className="material-icons-outlined">grid_view</span>
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? `bg-${themeColor}-600 text-white` : 'bg-neutral-700 hover:bg-neutral-600'}`}>
                  <span className="material-icons-outlined">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
             <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'flex flex-col gap-6'
             }>
              {filteredProducts.map(product => 
                viewMode === 'grid' 
                  ? <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                  : <ProductListItem key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={addToCart} />
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md">
                <span className="material-icons-outlined text-6xl text-neutral-600">search_off</span>
                <p className="text-xl text-neutral-400 mt-4">Aucun produit ne correspond à vos filtres.</p>
                <p className="text-neutral-500">Essayez d'ajuster votre recherche.</p>
            </div>
          )}
        </main>
        
      </div>
    );
};

export default BoutiquePage;