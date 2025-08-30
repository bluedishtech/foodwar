import React, { useState, useEffect, useRef } from 'react';
import { APP_CONFIG } from '../constants';
import { useToast, useAppearance } from '../App';
import { FEATURE_FLAGS } from '../featureFlags';

const ContactInfoItem: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
    const { themeColor } = useAppearance();
    return (
    <div className="flex items-start gap-4">
        <div className="bg-neutral-700 p-3 rounded-full">
            <span className={`material-icons-outlined text-${themeColor}-500 text-2xl`}>{icon}</span>
        </div>
        <div>
            <h4 className="font-bold text-white text-lg">{title}</h4>
            <div className="text-neutral-400">{children}</div>
        </div>
    </div>
)};

const countryCodes = [
    { code: '+221', name: 'SN' },
    { code: '+223', name: 'ML' },
    { code: '+225', name: 'CI' },
    { code: '+228', name: 'TG' },
    { code: '+229', name: 'BJ' },
    { code: '+33', name: 'FR' },
];

const ContactPage: React.FC = () => {
    const { themeColor } = useAppearance();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+221',
        phone: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showGlobe, setShowGlobe] = useState(true);

    useEffect(() => {
        if (!FEATURE_FLAGS.contactPage.showGlobeOrMapVisual) {
            setShowGlobe(false);
            return;
        }

        let globe: any;
        const canvas = canvasRef.current;
        
        if (canvas && typeof (window as any).createGlobe === 'function') {
            try {
                const { LATITUDE, LONGITUDE } = APP_CONFIG.GLOBE_LOCATION;
                globe = (window as any).createGlobe(canvas, {
                    devicePixelRatio: 2,
                    width: canvas.offsetWidth * 2,
                    height: canvas.offsetHeight * 2,
                    phi: 0,
                    theta: 0.3,
                    dark: 1.1,
                    diffuse: 1.2,
                    mapSamples: 20000,
                    mapBrightness: 6,
                    baseColor: [0.3, 0.3, 0.3],
                    markerColor: [0.145, 0.388, 0.922],
                    glowColor: [0.8, 0.8, 0.8],
                    markers: [ { location: [LATITUDE, LONGITUDE], size: 0.05 } ],
                    onRender: (state: any) => { if (!state.isDragging) state.theta += 0.005; }
                });
            } catch (error) {
                console.error("Cobe globe initialization failed:", error);
                setShowGlobe(false);
            }
        } else {
            console.warn("Cobe.js library not found. Falling back to Google Maps.");
            setShowGlobe(false);
        }

        return () => { if (globe) globe.destroy(); };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };
    
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Le nom complet est requis.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) newErrors.email = 'L\'adresse e-mail est requise.';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'L\'adresse e-mail n\'est pas valide.';
        const phoneRegex = /^[0-9\s-]{7,15}$/;
        if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est requis.';
        else if (!phoneRegex.test(formData.phone.trim())) newErrors.phone = 'Le format du numéro de téléphone n\'est pas valide.';
        if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis.';
        if (!formData.message.trim()) newErrors.message = 'Le message est requis.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const endpoint = APP_CONFIG.FORMSPREE_ENDPOINTS.contactForm;

        if (endpoint.includes('YOUR_CONTACT_FORM_ID')) {
            console.error("Formspree contact endpoint not configured.");
            showToast("La soumission du formulaire n'est pas configurée.", 'error');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    phone: `${formData.countryCode} ${formData.phone}`,
                }),
            });

            if (response.ok) {
                showToast('Message envoyé avec succès !', 'success');
                setFormData({ name: '', email: '', countryCode: '+221', phone: '', subject: '', message: '' });
            } else {
                throw new Error("La soumission a échoué.");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission Formspree:", error);
            showToast("Erreur lors de l'envoi du message. Veuillez réessayer.", 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div 
                className="relative bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center text-center min-h-[300px] p-8 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: "url('https://picsum.photos/id/1015/1200/400')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold text-white leading-tight">Contactez-nous</h1>
                    <p className="text-xl text-neutral-300 mt-2">Une question ou une suggestion ? Nous sommes à votre écoute.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 bg-neutral-800 p-8 rounded-lg space-y-8 flex flex-col shadow-lg">
                   {FEATURE_FLAGS.contactPage.showContactInfoSection && (
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Nos Coordonnées</h3>
                            <div className="space-y-6">
                                <ContactInfoItem icon="location_on" title="Adresse"><p>{APP_CONFIG.ADDRESS}</p></ContactInfoItem>
                                <ContactInfoItem icon="call" title="Téléphone"><a href={`tel:${APP_CONFIG.CONTACT_PHONE}`} className={`hover:text-${themeColor}-500`}>{APP_CONFIG.CONTACT_PHONE}</a></ContactInfoItem>
                                <ContactInfoItem icon="email" title="E-mail"><a href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`} className={`hover:text-${themeColor}-500`}>{APP_CONFIG.CONTACT_EMAIL}</a></ContactInfoItem>
                            </div>
                        </div>
                   )}
                   {FEATURE_FLAGS.contactPage.showGlobeOrMapVisual && (
                        <div className="flex-grow min-h-[300px] bg-neutral-900 rounded-md">
                                {showGlobe ? (
                                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', aspectRatio: '1 / 1', cursor: 'grab', borderRadius: '0.375rem' }}></canvas>
                                ) : (
                                    <iframe src={APP_CONFIG.GOOGLE_MAPS_IFRAME_SRC} width="100%" height="100%" style={{ border: 0, borderRadius: '0.375rem' }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Emplacement du restaurant"></iframe>
                                )}
                        </div>
                   )}
                </div>

                <div className="lg:col-span-3 bg-neutral-800 p-8 rounded-lg shadow-lg">
                    {FEATURE_FLAGS.contactPage.showContactForm && (
                        <>
                            <h3 className="text-2xl font-bold text-white mb-2">Envoyez-nous un message</h3>
                            <p className="text-neutral-400 mb-6">Remplissez le formulaire ci-dessous et nous vous contacterons dans les plus brefs délais.</p>
                            
                            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Nom complet</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Adresse e-mail</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">Numéro de téléphone</label>
                                        <div className="flex">
                                            <select id="countryCode" name="countryCode" value={formData.countryCode} onChange={handleInputChange} className={`bg-neutral-900 border border-r-0 border-neutral-700 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`}>
                                                {countryCodes.map(c => <option key={c.code} value={c.code}>{`${c.name} (${c.code})`}</option>)}
                                            </select>
                                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className={`w-full bg-neutral-900 border border-neutral-700 rounded-r-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} placeholder="77 123 45 67" />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-1">Sujet</label>
                                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Votre message</label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={5} required className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`}></textarea>
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <div>
                                    <button type="submit" disabled={isSubmitting} className={`w-full bg-${themeColor}-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-${themeColor}-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}>
                                        {isSubmitting ? (<span>Envoi en cours...</span>) : (<><span className="material-icons-outlined">send</span><span>Envoyer le Message</span></>)}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;