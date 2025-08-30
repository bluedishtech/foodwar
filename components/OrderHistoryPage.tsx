import React, { useState } from 'react';
import { useOrders, useAppearance } from '../App';
import type { Order } from '../types';

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { themeColor } = useAppearance();
    const orderDate = new Date(order.date);

    return (
        <div className="bg-neutral-800 rounded-lg shadow-md transition-all duration-300">
            <div 
                className="p-4 flex flex-col md:flex-row justify-between items-center cursor-pointer hover:bg-neutral-700/50"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
                    <p className="font-mono text-sm text-neutral-400">ID: <span className="text-white">{order.id}</span></p>
                </div>
                <div className="flex-1 text-center mb-2 md:mb-0">
                    <p className="text-sm text-neutral-400">
                        {orderDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <div className="flex-1 text-center md:text-right mb-2 md:mb-0">
                    <p className={`font-bold text-lg text-${themeColor}-500`}>{order.total.toLocaleString()} CFA</p>
                </div>
                <div className="w-12 text-right">
                    <span className={`material-icons-outlined text-neutral-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </div>
            
            {isExpanded && (
                <div className="border-t border-neutral-700 p-4 animate-fadeIn space-y-3">
                    <h4 className="text-md font-semibold text-white mb-2">Détails de la commande :</h4>
                    {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm text-neutral-300 bg-neutral-900/50 p-2 rounded-md">
                            <div>
                                <span className="font-bold">{item.quantity}x</span> {item.name}
                            </div>
                            <span>{(item.price * item.quantity).toLocaleString()} CFA</span>
                        </div>
                    ))}
                    <div className="border-t border-neutral-700/50 my-2"></div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400">Sous-total:</span>
                        <span className="text-neutral-300">{order.subtotal.toLocaleString()} CFA</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400">Livraison:</span>
                        <span className="text-neutral-300">{order.deliveryFee > 0 ? `${order.deliveryFee.toLocaleString()} CFA` : 'Gratuite'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};


const OrderHistoryPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { orders } = useOrders();
    const { themeColor } = useAppearance();

    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
             <button onClick={() => setPage('account')} className={`mb-8 inline-flex items-center gap-2 text-${themeColor}-500 hover:text-${themeColor}-400 font-semibold`}>
                <span className="material-icons-outlined">arrow_back</span>
                Retour au compte
            </button>
            <h1 className="text-4xl font-extrabold text-white text-center mb-8">Historique des commandes</h1>

            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map(order => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md">
                    <span className="material-icons-outlined text-6xl text-neutral-600">receipt_long</span>
                    <h2 className="text-2xl font-bold text-white mt-4">Aucune commande trouvée</h2>
                    <p className="text-neutral-400 mt-2">Vous n'avez pas encore passé de commande.</p>
                    <button 
                        onClick={() => setPage('boutique')} 
                        className={`mt-6 bg-${themeColor}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${themeColor}-700 transition-all`}
                    >
                        Commencer vos achats
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;