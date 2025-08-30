import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';
import ProductCard from './ProductCard';

const BoissonsPage: React.FC<{ onSelectProduct: (id: number) => void }> = ({ onSelectProduct }) => {
    const drinkProducts = useMemo(() => {
        return PRODUCTS.filter(p => p.category === 'drinks');
    }, []);

    return (
        <div className="space-y-8">
            <div 
                className="relative bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center text-center min-h-[300px] p-8 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: "url('https://picsum.photos/id/1060/1200/400')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold text-white leading-tight">Nos Boissons Rafraîchissantes</h1>
                    <p className="text-xl text-neutral-300 mt-2">Découvrez notre sélection de boissons pour toutes les occasions.</p>
                </div>
            </div>

            <main className="w-full">
                {drinkProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {drinkProducts.map(product => 
                            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md">
                        <span className="material-icons-outlined text-6xl text-neutral-600">local_bar</span>
                        <p className="text-xl text-neutral-400 mt-4">Aucune boisson disponible pour le moment.</p>
                        <p className="text-neutral-500">Revenez bientôt !</p>
                    </div>
                )}
            </main>
            
        </div>
    );
};

export default BoissonsPage;