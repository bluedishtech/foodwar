import React, { useState } from 'react';
import { BENEFITS, TESTIMONIALS, NEWS_ARTICLES, APP_CONFIG } from '../constants';
import { FEATURE_FLAGS } from '../featureFlags';
import AdBanner from './AdBanner';
import { useAppearance } from '../App';

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { themeColor } = useAppearance();

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1));
    };

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1));
    };

    const current = TESTIMONIALS[currentIndex];

    return (
        <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-lg">Témoignages</h3>
                <div className="flex space-x-2">
                    <button onClick={prevTestimonial} className={`bg-neutral-700 p-1 rounded-full hover:bg-${themeColor}-600 hover:text-white flex items-center justify-center`}><span className="material-icons-outlined text-lg">chevron_left</span></button>
                    <button onClick={nextTestimonial} className={`bg-neutral-700 p-1 rounded-full hover:bg-${themeColor}-600 hover:text-white flex items-center justify-center`}><span className="material-icons-outlined text-lg">chevron_right</span></button>
                </div>
            </div>
            <div className="text-center">
                <img src={current.image} alt={current.name} className={`w-20 h-20 rounded-full mx-auto mb-4 border-2 border-${themeColor}-500`} />
                <h4 className="font-semibold text-white">{current.name}</h4>
                <p className="text-neutral-400 text-sm mt-2 italic">"{current.quote}"</p>
            </div>
        </div>
    );
};


const RightSidebar: React.FC<{ onSelectNews: (id: number) => void; }> = ({ onSelectNews }) => {
    const { themeColor } = useAppearance();
    const latestNews = NEWS_ARTICLES[0];
    
    return (
        <div className="space-y-8">
            {FEATURE_FLAGS.homepage.showCallToAction && (
                <div className="flex items-center justify-center bg-neutral-800 p-4 rounded-lg shadow-md space-x-3">
                    <span className={`material-icons-outlined text-2xl text-${themeColor}-500`}>call</span>
                    <div>
                        <p className="text-neutral-400">Appelez-nous</p>
                        <p className="text-white font-bold text-lg">{APP_CONFIG.CONTACT_PHONE}</p>
                    </div>
                </div>
            )}

            {FEATURE_FLAGS.homepage.showBenefits && (
                <div className="bg-neutral-800 p-4 rounded-lg shadow-md space-y-4">
                    {BENEFITS.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <span className={`material-icons-outlined text-3xl text-${themeColor}-500`}>{benefit.icon}</span>
                            <div>
                                <p className="font-semibold text-white">{benefit.title}</p>
                                <p className="text-neutral-400 text-sm">{benefit.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {FEATURE_FLAGS.homepage.showTestimonials && <Testimonials />}

            {FEATURE_FLAGS.homepage.showLatestNews && latestNews && (
                <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-white text-lg mb-4">Dernières nouvelles</h3>
                    <div 
                        className="flex items-center space-x-4 cursor-pointer group"
                        onClick={() => onSelectNews(latestNews.id)}
                    >
                        <img src={latestNews.image} alt={latestNews.title} className="w-20 h-16 object-cover rounded-md" />
                        <div>
                            <p className={`text-white text-sm group-hover:text-${themeColor}-500`}>{latestNews.title}</p>
                            <p className="text-neutral-500 text-xs">{latestNews.date}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {FEATURE_FLAGS.homepage.showAdBanners && APP_CONFIG.ADS_CONFIG && (
                <div className="space-y-4">
                    {APP_CONFIG.ADS_CONFIG.map(ad => (
                        <AdBanner key={ad.id} ad={ad} layout="vertical" />
                    ))}
                </div>
            )}

            {FEATURE_FLAGS.homepage.showBogoBanner && (
                <div className="relative bg-cover bg-center rounded-lg text-white p-6 shadow-md" style={{ backgroundImage: "url('https://picsum.photos/id/102/300/400')" }}>
                     <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
                    <div className="relative z-10 text-center">
                        <p className="text-4xl font-bold">1 acheté</p>
                        <p className="text-4xl font-bold">1 offert</p>
                        <p className={`text-${themeColor}-500 text-5xl font-extrabold mt-2`}>Gratuit</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightSidebar;