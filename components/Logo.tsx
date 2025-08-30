import React from 'react';
import { APP_CONFIG } from '../constants';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'md' }) => {
    const { TYPE, IMAGE_URL, ICON, SHAPE, BACKGROUND_COLOR, TEXT_COLOR } = APP_CONFIG.LOGO;
    
    const sizeClasses = {
        sm: { container: 'w-10 h-10', icon: 'text-2xl' },
        md: { container: 'w-16 h-16', icon: 'text-4xl' },
        lg: { container: 'w-24 h-24', icon: 'text-6xl' },
        xl: { container: 'w-32 h-32', icon: 'text-7xl' },
    };

    const shapeClass = SHAPE === 'circle' ? 'rounded-full' : 'rounded-lg';

    if (TYPE === 'image') {
        return (
            <div className={`flex-shrink-0 overflow-hidden ${sizeClasses[size].container} ${shapeClass}`}>
                <img 
                    src={IMAGE_URL} 
                    alt={`${APP_CONFIG.BUSINESS_NAME} logo`}
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    // Fallback to icon
    return (
        <div className={`flex items-center justify-center flex-shrink-0 ${sizeClasses[size].container} ${shapeClass} ${BACKGROUND_COLOR}`}>
            <span className={`material-icons-outlined ${sizeClasses[size].icon} ${TEXT_COLOR}`}>
                {ICON}
            </span>
        </div>
    );
};

export default Logo;