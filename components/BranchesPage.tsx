import React from 'react';
import { APP_CONFIG } from '../constants';
import { useAppearance } from '../App';

const BranchCard: React.FC<{ name: string; address: string; phone: string; mapSrc: string; mapLink: string }> = ({ name, address, phone, mapSrc, mapLink }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
        <div className="h-48">
            <iframe 
                src={mapSrc}
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={`Carte pour ${name}`}
            ></iframe>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-neutral-400 mt-2">{address}</p>
            <p className="text-neutral-400 mt-1">{phone}</p>
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className={`inline-block mt-4 text-${themeColor}-500 font-semibold hover:text-${themeColor}-400`}>
                Obtenir l'itinéraire &rarr;
            </a>
        </div>
    </div>
)};

const BranchesPage: React.FC = () => {
    return (
        <div className="animate-fadeIn space-y-8">
            <h1 className="text-4xl font-extrabold text-white text-center">Nos Agences</h1>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto">Trouvez le restaurant FoodWar le plus proche de chez vous. Nous sommes impatients de vous accueillir !</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BranchCard 
                    name="FoodWar Keur Massar" 
                    address={APP_CONFIG.ADDRESS}
                    phone={APP_CONFIG.CONTACT_PHONE}
                    mapSrc={APP_CONFIG.GOOGLE_MAPS_IFRAME_SRC}
                    mapLink={APP_CONFIG.GOOGLE_MAPS_ITINERARY_LINK}
                />
                <BranchCard 
                    name="FoodWar Centre-ville" 
                    address="123 Avenue de la République, Dakar, Sénégal"
                    phone="+221 77 987 65 43"
                    mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15437.398671174196!2d-17.466534138092038!3d14.69370903310008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5b3c3b3b3%3A0x5b3b3b3b3b3b3b3b!2sPlace%20de%20l'Ind%C3%A9pendance!5e0!3m2!1sfr!2ssn!4v1716383346513!5m2!1sfr!2ssn"
                    mapLink="https://maps.google.com/maps/dir//Place+de+l'Ind%C3%A9pendance+Dakar"
                />
            </div>
        </div>
    );
};

export default BranchesPage;