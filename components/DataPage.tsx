import React, { useRef, useState } from 'react';
import { useCart, useFavorites, useUser, useAppearance } from '../App';

const DataPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { cartItems, setCartItems } = useCart();
    const { favorites, setFavorites } = useFavorites();
    const { user, updateUser } = useUser();
    const { fontSize, setFontSize, themeColor, setThemeColor } = useAppearance();
    
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const showFeedback = (type: 'success' | 'error', message: string) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback(null), 5000);
    };

    const handleExport = () => {
        try {
            const dataToExport = {
                userProfile: user,
                cartItems: cartItems,
                favorites: favorites,
                appearance: {
                    fontSize: fontSize,
                    themeColor: themeColor,
                },
                exportDate: new Date().toISOString(),
            };
            const jsonString = JSON.stringify(dataToExport, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'foodwar-backup.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showFeedback('success', 'Vos données ont été exportées avec succès.');
        } catch (error) {
            console.error("Erreur lors de l'exportation des données:", error);
            showFeedback('error', "Une erreur s'est produite lors de l'exportation.");
        }
    };
    
    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("Le fichier ne peut pas être lu.");
                
                const data = JSON.parse(text);

                // Basic validation
                if (!data.userProfile || !Array.isArray(data.cartItems) || !Array.isArray(data.favorites)) {
                    throw new Error("Le fichier de sauvegarde est invalide ou corrompu.");
                }

                // Update context and localStorage
                updateUser(data.userProfile);
                setCartItems(data.cartItems);
                setFavorites(data.favorites);

                // Import appearance settings if they exist (backward compatibility)
                if (data.appearance) {
                    if (data.appearance.fontSize) {
                        setFontSize(data.appearance.fontSize);
                    }
                    if (data.appearance.themeColor) {
                        setThemeColor(data.appearance.themeColor);
                    }
                }

                showFeedback('success', 'Données importées avec succès ! La page va s\'actualiser.');
                setTimeout(() => window.location.reload(), 2000);

            } catch (error) {
                console.error("Erreur lors de l'importation des données:", error);
                const message = error instanceof Error ? error.message : "Une erreur inconnue s'est produite.";
                showFeedback('error', `Échec de l'importation : ${message}`);
            } finally {
                // Reset file input
                if(fileInputRef.current) fileInputRef.current.value = '';
            }
        };
        reader.readAsText(file);
    };
    const { themeColor: activeTheme } = useAppearance();

    return (
        <div className="animate-fadeIn max-w-2xl mx-auto">
            <button onClick={() => setPage('account')} className={`mb-8 inline-flex items-center gap-2 text-${activeTheme}-500 hover:text-${activeTheme}-400 font-semibold`}>
                <span className="material-icons-outlined">arrow_back</span>
                Retour au compte
            </button>
            <div className="bg-neutral-800 p-8 rounded-lg space-y-8 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white text-center">Gestion des Données</h1>
                
                {feedback && (
                    <div className={`border ${feedback.type === 'success' ? 'bg-green-800 border-green-600 text-green-200' : 'bg-red-800 border-red-600 text-red-200'} px-4 py-3 rounded-lg text-center animate-fadeIn`}>
                        {feedback.message}
                    </div>
                )}
                
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">Exporter vos données</h2>
                        <p className="text-neutral-400 mb-4">Créez une sauvegarde de votre profil, panier, favoris et préférences d'apparence. Vous pourrez l'utiliser pour restaurer vos informations plus tard ou sur un autre appareil.</p>
                        <button 
                            onClick={handleExport}
                            className={`w-full bg-${activeTheme}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${activeTheme}-700 transition-all flex items-center justify-center space-x-2`}
                        >
                            <span className="material-icons-outlined">download</span>
                            <span>Télécharger ma sauvegarde</span>
                        </button>
                    </div>

                    <div className="border-t border-neutral-700"></div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">Importer vos données</h2>
                        <p className="text-neutral-400 mb-4">Restaurez vos informations depuis un fichier de sauvegarde (`.json`). Attention, cela remplacera vos données actuelles (panier, favoris, profil, préférences).</p>
                        <button 
                            onClick={handleImportClick}
                            className="w-full bg-neutral-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-neutral-500 transition-all flex items-center justify-center space-x-2"
                        >
                            <span className="material-icons-outlined">upload</span>
                            <span>Choisir un fichier de sauvegarde</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="application/json"
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataPage;