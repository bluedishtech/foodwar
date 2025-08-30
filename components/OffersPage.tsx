import React from 'react';

const OfferCard: React.FC<{ title: string; description: string; validity: string; image: string }> = ({ title, description, validity, image }) => (
    <div className="bg-neutral-800 rounded-lg shadow-lg flex flex-col md:flex-row items-center overflow-hidden">
        <img src={image} alt={title} className="w-full md:w-1/3 h-48 md:h-full object-cover"/>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-neutral-400 mt-2">{description}</p>
            <p className="text-sm text-yellow-400 mt-4 font-semibold">{validity}</p>
        </div>
    </div>
);

const OffersPage: React.FC = () => {
    return (
        <div className="animate-fadeIn space-y-8">
            <h1 className="text-4xl font-extrabold text-white text-center">Offres Programmées</h1>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto">Profitez de nos offres spéciales et dégustez vos plats préférés à prix réduit. Revenez régulièrement pour ne rien manquer !</p>
            <div className="space-y-8">
                <OfferCard
                    title="Mardi Pizza Folie"
                    description="Toutes les pizzas classiques à 5000 CFA seulement, tous les mardis. Parfait pour une soirée entre amis ou en famille."
                    validity="Valable tous les mardis, de 18h à 22h."
                    image="https://picsum.photos/id/292/400/300"
                />
                <OfferCard
                    title="Menu Étudiant"
                    description="Un burger classique + frites + boisson à 6000 CFA sur présentation de votre carte étudiant."
                    validity="Valable du lundi au vendredi, de 12h à 15h."
                    image="https://picsum.photos/id/163/400/300"
                />
                <OfferCard
                    title="Week-end Famille"
                    description="Achetez 2 pizzas familiales et recevez une bouteille de boisson de 1,5L gratuite."
                    validity="Valable tous les samedis et dimanches."
                    image="https://picsum.photos/id/180/400/300"
                />
            </div>
        </div>
    );
};

export default OffersPage;
