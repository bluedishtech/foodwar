import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../constants';
import type { Order } from '../types';
import { useAppearance } from '../App';

const OrderSuccessPage: React.FC<{ order: Order, setPage: (page: string) => void }> = ({ order, setPage }) => {
    const [copied, setCopied] = useState(false);
    const [countdown, setCountdown] = useState(15);
    const { themeColor } = useAppearance();
    
    const whatsAppMessage = encodeURIComponent(`Bonjour, je viens de passer la commande : *${order.id}*`);
    const whatsAppLink = `https://wa.me/${APP_CONFIG.DELIVERY_CONFIG.WHATSAPP_ORDER_NUMBER}?text=${whatsAppMessage}`;

    useEffect(() => {
        if (countdown <= 0) {
            window.location.href = whatsAppLink;
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown, whatsAppLink]);

    const handleCopy = () => {
        navigator.clipboard.writeText(order.id).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="animate-fadeIn max-w-2xl mx-auto text-center">
            <div className="bg-neutral-700 text-neutral-200 p-3 rounded-lg mb-6 text-center animate-fadeIn">
                <p>Vous serez redirigé vers WhatsApp dans <span className="font-bold text-white">{countdown}</span> secondes...</p>
            </div>
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                    <div className="bg-green-500 rounded-full p-3">
                        <span className="material-icons-outlined text-4xl text-white">check</span>
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-white">Merci pour votre commande !</h1>
                <p className="text-neutral-400 mt-2">Votre commande a été reçue et est en cours de préparation.</p>
                
                <div className="bg-neutral-900/50 p-6 rounded-lg my-6">
                    <p className="text-neutral-300">Votre numéro de commande est :</p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <p className="text-2xl font-mono tracking-widest text-white bg-neutral-700 px-4 py-2 rounded-md">{order.id}</p>
                        <button 
                            onClick={handleCopy}
                            className="bg-neutral-600 text-white p-2 rounded-full hover:bg-neutral-500 transition-colors flex items-center justify-center"
                            aria-label="Copier le numéro de commande"
                            title="Copier le numéro de commande"
                        >
                            <span className="material-icons-outlined text-base">
                                {copied ? 'check' : 'content_copy'}
                            </span>
                        </button>
                    </div>
                    {copied && <span className="text-sm text-green-400 animate-fadeIn mt-2 block">Copié !</span>}
                </div>

                <div className="border-t border-neutral-700 pt-6">
                    <h2 className="text-xl font-bold text-white">Prochaine étape</h2>
                    <p className="text-neutral-400 mt-2 mb-4">Pour finaliser et suivre votre commande, veuillez nous contacter sur WhatsApp avec votre numéro de commande.</p>
                    
                    <a 
                        href={whatsAppLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center space-x-3"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.167 1.687zm6.217-4.833l.341.202c1.452.867 3.091 1.32 4.773 1.32 5.454 0 9.917-4.463 9.917-9.917s-4.463-9.917-9.917-9.917-9.917 4.464-9.917 9.917c0 1.764.476 3.489 1.325 4.948l.205.323-1.03 3.759 3.824-1.026zm.507-3.945c-.244-.121-1.442-.712-1.666-.791-.225-.08-.387-.121-.55-.406-.163-.284-.623-.791-.763-1.026-.14-.234-.28-.268-.523-.268-.244 0-.523-.04-.763-.04-.243 0-.645.323-.828.609-.183.284-.689.837-.828 1.026-.14.183-.28.22-.524.08-.244-.121-1.03- .386-1.956-1.213-.716-.645-1.196-1.442-1.336-1.687-.14-.244-.028-.386.08-.507.092-.107.205-.284.308-.426.102-.142.144-.244.205-.406.061-.162.03-.306-.015-.426-.045-.121-.55-.656-.763-1.176-.205-.506-.426-.445-.578-.445-.14 0-.305-.015-.465-.015s-.426.08-.645.323c-.225.244-.875.837-1.079 1.326-.205.488-.396 1.002-.396 1.556.001 1.058.426 1.999 1.309 2.827 1.144 1.036 2.379 1.83 4.14 2.457 1.201.44 2.019.645 2.536.81.56.183 1.002.163 1.362.102.396-.061 1.212-.488 1.456-1.026.244-.524.244-.973.183-1.058-.061-.08-.225-.121-.465-.243z" /></svg>
                        <span>Continuer sur WhatsApp</span>
                    </a>
                    <button 
                        onClick={() => setPage('home')}
                        className={`mt-4 text-sm text-neutral-400 hover:text-${themeColor}-500`}
                    >
                        Retourner à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;