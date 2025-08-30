import React from 'react';
import Logo from './Logo';
import { useAppearance } from '../App';

const PrivacyPolicyPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { themeColor } = useAppearance();
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <Logo size="md" />
                </div>
                <h1 className="text-4xl font-extrabold text-white text-center mb-6">Politique de Confidentialité</h1>
                <div className="prose text-neutral-300 max-w-none space-y-4">
                    <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <h2>1. Introduction</h2>
                    <p>FoodWar ("nous", "notre", "nos") s'engage à protéger la vie privée de ses utilisateurs ("vous", "votre"). Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web.</p>
                    
                    <h2>2. Collecte de vos informations</h2>
                    <p>Nous pouvons collecter des informations vous concernant de plusieurs manières :</p>
                    <ul>
                        <li><strong>Données personnelles identifiables :</strong> Nom, adresse e-mail, numéro de téléphone, que vous nous fournissez volontairement lors de la création d'un compte ou de la passation d'une commande.</li>
                        <li><strong>Données d'utilisation :</strong> Informations collectées automatiquement par nos serveurs, telles que votre adresse IP, type de navigateur, pages visitées et horodatages.</li>
                    </ul>
                    
                    <h2>3. Utilisation de vos informations</h2>
                    <p>Avoir des informations précises nous permet de vous offrir une expérience fluide, efficace et personnalisée. Spécifiquement, nous pouvons utiliser les informations collectées pour :</p>
                    <ul>
                        <li>Gérer votre compte et vos commandes.</li>
                        <li>Vous envoyer des e-mails promotionnels et des newsletters (avec option de désinscription).</li>
                        <li>Améliorer l'efficacité et le fonctionnement du site.</li>
                        <li>Analyser l'utilisation et les tendances pour améliorer votre expérience.</li>
                    </ul>

                    <h2>4. Sécurité de vos informations</h2>
                    <p>Nous utilisons des mesures de sécurité administratives, techniques et physiques pour aider à protéger vos informations personnelles. Bien que nous ayons pris des mesures raisonnables pour sécuriser les informations personnelles que vous nous fournissez, veuillez être conscient qu'aucune mesure de sécurité n'est parfaite ou impénétrable.</p>

                    <h2>5. Contactez-nous</h2>
                    <p>Si vous avez des questions ou des commentaires sur cette politique de confidentialité, veuillez nous contacter via la <a href="#" onClick={(e) => {e.preventDefault(); setPage('contact');}} className={`text-${themeColor}-500 hover:underline`}>page de contact</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;