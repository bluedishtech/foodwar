import React, { useState, useRef } from 'react';
import type { Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { FEATURE_FLAGS } from '../featureFlags';
import { useAppearance } from '../App';


export const Hero: React.FC<{ setPage: (page: string) => void; }> = ({ setPage }) => {
    const { themeColor } = useAppearance();
    const handleCtaClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setPage('boutique');
    };
    return (
    <div className="relative bg-neutral-800 rounded-lg overflow-hidden flex items-center min-h-[400px] shadow-lg">
        <div className="absolute inset-0">
            <img src="https://picsum.photos/id/292/1000/400" alt="Pizza" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 p-8 md:p-12 max-w-lg">
             <div className="flex items-center space-x-4 mb-4">
                <img src="https://picsum.photos/id/1080/60/60" alt="pizza slice" className={`rounded-full border-2 border-${themeColor}-500`}/>
                <div>
                     <h2 className="text-5xl font-bold text-white leading-tight">Meilleure Pizza</h2>
                     <p className="text-2xl text-neutral-300">Qualité Pure</p>
                </div>
             </div>
             <p className="mt-4 mb-6">Livraisons à domicile sûres et ponctuelles</p>
             <a href="#" onClick={handleCtaClick} className={`bg-${themeColor}-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-${themeColor}-700 shadow-md`}>
                Voir nos plats
             </a>
        </div>
    </div>
)};

const ProductGrid: React.FC<{ title: string; products: Product[]; showTabs?: boolean; onSelectProduct: (id: number) => void; }> = ({ title, products, showTabs, onSelectProduct }) => {
    const [activeTab, setActiveTab] = useState('pizza');
    const [currentPage, setCurrentPage] = useState(0);
    const { themeColor } = useAppearance();

    const filteredProductsForTabs = showTabs ? products.filter(p => p.category === activeTab) : [];

    // Carousel logic applies only when showTabs is false
    const itemsPerPageForCarousel = 1;
    const totalPages = showTabs || !products || products.length === 0 ? 1 : Math.ceil(products.length / itemsPerPageForCarousel);
    
    const handleNext = () => {
        if (totalPages > 1) {
            setCurrentPage(prev => (prev + 1) % totalPages);
        }
    };

    const handlePrev = () => {
        if (totalPages > 1) {
            setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
        }
    };
    
    const startIndex = currentPage * itemsPerPageForCarousel;
    const paginatedProducts = products ? products.slice(startIndex, startIndex + itemsPerPageForCarousel) : [];

    const productsToRender = showTabs ? filteredProductsForTabs : paginatedProducts;

    return (
        <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                {showTabs ? (
                    <div className="flex space-x-4 text-neutral-400">
                        {['drinks', 'pasta', 'pizza'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`capitalize ${activeTab === tab ? `text-${themeColor}-500` : `hover:text-${themeColor}-500`}`}>{tab === 'drinks' ? 'boissons' : tab}</button>
                        ))}
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <button onClick={handlePrev} className={`bg-neutral-700 p-2 rounded-full hover:bg-${themeColor}-600 hover:text-white flex items-center justify-center`} aria-label="Précédent"><span className="material-icons-outlined">chevron_left</span></button>
                        <button onClick={handleNext} className={`bg-neutral-700 p-2 rounded-full hover:bg-${themeColor}-600 hover:text-white flex items-center justify-center`} aria-label="Suivant"><span className="material-icons-outlined">chevron_right</span></button>
                    </div>
                )}
            </div>

            {showTabs ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productsToRender.map((product) => <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct}/>)}
                </div>
            ) : (
                <div className="relative flex justify-center items-center min-h-[300px]">
                    {productsToRender && productsToRender.length > 0 ? productsToRender.map(product => (
                        <div key={product.id} className="w-full max-w-xs animate-fadeIn">
                             <ProductCard product={product} onSelectProduct={onSelectProduct}/>
                        </div>
                    )) : (
                        <p className="text-neutral-500">Aucun produit à afficher.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const CategorySlider: React.FC = () => {
    const { themeColor } = useAppearance();
    return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-white mb-4">Carrousel des catégories</h3>
        <div className="flex justify-around items-center">
            {CATEGORIES.map(category => (
                <a href="#" key={category.id} className="text-center group">
                    <img src={category.image} alt={category.name} className={`w-20 h-20 object-cover rounded-full border-2 border-neutral-700 group-hover:border-${themeColor}-500 transition-all duration-300`}/>
                    <p className="mt-2 text-neutral-400 group-hover:text-white">{category.name}</p>
                </a>
            ))}
        </div>
    </div>
)};

const ProductListCarousel: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { themeColor } = useAppearance();
    const handleScroll = (scrollOffset: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Liste des produits</h3>
                <div className="flex space-x-2">
                    <button onClick={() => handleScroll(-300)} className={`bg-neutral-700 p-2 rounded-full hover:bg-${themeColor}-600 hover:text-white flex items-center justify-center`} aria-label="Faire défiler à gauche"><span className="material-icons-outlined">chevron_left</span></button>
                    <button onClick={() => handleScroll(300)} className={`bg-neutral-700 p-2 rounded-full hover:bg-${themeColor}-600 hover:text-white flex items-center justify-center`} aria-label="Faire défiler à droite"><span className="material-icons-outlined">chevron_right</span></button>
                </div>
            </div>
            <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
                {PRODUCTS.map(product => (
                    <div key={product.id} className="flex items-center space-x-3 bg-neutral-900 p-2 rounded-md min-w-[220px]">
                       <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-12 h-12 rounded-full object-cover"/>
                       <div>
                            <p className="text-white text-sm">{product.name}</p>
                            <p className="text-neutral-400 text-xs">
                                {product.originalPrice && <span className="line-through mr-1">{product.originalPrice.toLocaleString()} CFA</span>}
                                <span>{product.price.toLocaleString()} CFA</span>
                            </p>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const MainContent: React.FC<{ onSelectProduct: (id: number) => void; showHero?: boolean; setPage: (page: string) => void; }> = ({ onSelectProduct, showHero = true, setPage }) => {
    return (
        <div className="space-y-8">
            {showHero && FEATURE_FLAGS.homepage.showHeroSection && <Hero setPage={setPage} />}
            {FEATURE_FLAGS.homepage.showFeaturedProducts && <ProductGrid title="Goûtez ce que vous aimez" products={PRODUCTS} showTabs={true} onSelectProduct={onSelectProduct} />}
            {FEATURE_FLAGS.homepage.showCategoryCarousel && <CategorySlider />}
            {FEATURE_FLAGS.homepage.showProductCarousel && <ProductGrid title="Carrousel des produits" products={PRODUCTS.slice(4)} onSelectProduct={onSelectProduct} />}
            {FEATURE_FLAGS.homepage.showProductList && <ProductListCarousel />}
        </div>
    );
};

export default MainContent;