import React from 'react';
import type { Product, Category, Testimonial, NewsArticle, Benefit, BlogPost, AdConfig } from './types';

export const THEME_OPTIONS = [
  { name: 'Bleu', color: 'blue', chartRgb: '37, 99, 235', hex: '#2563eb' },
  { name: 'Émeraude', color: 'emerald', chartRgb: '16, 185, 129', hex: '#10b981' },
  { name: 'Rose', color: 'rose', chartRgb: '244, 63, 94', hex: '#f43f5e' },
  { name: 'Violet', color: 'violet', chartRgb: '139, 92, 246', hex: '#8b5cf6' },
];

export const APP_CONFIG = {
  BUSINESS_NAME: "FoodWar",
  CONTACT_EMAIL: "foodwarmail@gmail.com",
  CONTACT_PHONE: "+221 77 123 45 67",
  ADDRESS: "Keur Massar, Dakar, Sénégal",
  GOOGLE_MAPS_IFRAME_SRC: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.8646290308066!2d-17.33156682604552!3d14.776653985730794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10b7f20cdacd1%3A0x890330897df97c54!2sTerminus%2054!5e0!3m2!1sen!2ssn!4v1755546124234!5m2!1sen!2ssn",
  GOOGLE_MAPS_ITINERARY_LINK: "https://maps.google.com/maps/dir//Terminus+54+QMPP%2BR28+Keur+Massar/@14.776654,-17.3289919,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0xec10b7f20cdacd1:0x890330897df97c54",
  GLOBE_LOCATION: {
    LATITUDE: 14.776654,
    LONGITUDE: -17.3289919,
  },
  DEFAULT_THEME: 'blue',
  LOGO: {
    // Set TYPE to 'image' to use a custom logo, or 'icon' to use a Material Icon.
    TYPE: 'image', // 'icon' | 'image'
    
    // --- Image Settings (used if TYPE is 'image') ---
    // Place your logo in the public folder and update the path here.
    IMAGE_URL: '/logo.png', 

    // --- Icon Settings (used if TYPE is 'icon') ---
    ICON: 'ramen_dining', // Material icon name
    SHAPE: 'circle', // 'circle' or 'square'
    BACKGROUND_COLOR: 'bg-blue-600', // TailwindCSS class for background
    TEXT_COLOR: 'text-white', // TailwindCSS class for icon color
  },
  SOCIAL_LINKS: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    whatsapp: '#',
    youtube: '#',
    pinterest: '#'
  },
  DELIVERY_CONFIG: {
    DELIVERY_FEE: 1000, // in CFA
    FREE_DELIVERY_THRESHOLD: 15000, // in CFA
    WHATSAPP_ORDER_NUMBER: '221771234567', // International format without '+'
  },
  // To enable real form submissions, create forms on formspree.io
  // and paste their endpoint URLs here. Each form should have its own endpoint.
  FORMSPREE_ENDPOINTS: {
    orderSubmission: 'https://formspree.io/f/YOUR_ORDER_FORM_ID',
    contactForm: 'https://formspree.io/f/YOUR_CONTACT_FORM_ID',
    partnershipInquiry: 'https://formspree.io/f/YOUR_PARTNERSHIP_FORM_ID',
  },
  ADS_CONFIG: [
    {
      id: 'yonko-brand',
      type: 'brand',
      title: 'Yonko',
      subtitle: 'Votre Boutique en Ligne',
      description: 'Découvrez des produits uniques et de qualité. Shopping simple, rapide et sécurisé.',
      cta: 'Visiter la boutique',
      link: 'https://yonkobusiness.github.io',
      themeColor: 'yellow-orange',
      logo: {
        TYPE: 'image',
        IMAGE_URL: 'https://res.cloudinary.com/dqfqbzmfd/image/upload/v1755603793/yonkoLogoRoundCorner_jdx0x3.png',
        SHAPE: 'circle',
        BACKGROUND_COLOR: 'bg-black',
      },
    },
    {
      id: 'yonko-watch',
      type: 'product',
      title: 'Montre "Chrono-Élégance"',
      subtitle: 'Par Yonko',
      description: 'Alliez style et précision. Un accessoire indispensable pour affirmer votre look.',
      cta: 'Découvrir',
      link: 'https://yonkobusiness.github.io',
      themeColor: 'yellow-orange',
      logo: {
        TYPE: 'image',
        IMAGE_URL: 'https://res.cloudinary.com/dqfqbzmfd/image/upload/v1755603793/yonkoLogoRoundCorner_jdx0x3.png',
        SHAPE: 'circle',
        BACKGROUND_COLOR: 'bg-black',
      },
      productImage: 'https://picsum.photos/seed/watch/400/300'
    }
  ] as AdConfig[]
};

export const NavLinks = [
  { id: 'home', name: 'Accueil', href: '#', icon: 'home' },
  { id: 'boutique', name: 'Boutique', href: '#', icon: 'storefront' },
  { id: 'boissons', name: 'Boissons', href: '#', icon: 'local_bar' },
  { id: 'news', name: 'Actualités', href: '#', icon: 'newspaper' },
  { id: 'blog', name: 'Blog', href: '#', icon: 'article' },
  { id: 'contact', name: 'Contactez-nous', href: '#', icon: 'contact_support' },
];

export const CATEGORIES: Category[] = [
    { id: 'pizza', name: 'Pizza', image: 'https://picsum.photos/id/1080/100/100', icon: 'local_pizza' },
    { id: 'pasta', name: 'Pâtes', image: 'https://picsum.photos/id/1078/100/100', icon: 'ramen_dining' },
    { id: 'burgers', name: 'Burgers', image: 'https://picsum.photos/id/163/100/100', icon: 'lunch_dining' },
    { id: 'salads', name: 'Salades', image: 'https://picsum.photos/id/103/100/100', icon: 'grass' },
    { id: 'drinks', name: 'Boissons', image: 'https://picsum.photos/id/1060/100/100', icon: 'local_drink' },
];

export const PRODUCTS: Product[] = [
    { id: 1, name: "Pizza Margherita", price: 6000, originalPrice: 7500, image: ["https://picsum.photos/id/20/600/500", "https://picsum.photos/id/21/600/500", "https://picsum.photos/id/22/600/500"], category: "pizza", tag: "Promo", description: "Une pizza classique avec sauce tomate, mozzarella et basilic frais." },
    { id: 2, name: "Pizza Pepperoni", price: 7000, image: "https://picsum.photos/id/292/400/300", category: "pizza", description: "Garnie de pepperoni épicé et de fromage fondant." },
    { id: 3, name: "Spaghetti Bolognaise", price: 6500, image: "https://picsum.photos/id/431/400/300", category: "pasta", description: "Pâtes spaghetti servies avec une riche sauce bolognaise maison." },
    { id: 4, name: "Penne Arrabiata", price: 6000, image: "https://picsum.photos/id/1078/400/300", category: "pasta", tag: "Piquant", description: "Pâtes penne dans une sauce tomate épicée à l'ail et au piment." },
    { id: 5, name: "Classic Burger", price: 5500, originalPrice: 6500, image: ["https://picsum.photos/id/163/600/500", "https://picsum.photos/id/312/600/500"], category: "burgers", description: "Un burger juteux avec laitue, tomate, oignons et notre sauce spéciale." },
    { id: 6, name: "Cheeseburger", price: 6000, image: "https://picsum.photos/id/312/400/300", category: "burgers", description: "Notre burger classique avec une tranche de fromage cheddar." },
    { id: 7, name: "Salade César", price: 5000, image: "https://picsum.photos/id/103/400/300", category: "salads", description: "Laitue romaine croquante, croûtons, parmesan et vinaigrette César." },
    { id: 8, name: "Coca-Cola", price: 1000, image: "https://picsum.photos/id/1060/400/300", category: "drinks", description: "Boisson gazeuse rafraîchissante." },
    { id: 9, name: "Jus d'orange", price: 1500, image: "https://picsum.photos/id/30/400/300", category: "drinks", description: "Jus d'orange fraîchement pressé." },
    { id: 10, name: "Pizza 4 Saisons", price: 8000, image: "https://picsum.photos/id/180/400/300", category: "pizza", description: "Artichauts, jambon, champignons et olives." },
    { id: 11, name: "Eau Minérale", price: 500, image: "https://picsum.photos/id/326/400/300", category: "drinks", description: "Eau minérale naturelle." },
    { id: 12, name: "Burger Végétarien", price: 6500, image: "https://picsum.photos/id/40/400/300", category: "burgers", tag: "Végé", description: "Un délicieux burger à base de plantes." },
];

export const PLAT_DU_JOUR = {
    lunch: [
        PRODUCTS.find(p => p.id === 7), // Salade César
    ].filter((p): p is Product => Boolean(p)),
    dinner: [
        PRODUCTS.find(p => p.id === 2), // Pizza Pepperoni
        PRODUCTS.find(p => p.id === 4),  // Penne Arrabiata
    ].filter((p): p is Product => Boolean(p)),
};

export const BENEFITS: Benefit[] = [
    { icon: 'local_shipping', title: 'Livraison gratuite', subtitle: `Dès ${APP_CONFIG.DELIVERY_CONFIG.FREE_DELIVERY_THRESHOLD.toLocaleString()} CFA d'achat` },
    { icon: 'credit_card', title: 'Paiement sécurisé', subtitle: 'Paiement 100% sécurisé' },
    { icon: 'support_agent', title: 'Support 24/7', subtitle: 'Contactez-nous à tout moment' },
];

export const TESTIMONIALS: Testimonial[] = [
    { name: 'Aïssatou Diallo', quote: 'La meilleure pizza que j\'ai mangée à Dakar ! La livraison a été super rapide.', image: 'https://picsum.photos/id/237/100/100' },
    { name: 'Moussa Faye', quote: 'Le service client est excellent et les plats sont toujours délicieux. Je recommande !', image: 'https://picsum.photos/id/238/100/100' },
    { name: 'Fatou Ndiaye', quote: 'J\'adore la variété des plats. Il y en a pour tous les goûts. FoodWar est mon restaurant préféré.', image: 'https://picsum.photos/id/239/100/100' },
];

export const NEWS_ARTICLES: NewsArticle[] = [
    {
        id: 1,
        title: 'Nouvelle recette de burger végétarien disponible !',
        date: '15 Octobre 2024',
        image: 'https://picsum.photos/id/40/400/300',
        excerpt: 'Nous sommes ravis de présenter notre tout nouveau burger végétarien, une option saine et délicieuse pour tous.',
        content: `<h2>Un délice pour les végétariens et les curieux</h2><p>Chez FoodWar, nous cherchons constamment à innover et à satisfaire tous les palais. C'est pourquoi nous sommes fiers de lancer notre nouveau burger végétarien ! Préparé avec un steak à base de plantes savoureux, des légumes frais et une sauce secrète, il promet une explosion de saveurs. Venez le découvrir dès aujourd'hui !</p>`
    },
    {
        id: 2,
        title: 'FoodWar s\'associe aux livreurs locaux',
        date: '10 Octobre 2024',
        image: 'https://picsum.photos/id/1074/400/300',
        excerpt: 'Pour des livraisons encore plus rapides et un soutien à l\'économie locale, nous collaborons désormais avec des livreurs indépendants de Dakar.',
        content: `<h2>Plus vite, plus proche de vous</h2><p>Dans notre démarche de soutien à la communauté locale, nous avons initié un partenariat avec un réseau de livreurs indépendants. Ce partenariat nous permet non seulement de réduire nos délais de livraison, mais aussi de contribuer activement à l'économie locale. Vos plats préférés, livrés plus rapidement par des visages familiers de votre quartier.</p>`
    },
    {
        id: 3,
        title: 'Ouverture prochaine de notre agence à la Médina',
        date: '01 Octobre 2024',
        image: 'https://picsum.photos/id/10/400/300',
        excerpt: 'La famille FoodWar s\'agrandit ! Préparez-vous à nous accueillir dans le quartier historique de la Médina très prochainement.',
        content: `<h2>FoodWar au cœur de Dakar</h2><p>Nous sommes extrêmement heureux de vous annoncer l'ouverture imminente de notre nouvelle succursale au cœur de la Médina. Ce nouvel emplacement nous permettra d'être encore plus proches de vous et de partager notre passion pour la bonne cuisine dans ce quartier emblématique. Restez à l'écoute pour la date d'inauguration !</p>`
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: 'L\'art de la pizza parfaite : nos secrets',
        excerpt: 'Découvrez les secrets de nos chefs pour créer une pizza inoubliable, de la pâte à la garniture.',
        author: 'Chef Alioune',
        date: '12 Octobre 2024',
        image: 'https://picsum.photos/id/292/400/300',
        content: `
            <h2>Introduction : La Quête de la Pizza Parfaite</h2>
            <p>Chez FoodWar, la pizza est plus qu'un simple plat, c'est une passion. Chaque jour, nos chefs s'efforcent de perfectionner leur art pour vous offrir une expérience gustative inoubliable. Mais quel est le secret d'une pizza réussie ? Suivez-nous dans les coulisses de notre cuisine.</p>
            
            <h3>1. La Pâte : Le Cœur de la Pizza</h3>
            <p>Tout commence par la pâte. Nous utilisons une farine de type "00" importée d'Italie, reconnue pour sa finesse et son élasticité. Notre processus de fermentation lente, qui dure au minimum 48 heures, permet de développer des arômes complexes et d'assurer une digestibilité optimale. C'est ce qui donne à notre croûte son croustillant à l'extérieur et son moelleux à l'intérieur.</p>
            
            <h3>2. La Sauce Tomate : La Simplicité a du Bon</h3>
            <p>Nous croyons en la pureté des saveurs. Notre sauce est préparée à partir de tomates San Marzano, réputées pour leur douceur et leur faible acidité. Simplement assaisonnée avec du basilic frais, une pincée de sel et un filet d'huile d'olive extra vierge, elle sublime les autres ingrédients sans les masquer.</p>
            
            <h3>3. Les Ingrédients : Fraîcheur et Qualité</h3>
            <p>La clé d'une garniture réussie réside dans la qualité des produits. Voici quelques-uns de nos choix :</p>
            <ul>
                <li><strong>La Mozzarella :</strong> Nous utilisons de la mozzarella fior di latte, qui fond parfaitement sans libérer trop d'eau.</li>
                <li><strong>Le Basilic :</strong> Toujours frais, ajouté en fin de cuisson pour préserver son parfum.</li>
                <li><strong>Les Légumes :</strong> Grilles chaque matin pour concentrer leurs saveurs.</li>
            </ul>
            
            <p>Venez déguster le fruit de notre passion. Nous sommes convaincus que vous sentirez la différence à chaque bouchée !</p>
        `
    },
    {
        id: 2,
        title: 'Les bienfaits d\'une alimentation équilibrée',
        excerpt: 'Manger sainement n\'a jamais été aussi simple. Nos astuces pour une alimentation équilibrée au quotidien.',
        author: 'Nutritionniste Sophie',
        date: '05 Octobre 2024',
        image: 'https://picsum.photos/id/103/400/300',
        content: `
            <h2>Pourquoi Manger Équilibré ?</h2>
            <p>Une alimentation équilibrée est essentielle pour maintenir une bonne santé physique et mentale. Elle fournit à votre corps les nutriments, vitamines et minéraux dont il a besoin pour fonctionner correctement. Adopter de bonnes habitudes alimentaires peut sembler compliqué, mais quelques astuces simples peuvent faire une grande différence.</p>
            
            <h3>Conseil n°1 : Variez votre assiette</h3>
            <p>Ne mangez pas toujours la même chose ! Essayez d'intégrer une grande variété de fruits, de légumes, de protéines (viandes, poissons, légumineuses) et de céréales complètes dans vos repas. Chaque aliment apporte des nutriments différents.</p>

            <h3>Conseil n°2 : L'hydratation est la clé</h3>
            <p>Boire suffisamment d'eau tout au long de la journée est crucial. L'eau aide à la digestion, au transport des nutriments et à la régulation de la température corporelle. Essayez de boire au moins 1,5 litre d'eau par jour.</p>

            <h3>Conseil n°3 : Des options saines chez FoodWar</h3>
            <p>Manger à l'extérieur ne signifie pas faire de compromis sur votre santé. Chez FoodWar, nous proposons des options équilibrées :</p>
            <ul>
                <li><strong>Nos salades fraîches :</strong> Composées avec des ingrédients de saison, elles sont un repas complet et nutritif.</li>
                <li><strong>Les options végétariennes :</strong> Nos burgers et pizzas végétariens sont riches en saveurs et en bienfaits.</li>
                <li><strong>Les jus de fruits frais :</strong> Pressés à la minute pour un maximum de vitamines.</li>
            </ul>
            <p>Adopter une alimentation équilibrée est un investissement pour votre bien-être. Commencez dès aujourd'hui !</p>
        `
    },
    {
        id: 3,
        title: 'Notre engagement pour des ingrédients locaux',
        excerpt: 'Nous sommes fiers de soutenir les producteurs locaux. Apprenez-en plus sur nos partenariats.',
        author: 'L\'équipe FoodWar',
        date: '28 Septembre 2024',
        image: 'https://picsum.photos/id/125/400/300',
        content: `
            <h2>Du local dans votre assiette</h2>
            <p>Chez FoodWar, nous sommes convaincus que les meilleurs plats commencent avec les meilleurs ingrédients. C'est pourquoi nous avons pris l'engagement fort de nous approvisionner auprès des producteurs et artisans de la région de Dakar. Ce choix nous permet non seulement de garantir une fraîcheur incomparable, mais aussi de soutenir l'économie locale et de réduire notre empreinte écologique.</p>
            
            <h3>Nos partenaires, notre fierté</h3>
            <p>Nous travaillons main dans la main avec des passionnés qui partagent nos valeurs d'excellence et de respect de l'environnement.</p>
            <ul>
                <li><strong>Les maraîchers de Keur Massar :</strong> Ils nous fournissent quotidiennement en légumes croquants et savoureux, cultivés en agriculture raisonnée.</li>
                <li><strong>Le pêcheur de Yoff :</strong> Notre poisson arrive directement du port, garantissant une qualité et une fraîcheur exceptionnelles pour nos plats marins.</li>
                <li><strong>L'artisan fromager de la ville :</strong> Il prépare pour nous une mozzarella artisanale qui fait toute la différence sur nos pizzas.</li>
            </ul>
            
            <h3>Un cercle vertueux</h3>
            <p>En choisissant FoodWar, vous ne vous régalez pas seulement, vous participez à un écosystème durable. Vous encouragez les circuits courts, valorisez le savoir-faire local et contribuez à une économie plus juste. C'est ça, l'esprit FoodWar : le bon goût du partage, de la fourche à la fourchette.</p>
        `
    }
];