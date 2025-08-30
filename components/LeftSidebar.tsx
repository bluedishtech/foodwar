import React from 'react';
import { CATEGORIES, PLAT_DU_JOUR } from '../constants';
import { FEATURE_FLAGS } from '../featureFlags';
import { useAppearance } from '../App';

export const CategoriesWidget: React.FC<{ 
    onCategorySelect: (categoryId: string) => void;
}> = ({ onCategorySelect }) => {
    const { themeColor } = useAppearance();
    const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
        e.preventDefault();
        onCategorySelect(categoryId);
    };

    return (
        <div className="bg-neutral-800 rounded-lg shadow-md">
            <h3 className={`bg-${themeColor}-600 text-white font-bold p-4 rounded-t-lg`}>Catégorie</h3>
            <ul className="p-4 space-y-2">
                {CATEGORIES.map((category) => (
                    <li key={category.id}>
                        <a href="#" onClick={(e) => handleCategoryClick(e, category.id)} className={`flex justify-between items-center hover:text-${themeColor}-500`}>
                            <span>{category.name}</span>
                            <span>&gt;</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const PlatDuJourWidget: React.FC<{ 
    setPage: (page: string) => void;
    onSelectProduct: (productId: number) => void;
}> = ({ setPage, onSelectProduct }) => {
    const { themeColor } = useAppearance();
    return (
        <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
            <h3 
                className={`font-bold text-white text-lg mb-4 cursor-pointer hover:text-${themeColor}-500 transition-colors`}
                onClick={() => setPage('plat-du-jour')}
            >
                Plat du jour
            </h3>
            
            {PLAT_DU_JOUR.lunch.length > 0 && (
                <div className="mb-4">
                    <h4 className={`font-semibold text-${themeColor}-400 mb-2 border-b border-neutral-700 pb-1`}>Midi</h4>
                    <div className="space-y-3 pt-2">
                        {PLAT_DU_JOUR.lunch.map((product) => (
                             <div 
                                key={`lunch-${product.id}`} 
                                className="flex items-center space-x-3 cursor-pointer group"
                                onClick={() => onSelectProduct(product.id)}
                            >
                                <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                                <div>
                                    <p className={`text-white text-sm font-medium group-hover:text-${themeColor}-500 transition-colors`}>{product.name}</p>
                                    <p className="text-neutral-400 text-sm">{product.price.toLocaleString()} CFA</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {PLAT_DU_JOUR.dinner.length > 0 && (
                 <div>
                    <h4 className={`font-semibold text-${themeColor}-400 mb-2 border-b border-neutral-700 pb-1`}>Soir</h4>
                    <div className="space-y-3 pt-2">
                        {PLAT_DU_JOUR.dinner.map((product) => (
                             <div 
                                key={`dinner-${product.id}`} 
                                className="flex items-center space-x-3 cursor-pointer group"
                                onClick={() => onSelectProduct(product.id)}
                             >
                                <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                                <div>
                                    <p className={`text-white text-sm font-medium group-hover:text-${themeColor}-500 transition-colors`}>{product.name}</p>
                                    <p className="text-neutral-400 text-sm">{product.price.toLocaleString()} CFA</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const LeftSidebar: React.FC<{ 
    onCategorySelect: (categoryId: string) => void;
    setPage: (page: string) => void;
    onSelectProduct: (productId: number) => void;
    showCategories?: boolean;
    showPlatDuJour?: boolean;
}> = ({ onCategorySelect, setPage, onSelectProduct, showCategories = true, showPlatDuJour = true }) => {
    const { themeColor } = useAppearance();
    const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
        e.preventDefault();
        onCategorySelect(categoryId);
    };

    return (
        <div className="space-y-8">
            {showCategories && <CategoriesWidget onCategorySelect={onCategorySelect} />}
            {showPlatDuJour && FEATURE_FLAGS.homepage.showPlatDuJourWidget && <PlatDuJourWidget setPage={setPage} onSelectProduct={onSelectProduct} />}
            
            {FEATURE_FLAGS.homepage.showTagsWidget && (
                <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-white text-lg mb-4">Nuage de tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => <a key={cat.id} href="#" onClick={(e) => handleCategoryClick(e, cat.id)} className={`bg-neutral-700 text-neutral-300 px-3 py-1 rounded-md text-sm hover:bg-${themeColor}-600 hover:text-white`}>{cat.name}</a>)}
                    </div>
                </div>
            )}

            {FEATURE_FLAGS.homepage.showDiscountBanner && (
                <div className="relative bg-cover bg-center rounded-lg text-white p-6 shadow-md" style={{ backgroundImage: "url('https://picsum.photos/id/122/300/400')" }}>
                    <div className="relative z-10 text-center">
                        <p className="text-2xl font-light">Jusqu'à</p>
                        <p className="text-6xl font-bold my-2">20<span className="text-3xl">%</span></p>
                        <p className="text-2xl font-light">de réduction</p>
                    </div>
                     <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                </div>
            )}
        </div>
    );
};

export default LeftSidebar;