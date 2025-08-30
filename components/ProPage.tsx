import React, { useState } from 'react';
import { APP_CONFIG } from '../constants';
import { useToast, useAppearance } from '../App';

const BenefitItem: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="bg-neutral-800 p-6 rounded-lg text-center">
        <div className="flex justify-center mb-4">
             <div className="bg-neutral-700 p-4 rounded-full">
                <span className={`material-icons-outlined text-${themeColor}-500 text-4xl`}>{icon}</span>
            </div>
        </div>
        <h4 className="font-bold text-white text-xl mb-2">{title}</h4>
        <p className="text-neutral-400">{children}</p>
    </div>
)};

const ProPage: React.FC = () => {
    const { showToast } = useToast();
    const { themeColor } = useAppearance();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const endpoint = APP_CONFIG.FORMSPREE_ENDPOINTS.partnershipInquiry;

        if (endpoint.includes('YOUR_PARTNERSHIP_FORM_ID')) {
            console.error("Formspree partnership endpoint not configured.");
            showToast("La soumission du formulaire n'est pas configurée.", 'error');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                showToast('Demande envoyée avec succès !', 'success');
                form.reset();
            } else {
                throw new Error("La soumission a échoué.");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission Formspree:", error);
            showToast("Erreur lors de l'envoi de la demande. Veuillez réessayer.", 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-12">
            <div 
                className="relative bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center text-center min-h-[350px] p-8 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: "url('https://picsum.photos/id/1067/1200/400')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Devenez Partenaire FoodWar</h1>
                    <p className="text-lg md:text-xl text-neutral-300 mt-4">Rejoignez notre réseau de restaurants et touchez des milliers de nouveaux clients chaque jour.</p>
                </div>
            </div>

            <section>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Pourquoi s'associer à FoodWar ?</h2>
                    <p className="text-neutral-400 mt-2">Augmentez votre visibilité, optimisez vos opérations et développez votre chiffre d'affaires.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <BenefitItem icon="storefront" title="Plus de Visibilité">
                        Présentez votre menu à une large audience de clients affamés dans votre région.
                    </BenefitItem>
                     <BenefitItem icon="delivery_dining" title="Livraison Simplifiée">
                        Profitez de notre flotte de livreurs pour des livraisons rapides et fiables, sans effort de votre part.
                    </BenefitItem>
                     <BenefitItem icon="insights" title="Outils Analytiques">
                        Accédez à des données précieuses sur vos ventes et vos clients pour prendre des décisions éclairées.
                    </BenefitItem>
                </div>
            </section>
            
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-4">Prêt à développer votre activité ?</h3>
                        <p className="text-neutral-400 mb-6">Remplissez le formulaire et un membre de notre équipe dédiée aux partenariats vous contactera pour discuter des prochaines étapes. L'inscription est simple et rapide.</p>
                        <ul className="space-y-3 text-neutral-300">
                           <li className="flex items-center gap-3">
                                <span className={`material-icons-outlined text-${themeColor}-500`}>check_circle</span>
                               <span>Aucun frais de démarrage</span>
                           </li>
                           <li className="flex items-center gap-3">
                                <span className={`material-icons-outlined text-${themeColor}-500`}>check_circle</span>
                               <span>Assistance marketing et support technique</span>
                           </li>
                           <li className="flex items-center gap-3">
                                <span className={`material-icons-outlined text-${themeColor}-500`}>check_circle</span>
                               <span>Flexibilité et contrôle total sur votre menu</span>
                           </li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900 p-6 rounded-lg">
                         <form className="space-y-4" onSubmit={handleSubmit}>
                            <h4 className="text-xl font-bold text-white text-center mb-4">Demande de Partenariat</h4>
                            <div>
                                <label htmlFor="restaurantName" className="block text-sm font-medium text-neutral-300 mb-1">Nom du Restaurant</label>
                                <input type="text" id="restaurantName" name="restaurantName" required className={`w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                            </div>
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-medium text-neutral-300 mb-1">Votre Nom</label>
                                <input type="text" id="contactName" name="contactName" required className={`w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                            </div>
                            <div>
                                <label htmlFor="proEmail" className="block text-sm font-medium text-neutral-300 mb-1">Adresse E-mail</label>
                                <input type="email" id="proEmail" name="email" required className={`w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                            </div>
                            <div>
                                <label htmlFor="proPhone" className="block text-sm font-medium text-neutral-300 mb-1">Numéro de Téléphone</label>
                                <input type="tel" id="proPhone" name="phone" required className={`w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting} className={`w-full bg-${themeColor}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${themeColor}-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}>
                                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer la Demande'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProPage;