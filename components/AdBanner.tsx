import React from 'react';
import type { AdConfig } from '../types';

// A local, self-contained logo component for ads to prevent dependency issues.
const AdLogo: React.FC<{ logoConfig: AdConfig['logo'] }> = ({ logoConfig }) => {
    const { TYPE, IMAGE_URL, ICON, SHAPE, BACKGROUND_COLOR, TEXT_COLOR } = logoConfig;
    const shapeClass = SHAPE === 'circle' ? 'rounded-full' : 'rounded-lg';
    const sizeClass = 'w-16 h-16'; // Consistent size for ads

    if (TYPE === 'image' && IMAGE_URL) {
        return (
            <div className={`flex-shrink-0 overflow-hidden ${sizeClass} ${shapeClass} ${BACKGROUND_COLOR || 'bg-transparent'} flex items-center justify-center shadow-md`}>
                <img src={IMAGE_URL} alt="Ad logo" className="w-full h-full object-contain p-1" />
            </div>
        );
    }

    if (TYPE === 'icon' && ICON) {
        return (
            <div className={`flex items-center justify-center flex-shrink-0 ${sizeClass} ${shapeClass} ${BACKGROUND_COLOR || 'bg-neutral-700'} shadow-md`}>
                <span className={`material-icons-outlined text-4xl ${TEXT_COLOR || 'text-white'}`}>{ICON}</span>
            </div>
        );
    }
    return null;
};

const AdBanner: React.FC<{ ad: AdConfig, layout?: 'horizontal' | 'vertical' }> = ({ ad, layout = 'horizontal' }) => {
    const themeClasses = {
        'yellow-orange': {
            bg: 'bg-gradient-to-br from-yellow-500 via-orange-500 to-yellow-600',
            text: 'text-white',
            subtitleText: 'text-orange-200',
            buttonBg: 'bg-white',
            buttonText: 'text-orange-600',
            buttonHover: 'hover:bg-yellow-100',
        }
    };

    const currentTheme = themeClasses[ad.themeColor] || themeClasses['yellow-orange'];
    const adTag = <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm z-20 pointer-events-none">AD</div>;

    // PRODUCT AD (used for both horizontal and vertical, as it's more of a display style)
    if (ad.type === 'product' && ad.productImage) {
        return (
             <div 
                className="relative rounded-lg overflow-hidden flex flex-col justify-between p-6 shadow-md group text-white min-h-[250px] bg-cover bg-center transition-all duration-300 transform hover:scale-[1.02]"
                style={{ backgroundImage: `url(${ad.productImage})` }}
            >
                {adTag}
                <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                
                <div className="relative z-10">
                    <div className="absolute top-0 left-0">
                        <AdLogo logoConfig={ad.logo} />
                    </div>
                </div>

                <div className="relative z-10 mt-auto text-left">
                     <p className={`text-sm font-bold ${currentTheme.subtitleText}`}>{ad.subtitle}</p>
                     <h4 className="text-2xl font-bold text-white drop-shadow-lg">{ad.title}</h4>
                     <p className="text-neutral-200 text-sm mt-1 mb-4 drop-shadow-md">{ad.description}</p>
                     <a 
                        href={ad.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`inline-block font-bold py-2 px-5 rounded-lg shadow-md transition-transform transform group-hover:scale-105 ${currentTheme.buttonBg} ${currentTheme.buttonText} ${currentTheme.buttonHover}`}
                     >
                        {ad.cta}
                    </a>
                </div>
            </div>
        );
    }

    // BRAND AD (can have horizontal or vertical layouts)
    if (layout === 'vertical') {
         return (
            <div className={`relative ${currentTheme.bg} rounded-lg shadow-md p-6 text-center ${currentTheme.text} flex flex-col`}>
                {adTag}
                <div className="flex justify-center mb-4">
                    <AdLogo logoConfig={ad.logo} />
                </div>
                <h4 className="text-xl font-bold">{ad.title}</h4>
                <p className={`text-sm opacity-90 mt-1 ${currentTheme.subtitleText}`}>{ad.subtitle}</p>
                <p className="my-4 text-sm flex-grow">{ad.description}</p>
                <a 
                    href={ad.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-full inline-block font-bold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${currentTheme.buttonBg} ${currentTheme.buttonText} ${currentTheme.buttonHover}`}
                >
                    {ad.cta}
                </a>
            </div>
        );
    }
    
    // Brand Ad - Horizontal (default)
    return (
        <div className={`relative ${currentTheme.bg} rounded-lg overflow-hidden flex flex-col justify-between p-6 shadow-md group text-white min-h-[250px] transition-all duration-300 transform hover:scale-[1.02]`}>
            {adTag}
            <div className="flex items-center gap-4">
                <AdLogo logoConfig={ad.logo} />
                <div>
                    <h4 className="text-2xl font-bold">{ad.title}</h4>
                    <p className={`text-sm opacity-90 ${currentTheme.subtitleText}`}>{ad.subtitle}</p>
                </div>
            </div>
            <p className="my-4 text-sm flex-grow">{ad.description}</p>
            <a 
                href={ad.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`self-start font-bold py-2 px-5 rounded-lg shadow-md transition-transform transform group-hover:scale-105 ${currentTheme.buttonBg} ${currentTheme.buttonText} ${currentTheme.buttonHover}`}
            >
                {ad.cta}
            </a>
        </div>
    );
};

export default AdBanner;