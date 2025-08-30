import React from 'react';
import { useAppearance } from '../App';

const NotFoundPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { themeColor } = useAppearance();
    return (
        <div className="text-center py-16 bg-neutral-800 rounded-lg shadow-md animate-fadeIn">
            <span className={`material-icons-outlined text-9xl text-${themeColor}-500`}>ramen_dining</span>
            <h1 className="text-5xl font-extrabold text-white mt-4">404</h1>
            <h2 className="text-3xl font-bold text-white mt-2">Page Non Trouvée</h2>
            <p className="text-neutral-400 mt-4">Oups ! Il semblerait que le plat que vous cherchez ne soit pas au menu.</p>
            <button
                onClick={() => setPage('home')}
                className={`mt-8 bg-${themeColor}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${themeColor}-700 transition-all flex items-center justify-center space-x-2 mx-auto`}
            >
                <span className="material-icons-outlined">home</span>
                <span>Retour à l'accueil</span>
            </button>
        </div>
    );
};

export default NotFoundPage;