import React from 'react';

const KitchenTourPage: React.FC = () => {
    return (
        <div className="animate-fadeIn space-y-8">
            <h1 className="text-4xl font-extrabold text-white text-center">Visitez Nos Cuisines</h1>
            <p className="text-neutral-400 text-center max-w-3xl mx-auto">Chez FoodWar, la transparence est une de nos valeurs fondamentales. Nous sommes fiers de nos cuisines, de nos processus et de la qualité de nos ingrédients. Découvrez comment nous préparons vos plats préférés avec passion et rigueur.</p>
            
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-neutral-900 rounded-md mb-6 flex items-center justify-center min-h-[250px]">
                    <p className="text-neutral-500">Vidéo de la cuisine à venir...</p>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Notre Engagement Qualité</h2>
                <p className="text-neutral-300">
                    Chaque jour, nous nous engageons à respecter les normes d'hygiène les plus strictes. Nos chefs talentueux travaillent avec des produits frais, locaux autant que possible, pour vous garantir des saveurs authentiques à chaque bouchée. De la réception des matières premières à la préparation finale, chaque étape est contrôlée pour assurer une qualité irréprochable.
                </p>
            </div>
        </div>
    );
};

export default KitchenTourPage;
