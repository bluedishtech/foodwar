import React from 'react';

const TeamMemberCard: React.FC<{ name: string; role: string; image: string; bio: string }> = ({ name, role, image, bio }) => (
    <div className="bg-neutral-800 p-6 rounded-lg text-center shadow-lg">
        <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-neutral-700"/>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-blue-400 font-semibold">{role}</p>
        <p className="text-neutral-400 mt-2 text-sm">{bio}</p>
    </div>
);

const TeamPage: React.FC = () => {
    return (
        <div className="animate-fadeIn space-y-8">
            <h1 className="text-4xl font-extrabold text-white text-center">Notre Équipe</h1>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto">Derrière chaque plat délicieux se trouve une équipe de passionnés. Rencontrez les personnes qui font de FoodWar une expérience unique.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMemberCard 
                    name="Chef Alioune"
                    role="Chef Cuisinier"
                    image="https://picsum.photos/seed/chef1/200"
                    bio="Avec plus de 15 ans d'expérience, Chef Alioune est le maître de nos saveurs. Sa passion pour les produits frais et locaux se ressent dans chaque plat."
                />
                <TeamMemberCard 
                    name="Fatou Ndiaye"
                    role="Manager du Restaurant"
                    image="https://picsum.photos/seed/manager1/200"
                    bio="Fatou veille à ce que votre expérience soit parfaite, de la commande à la livraison. Son sourire et son efficacité sont légendaires."
                />
                 <TeamMemberCard 
                    name="Moussa Faye"
                    role="Responsable Logistique"
                    image="https://picsum.photos/seed/logistics1/200"
                    bio="Moussa est le chef d'orchestre de nos livraisons. Il s'assure que votre commande arrive chaude et à l'heure, à chaque fois."
                />
            </div>
        </div>
    );
};

export default TeamPage;
