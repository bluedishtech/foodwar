import React from 'react';
import { APP_CONFIG } from '../constants';
import Logo from './Logo';
import { useAppearance } from '../App';
import { FEATURE_FLAGS } from '../featureFlags';

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
  whatsapp: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="WhatsApp">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.167 1.687zm6.217-4.833l.341.202c1.452.867 3.091 1.32 4.773 1.32 5.454 0 9.917-4.463 9.917-9.917s-4.463-9.917-9.917-9.917-9.917 4.464-9.917 9.917c0 1.764.476 3.489 1.325 4.948l.205.323-1.03 3.759 3.824-1.026zm.507-3.945c-.244-.121-1.442-.712-1.666-.791-.225-.08-.387-.121-.55-.406-.163-.284-.623-.791-.763-1.026-.14-.234-.28-.268-.523-.268-.244 0-.523-.04-.763-.04-.243 0-.645.323-.828.609-.183.284-.689.837-.828 1.026-.14.183-.28.22-.524.08-.244-.121-1.03- .386-1.956-1.213-.716-.645-1.196-1.442-1.336-1.687-.14-.244-.028-.386.08-.507.092-.107.205-.284.308-.426.102-.142.144-.244.205-.406.061-.162.03-.306-.015-.426-.045-.121-.55-.656-.763-1.176-.205-.506-.426-.445-.578-.445-.14 0-.305-.015-.465-.015s-.426.08-.645.323c-.225.244-.875.837-1.079 1.326-.205.488-.396 1.002-.396 1.556.001 1.058.426 1.999 1.309 2.827 1.144 1.036 2.379 1.83 4.14 2.457 1.201.44 2.019.645 2.536.81.56.183 1.002.163 1.362.102.396-.061 1.212-.488 1.456-1.026.244-.524.244-.973.183-1.058-.061-.08-.225-.121-.465-.243z" />
    </svg>
  ),
  youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="YouTube">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  ),
  pinterest: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Pinterest">
      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.117.223.084.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.343 2.318.535 3.554.535 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
    </svg>
  ),
};

const Footer: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { themeColor } = useAppearance();
    const handleLinkClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        setPage(page);
    };

    return (
        <footer className="bg-neutral-800 text-neutral-400">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURE_FLAGS.footer.showBusinessInfoAndLogo && (
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Logo size="sm" />
                                <h4 className="font-bold text-white text-xl">{APP_CONFIG.BUSINESS_NAME}</h4>
                            </div>
                            <p className="text-sm mb-6">La meilleure cuisine, livrée chez vous. Fraîcheur et saveur garanties à chaque commande.</p>
                            {FEATURE_FLAGS.footer.showSocialLinks && (
                                <>
                                    <h4 className="font-bold text-white text-lg mb-4">Restez connectés</h4>
                                    <div className="flex space-x-4">
                                        {Object.entries(APP_CONFIG.SOCIAL_LINKS).map(([name, url]) => (
                                            <a key={name} href={url} className={`text-neutral-400 hover:text-${themeColor}-500 transition-colors`} target="_blank" rel="noopener noreferrer">
                                                {socialIcons[name]}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {FEATURE_FLAGS.footer.showMoreLinksSection && (
                        <div>
                            <h4 className="font-bold text-white text-lg mb-4">En savoir plus</h4>
                            <ul className="space-y-2">
                                <li><a href="#" onClick={(e) => handleLinkClick(e, 'branches')} className={`hover:text-${themeColor}-500`}>Nos branches</a></li>
                                <li><a href="#" onClick={(e) => handleLinkClick(e, 'pro')} className={`hover:text-${themeColor}-500`}>Devenir franchisé</a></li>
                                <li><a href="#" onClick={(e) => handleLinkClick(e, 'offers')} className={`hover:text-${themeColor}-500`}>Offres programmées</a></li>
                                <li><a href="#" onClick={(e) => handleLinkClick(e, 'kitchen-tour')} className={`hover:text-${themeColor}-500`}>Visitez la cuisine</a></li>
                                <li><a href="#" onClick={(e) => handleLinkClick(e, 'team')} className={`hover:text-${themeColor}-500`}>Notre équipe</a></li>
                                <li><a href="#" onClick={(e) => handleLinkClick(e, 'more-links')} className={`hover:text-${themeColor}-500`}>Plus de liens</a></li>
                            </ul>
                        </div>
                    )}
                    {FEATURE_FLAGS.footer.showPhysicalStoreSection && (
                        <div>
                            <h4 className="font-bold text-white text-lg mb-4">Boutique physique</h4>
                            <p>Adresse: {APP_CONFIG.ADDRESS}</p>
                            <p className="mt-2">Contact: <a href={`tel:${APP_CONFIG.CONTACT_PHONE}`} className={`hover:text-${themeColor}-500`}>{APP_CONFIG.CONTACT_PHONE}</a></p>
                            <p className="mt-2">E-mail: <a href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`} className={`hover:text-${themeColor}-500`}>{APP_CONFIG.CONTACT_EMAIL}</a></p>
                        </div>
                    )}
                     {FEATURE_FLAGS.footer.showLocationMap && (
                        <div>
                            <h4 className="font-bold text-white text-lg mb-4">Emplacement</h4>
                            <div className="bg-neutral-900 h-48 rounded-lg overflow-hidden">
                            <iframe 
                                src={APP_CONFIG.GOOGLE_MAPS_IFRAME_SRC}
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }}
                                allowFullScreen={false} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Emplacement du restaurant principal"
                            ></iframe>
                            </div>
                        </div>
                     )}
                </div>
            </div>
            {FEATURE_FLAGS.footer.showPolicyLinksBar && (
                <div className="bg-neutral-900 py-4">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-center">
                        <div className="mb-2 md:mb-0">
                            <a href="#" onClick={(e) => handleLinkClick(e, 'refund-policy')} className={`hover:text-${themeColor}-500 pr-4 border-r border-neutral-600`}>Politique de remboursement</a>
                            <a href="#" onClick={(e) => handleLinkClick(e, 'privacy-policy')} className={`hover:text-${themeColor}-500 pl-4`}>Politique de confidentialité</a>
                        </div>
                        <p>© {new Date().getFullYear()} {APP_CONFIG.BUSINESS_NAME} Propulsé par Pseudo Line</p>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;