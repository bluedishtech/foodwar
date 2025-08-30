import React, { useState, useEffect } from 'react';
import { useUser, useAppearance } from '../App';
import type { User } from '../types';
import { THEME_OPTIONS } from '../constants';
import { FEATURE_FLAGS } from '../featureFlags';

const DashboardCard: React.FC<{ icon: string; title: string; children: React.ReactNode; onClick?: () => void; }> = ({ icon, title, children, onClick }) => {
    const { themeColor } = useAppearance();
    return (
    <div 
        className={`bg-neutral-800 p-6 rounded-lg shadow-lg ${onClick ? 'cursor-pointer hover:bg-neutral-700 transition-colors' : ''}`}
        onClick={onClick}
    >
        <div className="flex items-center gap-4 mb-4">
            <span className={`material-icons-outlined text-3xl text-${themeColor}-500`}>{icon}</span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div>{children}</div>
    </div>
)};


const AccountPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { user, updateUser } = useUser();
    const { fontSize, setFontSize, themeColor, setThemeColor } = useAppearance();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<User>(user);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUser(formData);
        setIsEditing(false);
        setSuccessMessage('Profil mis à jour avec succès !');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div className="animate-fadeIn space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white text-center">Mon Compte</h1>
            
            {successMessage && (
                <div className="bg-green-800 border border-green-600 text-green-200 px-4 py-3 rounded-lg text-center animate-fadeIn">
                    {successMessage}
                </div>
            )}

            {FEATURE_FLAGS.accountPage.showProfileSection && (
                <DashboardCard icon="person" title="Mon Profil">
                    {!isEditing ? (
                        <div className="space-y-3">
                            <p className="text-neutral-400">Nom : <span className="text-neutral-200">{user.name}</span></p>
                            <p className="text-neutral-400">Email : <span className="text-neutral-200">{user.email}</span></p>
                            <button onClick={() => setIsEditing(true)} className="mt-4 bg-neutral-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-neutral-500 transition-all text-sm">
                                Modifier le profil
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Nom</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className={`bg-${themeColor}-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-${themeColor}-700 transition-all`}>
                                    Enregistrer
                                </button>
                                <button type="button" onClick={() => { setIsEditing(false); setFormData(user); }} className="bg-neutral-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-neutral-500 transition-all">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}
                </DashboardCard>
            )}

            {FEATURE_FLAGS.accountPage.showAppearanceSection && (
                <DashboardCard icon="tune" title="Apparence">
                    <div className="space-y-6">
                        <div>
                            <label className="text-neutral-300 mb-2 block font-medium">Taille de la police</label>
                            <div className="flex items-center gap-2 rounded-lg bg-neutral-900 p-1">
                                {(['small', 'medium', 'large'] as const).map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setFontSize(size)}
                                        className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
                                            fontSize === size
                                                ? `bg-${themeColor}-600 text-white shadow`
                                                : 'text-neutral-300 hover:bg-neutral-700'
                                        }`}
                                        aria-pressed={fontSize === size}
                                    >
                                        {size === 'small' ? 'Petite' : size === 'medium' ? 'Moyenne' : 'Grande'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-neutral-300 mb-2 block font-medium">Couleur du thème</label>
                            <div className="flex items-center gap-3">
                                {THEME_OPTIONS.map(theme => (
                                    <button
                                        key={theme.color}
                                        onClick={() => setThemeColor(theme.color)}
                                        className={`w-10 h-10 rounded-full bg-${theme.color}-600 transition-all duration-200 transform hover:scale-110 focus:outline-none ${
                                            themeColor === theme.color
                                                ? 'ring-2 ring-offset-2 ring-offset-neutral-800 ring-white'
                                                : ''
                                        }`}
                                        aria-label={`Choisir le thème ${theme.name}`}
                                        title={theme.name}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </DashboardCard>
            )}

            {FEATURE_FLAGS.accountPage.showStatsLink && (
                <DashboardCard icon="bar_chart" title="Mes Statistiques" onClick={() => setPage('stats')}>
                    <p className="text-neutral-400">Visualisez vos habitudes et préférences grâce à des graphiques personnalisés.</p>
                </DashboardCard>
            )}
            
            {FEATURE_FLAGS.accountPage.showDataLink && (
                <DashboardCard icon="database" title="Gérer mes données" onClick={() => setPage('data')}>
                    <p className="text-neutral-400">Exportez vos données personnelles (profil, panier, favoris) ou importez-les depuis une sauvegarde.</p>
                </DashboardCard>
            )}

            {FEATURE_FLAGS.accountPage.showOrderHistoryLink && (
                <DashboardCard icon="history" title="Historique des commandes" onClick={() => setPage('order-history')}>
                    <p className="text-neutral-400">Consultez la liste de toutes vos commandes passées.</p>
                </DashboardCard>
            )}
        </div>
    );
};

export default AccountPage;