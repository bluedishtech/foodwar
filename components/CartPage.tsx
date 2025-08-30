import React, { useState } from 'react';
import { useCart, useUser, useOrders, useToast, useAppearance } from '../App';
import type { Order } from '../types';
import { APP_CONFIG } from '../constants';

const CartPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { cartItems, addToCart, decrementItem, removeItem, clearCart, getCartSubtotal, getDeliveryFee, getCartTotal, getCartItemCount } = useCart();
    const { user, isProfileDefault } = useUser();
    const { addOrder } = useOrders();
    const { showToast } = useToast();
    const { themeColor } = useAppearance();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckout = async () => {
        if (isProfileDefault()) {
            showToast(
                'Veuillez mettre à jour votre profil.',
                'info',
                {
                    label: 'Aller au profil',
                    onClick: () => setPage('account')
                }
            );
            return;
        }

        setIsSubmitting(true);
        const orderId = `FW-${Date.now().toString().slice(-6)}`;
        const newOrder: Order = {
            id: orderId,
            user: user,
            items: cartItems,
            subtotal: getCartSubtotal(),
            deliveryFee: getDeliveryFee(),
            total: getCartTotal(),
            date: new Date().toISOString(),
        };

        const endpoint = APP_CONFIG.FORMSPREE_ENDPOINTS.orderSubmission;

        if (endpoint.includes('YOUR_ORDER_FORM_ID')) {
             console.warn("Formspree order endpoint not configured. Skipping email notification.");
        } else {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        orderId: newOrder.id,
                        customerName: newOrder.user.name,
                        customerEmail: newOrder.user.email,
                        total: `${newOrder.total.toLocaleString()} CFA`,
                        items: newOrder.items.map(item => `${item.quantity}x ${item.name}`).join(', '),
                        details: newOrder
                    }),
                });

                if (!response.ok) {
                    throw new Error('La soumission de la commande a échoué.');
                }
            } catch (error) {
                console.error("Erreur lors de la soumission Formspree:", error);
                showToast("Erreur lors de l'envoi de la commande. Veuillez réessayer.", 'error');
                setIsSubmitting(false);
                return;
            }
        }
        
        // This part runs if Formspree is not configured or if submission was successful
        addOrder(newOrder);
        clearCart();
        showToast('Commande passée avec succès !', 'success');
        setPage('order-success');
        setIsSubmitting(false);
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md animate-fadeIn">
                <span className="material-icons-outlined text-6xl text-neutral-600">production_quantity_limits</span>
                <h1 className="text-3xl font-bold text-white mt-4">Votre panier est vide</h1>
                <p className="text-neutral-400 mt-2">Parcourez nos produits et trouvez quelque chose que vous aimez !</p>
                <button 
                    onClick={() => setPage('boutique')} 
                    className={`mt-6 bg-${themeColor}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${themeColor}-700 transition-all flex items-center justify-center space-x-2 mx-auto`}
                >
                    <span className="material-icons-outlined">storefront</span>
                    <span>Aller à la boutique</span>
                </button>
            </div>
        );
    }

    const subtotal = getCartSubtotal();
    const deliveryFee = getDeliveryFee();
    const total = getCartTotal();

    return (
        <div className="animate-fadeIn">
            <h1 className="text-4xl font-extrabold text-white mb-8">Votre Panier</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="bg-neutral-800 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 shadow-md">
                            <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                <p className="text-sm text-neutral-400">{item.price.toLocaleString()} CFA</p>
                            </div>
                            <div className="flex items-center border border-neutral-700 rounded-lg">
                                <button onClick={() => decrementItem(item.id)} className="px-3 py-1 text-neutral-400 hover:text-white">-</button>
                                <span className="px-4 py-1 text-white">{item.quantity}</span>
                                <button onClick={() => addToCart(item)} className="px-3 py-1 text-neutral-400 hover:text-white">+</button>
                            </div>
                            <p className="text-lg font-semibold text-white w-28 text-right">
                                {(item.price * item.quantity).toLocaleString()} CFA
                            </p>
                            <button onClick={() => removeItem(item.id)} className="text-neutral-500 hover:text-red-500 p-1" aria-label={`Supprimer ${item.name}`}>
                                <span className="material-icons-outlined">delete</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-neutral-800 p-6 rounded-lg sticky top-28 space-y-4 shadow-lg">
                        <h2 className="text-2xl font-bold text-white border-b border-neutral-700 pb-3">Résumé de la commande</h2>
                        <div className="flex justify-between text-neutral-300">
                            <span>Sous-total ({getCartItemCount()} articles)</span>
                            <span>{subtotal.toLocaleString()} CFA</span>
                        </div>
                        <div className="flex justify-between text-neutral-300">
                            <span>Livraison</span>
                            {deliveryFee === 0 ? (
                                <span className="font-semibold text-green-400">Gratuite</span>
                            ) : (
                                <span>{deliveryFee.toLocaleString()} CFA</span>
                            )}
                        </div>
                        <div className="border-t border-neutral-700 pt-4 flex justify-between text-white font-bold text-xl">
                            <span>Total</span>
                            <span>{total.toLocaleString()} CFA</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            disabled={isSubmitting}
                            className={`w-full bg-${themeColor}-600 text-white font-bold py-3 mt-4 rounded-lg hover:bg-${themeColor}-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? 'Traitement...' : 'Valider la commande'}
                        </button>
                        <button 
                            onClick={clearCart}
                            className="w-full bg-neutral-700 text-white font-semibold py-2 mt-2 rounded-lg hover:bg-neutral-600 transition-all text-sm"
                        >
                            Vider le panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;