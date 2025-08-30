import React from 'react';
import { PLAT_DU_JOUR } from '../constants';
import type { Product } from '../types';
import { useAppearance } from '../App';

// New Lunch Card Component
const PlatDuJourLunchCard: React.FC<{ product: Product, onSelectProduct: (id: number) => void }> = ({ product, onSelectProduct }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-xl group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
        <div className="relative">
            <img 
                src={Array.isArray(product.image) ? product.image[0] : product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white leading-tight">{product.name}</h3>
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-neutral-400 mb-4 flex-grow">{product.description}</p>
            <div className="flex justify-between items-center mt-auto">
                <p className={`text-2xl font-bold text-${themeColor}-500`}>{product.price.toLocaleString()} CFA</p>
                <button 
                    onClick={() => onSelectProduct(product.id)}
                    className={`bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-${themeColor}-600 hover:text-white transition-all flex items-center gap-2`}
                >
                    <span>Détails</span>
                    <span className="material-icons-outlined text-lg">arrow_forward</span>
                </button>
            </div>
        </div>
    </div>
)};

// New Dinner Card Component
const PlatDuJourDinnerItem: React.FC<{ product: Product, onSelectProduct: (id: number) => void }> = ({ product, onSelectProduct }) => {
    const { themeColor } = useAppearance();
    return (
    <div className={`bg-neutral-800/50 rounded-lg shadow-lg overflow-hidden group flex flex-col md:flex-row items-center gap-6 p-4 border border-transparent hover:border-${themeColor}-500/50 transition-all duration-300`}>
        <img 
            src={Array.isArray(product.image) ? product.image[0] : product.image} 
            alt={product.name} 
            className="w-full md:w-56 h-48 md:h-full object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex-1 text-center md:text-left">
            <h3 className={`text-2xl font-bold text-white mb-2 group-hover:text-${themeColor}-400 transition-colors`}>{product.name}</h3>
            <p className="text-neutral-400 mb-4">{product.description}</p>
            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4">
                <p className={`text-2xl font-bold text-${themeColor}-500`}>{product.price.toLocaleString()} CFA</p>
                <button 
                    onClick={() => onSelectProduct(product.id)}
                    className={`bg-${themeColor}-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-${themeColor}-700 transition-colors w-full md:w-auto`}
                >
                    Commander
                </button>
            </div>
        </div>
    </div>
)};


const SectionHeader: React.FC<{ icon: string }> = ({ icon }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="flex items-center gap-4">
        <div className="flex-grow h-px bg-neutral-700"></div>
        <span className={`material-icons-outlined text-3xl text-${themeColor}-500`}>{icon}</span>
        <div className="flex-grow h-px bg-neutral-700"></div>
    </div>
)};

const PlatDuJourPage: React.FC<{ onSelectProduct: (id: number) => void }> = ({ onSelectProduct }) => {
    const { themeColor } = useAppearance();
    return (
        <div className="space-y-20 animate-fadeIn">
            <div 
                className="relative bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center text-center min-h-[450px] p-8 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: "url('https://picsum.photos/id/1068/1200/500')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <span className={`material-icons-outlined text-6xl text-${themeColor}-500 mb-4`}>restaurant_menu</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                        Les Suggestions du Chef
                    </h1>
                    <p className="text-xl text-neutral-300 mt-4 max-w-2xl mx-auto">
                        Une sélection spéciale, préparée chaque jour avec les ingrédients les plus frais pour une expérience culinaire inoubliable.
                    </p>
                </div>
            </div>

            {PLAT_DU_JOUR.lunch.length > 0 && (
                <section>
                    <div className="text-center mb-10">
                        <SectionHeader icon="wb_sunny" />
                        <h2 className="text-4xl font-bold text-white mt-4">La Pause Déjeuner</h2>
                        <p className="text-neutral-400 mt-2">Léger, savoureux et parfait pour recharger les batteries.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PLAT_DU_JOUR.lunch.map(product => (
                            <PlatDuJourLunchCard key={`lunch-${product.id}`} product={product} onSelectProduct={onSelectProduct} />
                        ))}
                    </div>
                </section>
            )}

            {PLAT_DU_JOUR.dinner.length > 0 && (
                 <section>
                    <div className="text-center mb-10">
                        <SectionHeader icon="bedtime" />
                        <h2 className="text-4xl font-bold text-white mt-4">Le Dîner Étoilé</h2>
                        <p className="text-neutral-400 mt-2">Des plats réconfortants pour terminer votre journée en beauté.</p>
                    </div>
                    <div className="flex flex-col gap-8">
                        {PLAT_DU_JOUR.dinner.map(product => (
                            <PlatDuJourDinnerItem key={`dinner-${product.id}`} product={product} onSelectProduct={onSelectProduct} />
                        ))}
                    </div>
                </section>
            )}
            
            {PLAT_DU_JOUR.lunch.length === 0 && PLAT_DU_JOUR.dinner.length === 0 && (
                 <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md">
                    <span className="material-icons-outlined text-6xl text-neutral-600">restaurant_menu</span>
                    <p className="text-xl text-neutral-400 mt-4">Aucun plat du jour n'est disponible pour le moment.</p>
                    <p className="text-neutral-500">Revenez bientôt pour découvrir les suggestions de nos chefs !</p>
                </div>
            )}
        </div>
    );
};

export default PlatDuJourPage;