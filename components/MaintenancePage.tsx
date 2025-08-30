import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../constants';
import { MAINTENANCE_OPTIONS } from '../featureFlags';
import Logo from './Logo';

const socialIcons: { [key: string]: JSX.Element } = {
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Facebook">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Twitter">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.791 4.649-.41.111-.843.17-1.284.17-.305 0-.6-.03-.89-.086.63 1.884 2.458 3.261 4.632 3.3-1.623 1.274-3.663 2.031-5.877 2.031-.383 0-.761-.022-1.135-.067 2.099 1.353 4.604 2.145 7.29 2.145 8.749 0 13.529-7.249 13.529-13.529 0-.206-.005-.412-.013-.617.93-.672 1.731-1.511 2.367-2.45z" />
    </svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
    </svg>
  ),
};

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date(MAINTENANCE_OPTIONS.END_DATE) - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
                heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                secondes: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents: JSX.Element[] = [];
    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }
        timerComponents.push(
            <div key={interval} className="text-center">
                <div className="text-4xl font-bold text-white">{timeLeft[interval]}</div>
                <div className="text-sm text-neutral-400 capitalize">{interval}</div>
            </div>
        );
    });

    return timerComponents.length ? (
        <div className="mt-8">
            <p className="text-neutral-300 mb-4">Temps maximum restant avant le retour du service :</p>
            <div className="flex justify-center gap-4 md:gap-8 p-4 bg-neutral-900/50 rounded-lg">
                {timerComponents}
            </div>
            <p className="text-xs text-neutral-500 mt-3">Nous faisons de notre mieux pour terminer avant !</p>
        </div>
    ) : null;
};


const MaintenancePage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-neutral-300 p-4">
            <div className="text-center bg-neutral-800 rounded-lg shadow-2xl p-8 md:p-12 max-w-2xl mx-auto animate-fadeIn">
                <div className="flex justify-center mb-6">
                    <Logo size="lg"/>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2">{APP_CONFIG.BUSINESS_NAME} est en maintenance</h1>
                <p className="text-neutral-400 mt-4 text-lg">
                    Nous améliorons votre expérience. Notre site sera de retour très prochainement.
                </p>
                <p className="text-neutral-400 mt-2">
                    Merci pour votre patience !
                </p>
                
                {MAINTENANCE_OPTIONS.SHOW_TIMER && <CountdownTimer />}

                <div className="mt-10 border-t border-neutral-700 pt-6">
                    <p className="text-neutral-400 mb-4">En attendant, suivez-nous sur nos réseaux sociaux :</p>
                    <div className="flex justify-center space-x-4">
                        {Object.entries(APP_CONFIG.SOCIAL_LINKS)
                            .filter(([name]) => ['facebook', 'twitter', 'instagram'].includes(name))
                            .map(([name, url]) => (
                                <a key={name} href={url} className="text-neutral-400 hover:text-blue-500 transition-colors" target="_blank" rel="noopener noreferrer">
                                    {socialIcons[name]}
                                </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;