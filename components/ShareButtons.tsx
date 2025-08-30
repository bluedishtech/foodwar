import React, { useState } from 'react';

const ShareButtons: React.FC<{ url: string; title: string; }> = ({ url, title }) => {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const socialLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        x: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
        instagram: 'https://www.instagram.com/', // Instagram does not support direct URL sharing from the web.
    };

    const socialIcons: { [key: string]: { icon: JSX.Element, bg: string } } = {
        facebook: {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Facebook">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                </svg>
            ),
            bg: 'bg-[#1877F2]'
        },
        x: {
            icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-label="X (formerly Twitter)">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
            ),
            bg: 'bg-[#000000]'
        },
        whatsapp: {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-label="WhatsApp">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.167 1.687zm6.217-4.833l.341.202c1.452.867 3.091 1.32 4.773 1.32 5.454 0 9.917-4.463 9.917-9.917s-4.463-9.917-9.917-9.917-9.917 4.464-9.917 9.917c0 1.764.476 3.489 1.325 4.948l.205.323-1.03 3.759 3.824-1.026zm.507-3.945c-.244-.121-1.442-.712-1.666-.791-.225-.08-.387-.121-.55-.406-.163-.284-.623-.791-.763-1.026-.14-.234-.28-.268-.523-.268-.244 0-.523-.04-.763-.04-.243 0-.645.323-.828.609-.183.284-.689.837-.828 1.026-.14.183-.28.22-.524.08-.244-.121-1.03- .386-1.956-1.213-.716-.645-1.196-1.442-1.336-1.687-.14-.244-.028-.386.08-.507.092-.107.205-.284.308-.426.102-.142.144-.244.205-.406.061-.162.03-.306-.015-.426-.045-.121-.55-.656-.763-1.176-.205-.506-.426-.445-.578-.445-.14 0-.305-.015-.465-.015s-.426.08-.645.323c-.225.244-.875.837-1.079 1.326-.205.488-.396 1.002-.396 1.556.001 1.058.426 1.999 1.309 2.827 1.144 1.036 2.379 1.83 4.14 2.457 1.201.44 2.019.645 2.536.81.56.183 1.002.163 1.362.102.396-.061 1.212-.488 1.456-1.026.244-.524.244-.973.183-1.058-.061-.08-.225-.121-.465-.243z" />
                </svg>
            ),
            bg: 'bg-[#25D366]'
        },
        instagram: {
            icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
                </svg>
            ),
            bg: 'bg-gradient-to-tr from-[#FFC107] via-[#F44336] to-[#9C27B0]'
        },
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: title,
                    url: url,
                });
            } catch (error) {
                console.error('Share failed:', error);
            }
        }
    };

    return (
        <div className="flex items-center flex-wrap gap-3">
            <span className="font-semibold text-neutral-300 text-sm">Partager :</span>
            {Object.entries(socialLinks).map(([name, socialUrl]) => (
                <a 
                    key={name}
                    href={socialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${socialIcons[name].bg} text-white p-2 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center`} 
                    aria-label={`Partager sur ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                >
                    {socialIcons[name].icon}
                </a>
            ))}
            {navigator.share && (
                <button 
                    onClick={handleNativeShare}
                    className="bg-neutral-600 text-white p-2 rounded-full hover:bg-neutral-500 transition-colors flex items-center justify-center"
                    aria-label="Partager via le menu système"
                >
                    <span className="material-icons-outlined text-base">
                        share
                    </span>
                </button>
            )}
            <button 
                onClick={handleCopy}
                className="bg-neutral-600 text-white p-2 rounded-full hover:bg-neutral-500 transition-colors flex items-center justify-center"
                aria-label="Copier le lien"
            >
                <span className="material-icons-outlined text-base">
                    {copied ? 'check' : 'content_copy'}
                </span>
            </button>
            {copied && <span className="text-sm text-green-400 animate-fadeIn">Copié !</span>}
        </div>
    );
};

export default ShareButtons;