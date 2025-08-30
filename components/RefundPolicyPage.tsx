import React from 'react';
import { APP_CONFIG } from '../constants';
import Logo from './Logo';
import { useAppearance } from '../App';

const RefundPolicyPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { themeColor } = useAppearance();
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <Logo size="md" />
                </div>
                <h1 className="text-4xl font-extrabold text-white text-center mb-6">Politique de Remboursement</h1>
                <div className="prose text-neutral-300 max-w-none space-y-4">
                    <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <h2>1. Satisfaction du client</h2>
                    <p>Chez FoodWar, votre satisfaction est notre priorité. Si vous n'êtes pas entièrement satisfait de votre commande, veuillez nous contacter immédiatement. Nous nous engageons à trouver une solution juste et rapide à tout problème que vous pourriez rencontrer.</p>
                    
                    <h2>2. Conditions de remboursement</h2>
                    <p>Nous offrons des remboursements ou des crédits dans les cas suivants :</p>
                    <ul>
                        <li><strong>Commande incorrecte :</strong> Si vous recevez un article que vous n'avez pas commandé.</li>
                        <li><strong>Problème de qualité :</strong> Si la qualité d'un plat ne répond pas à nos standards.</li>
                        <li><strong>Commande non livrée :</strong> Si votre commande n'arrive pas à destination.</li>
                    </ul>
                    <p>Pour être éligible à un remboursement, vous devez nous contacter dans les 2 heures suivant la réception de votre commande. Nous pouvons demander une photo du produit concerné pour évaluer le problème.</p>
                    
                    <h2>3. Processus de demande</h2>
                    <p>Pour demander un remboursement, veuillez contacter notre service client via la <a href="#" onClick={(e) => {e.preventDefault(); setPage('contact');}} className={`text-${themeColor}-500 hover:underline`}>page de contact</a> ou par téléphone au {APP_CONFIG.CONTACT_PHONE}. Veuillez fournir votre numéro de commande et une description claire du problème.</p>

                    <h2>4. Délai de traitement</h2>
                    <p>Les remboursements sont généralement traités dans un délai de 3 à 5 jours ouvrables. Le montant sera crédité sur votre mode de paiement original.</p>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicyPage;