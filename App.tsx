import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar, { CategoriesWidget, PlatDuJourWidget } from './components/LeftSidebar';
import MainContent, { Hero } from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import BoutiquePage from './components/BoutiquePage';
import BoissonsPage from './components/BoissonsPage';
import BlogPage from './components/BlogPage';
import ArticlePage from './components/ArticlePage';
import ContactPage from './components/ContactPage';
import ProductDetailPage from './components/ProductDetailPage';
import PlatDuJourPage from './components/PlatDuJourPage';
import CartPage from './components/CartPage';
import FavoritesPage from './components/FavoritesPage';
import AccountPage from './components/AccountPage';
import DataPage from './components/DataPage';
import StatsPage from './components/StatsPage';
import ProPage from './components/ProPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import RefundPolicyPage from './components/RefundPolicyPage';
import BranchesPage from './components/BranchesPage';
import OffersPage from './components/OffersPage';
import KitchenTourPage from './components/KitchenTourPage';
import TeamPage from './components/TeamPage';
import MoreLinksPage from './components/MoreLinksPage';
import MaintenancePage from './components/MaintenancePage';
import NotFoundPage from './components/NotFoundPage';
import Toast from './components/Toast';
import OrderSuccessPage from './components/OrderSuccessPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import NewsPage from './components/NewsPage';
import NewsArticlePage from './components/NewsArticlePage';
import { CATEGORIES, BLOG_POSTS, PRODUCTS, NavLinks, APP_CONFIG, NEWS_ARTICLES, THEME_OPTIONS } from './constants';
import { MAINTENANCE_MODE, FEATURE_FLAGS } from './featureFlags';
import type { CartItem, Product, User, UserEvent, Order } from './types';

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: React.SetStateAction<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Toast Context
interface ToastAction {
  label: string;
  onClick: () => void;
}
interface ToastMessage {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
  action?: ToastAction;
}
interface ToastContextType {
  showToast: (message: string, type: 'info' | 'success' | 'error', action?: ToastAction) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};
const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (message: string, type: 'info' | 'success' | 'error', action?: ToastAction) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, action }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    };
    
    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] w-full max-w-sm space-y-2">
                {toasts.map(toast => (
                    <Toast key={toast.id} message={toast.message} type={toast.type} action={toast.action} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

// Appearance Context
type FontSize = 'small' | 'medium' | 'large';
interface AppearanceContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
}
const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);
export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (!context) throw new Error('useAppearance must be used within an AppearanceProvider');
  return context;
};
const AppearanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useLocalStorage<FontSize>('fontSize', 'medium');
  const [themeColor, setThemeColor] = useLocalStorage<string>('themeColor', APP_CONFIG.DEFAULT_THEME);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    root.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  const value = { fontSize, setFontSize, themeColor, setThemeColor };
  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
};

// Analytics Context
interface AnalyticsContextType {
  trackEvent: (event: Omit<UserEvent, 'timestamp'>) => void;
  getEvents: () => UserEvent[];
}
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);
export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) throw new Error('useAnalytics must be used within an AnalyticsProvider');
    return context;
};
const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [events, setEvents] = useLocalStorage<UserEvent[]>('userEvents', []);
    const trackEvent = (event: Omit<UserEvent, 'timestamp'>) => {
        const newEvent: UserEvent = { ...event, timestamp: new Date().toISOString() };
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };
    const getEvents = () => events;
    const value = { trackEvent, getEvents };
    return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

// Cart Context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  decrementItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartSubtotal: () => number;
  getDeliveryFee: () => number;
  getCartTotal: () => number;
  setCartItems: (items: CartItem[]) => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);
  const { trackEvent } = useAnalytics();

  const addToCart = (product: Product) => {
    trackEvent({ type: 'ADD_TO_CART', payload: { id: product.id, name: product.name } });
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const decrementItem = (productId: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const removeItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const clearCart = () => setCartItems([]);
  
  const getCartItemCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);

  const getCartSubtotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getDeliveryFee = () => {
    const subtotal = getCartSubtotal();
    if (subtotal >= APP_CONFIG.DELIVERY_CONFIG.FREE_DELIVERY_THRESHOLD) {
        return 0;
    }
    return APP_CONFIG.DELIVERY_CONFIG.DELIVERY_FEE;
  };
  
  const getCartTotal = () => getCartSubtotal() + getDeliveryFee();

  const value = { cartItems, addToCart, decrementItem, removeItem, clearCart, getCartItemCount, getCartSubtotal, getDeliveryFee, getCartTotal, setCartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Favorites Context
interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  setFavorites: (productIds: number[]) => void;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', []);
  const { trackEvent } = useAnalytics();

  const toggleFavorite = (productId: number) => {
    const isCurrentlyFavorite = favorites.includes(productId);
    if (!isCurrentlyFavorite) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            trackEvent({ type: 'ADD_FAVORITE', payload: { id: productId, name: product.name } });
        }
    }
    setFavorites(prev => 
      isCurrentlyFavorite ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: number) => favorites.includes(productId);
  
  const value = { favorites, toggleFavorite, isFavorite, setFavorites };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

// User Context
interface UserContextType {
    user: User;
    updateUser: (user: User) => void;
    isProfileDefault: () => boolean;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useLocalStorage<User>('userProfile', { name: 'Utilisateur invité', email: 'email@example.com' });
    
    const updateUser = (newUser: User) => {
        setUser(newUser);
    };

    const isProfileDefault = () => {
        return user.email === 'email@example.com' || user.name === 'Utilisateur invité';
    };

    const value = { user, updateUser, isProfileDefault };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Order Context
interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
    lastSuccessfulOrder: Order | null;
    setLastSuccessfulOrder: (order: Order | null) => void;
}
const OrderContext = createContext<OrderContextType | undefined>(undefined);
export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrders must be used within an OrderProvider');
    return context;
};
const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
    const [lastSuccessfulOrder, setLastSuccessfulOrder] = useState<Order | null>(null);

    const addOrder = (newOrder: Order) => {
        setOrders(prev => [newOrder, ...prev]);
        setLastSuccessfulOrder(newOrder);
    };

    const value = { orders, addOrder, lastSuccessfulOrder, setLastSuccessfulOrder };
    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

const MobileMenu: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    setPage: (page: string) => void;
    onCategorySelect: (categoryId: string) => void;
}> = ({ isOpen, onClose, setPage, onCategorySelect }) => {
  const { themeColor } = useAppearance();
  const handleNavigate = (pageId?: string) => {
    if (pageId) setPage(pageId);
    onClose();
  };
  const handleCategoryNavigation = (categoryId: string) => {
    onCategorySelect(categoryId);
    onClose();
  };
  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={onClose}></div>
      <div className={`relative bg-neutral-800 w-80 h-full shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 overflow-y-auto h-full custom-scrollbar">
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
            <span className="material-icons-outlined">close</span>
          </button>
          <h2 className="text-2xl font-bold text-white mt-2 mb-6">Menu</h2>
          <nav><ul className="space-y-4">{NavLinks.map(link => (<li key={link.name}><a href={link.href} className={`text-lg text-neutral-300 hover:text-${themeColor}-500`} onClick={() => handleNavigate(link.id)}>{link.name}</a></li>))}</ul></nav>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Catégories</h3>
            <ul className="space-y-2">{CATEGORIES.map((category) => (<li key={category.id}><a href="#" className={`flex justify-between items-center text-neutral-300 hover:text-${themeColor}-500`} onClick={() => handleCategoryNavigation(category.id)}><span>{category.name}</span><span>&gt;</span></a></li>))}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPageState] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const [boutiqueFilterRequest, setBoutiqueFilterRequest] = useState<{ categoryId: string | null; searchQuery: string | null; key: number }>({ categoryId: null, searchQuery: null, key: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const analytics = useAnalytics();
  const { lastSuccessfulOrder } = useOrders();
  const { themeColor } = useAppearance();
  
  if (MAINTENANCE_MODE) return <MaintenancePage />;

  const handleProductSelect = (productId: number) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) analytics.trackEvent({ type: 'VIEW_PRODUCT', payload: { id: productId, name: product.name } });
    setSelectedProductId(productId);
    setSelectedPostId(null);
    setSelectedNewsId(null);
    window.scrollTo(0, 0);
  };
  
  const handleNewsSelect = (newsId: number) => {
    setSelectedNewsId(newsId);
    setPageState('news');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => { setShowBackToTop(window.scrollY > 300); };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);
  
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('product/')) {
      const id = parseInt(hash.split('/')[1], 10);
      if (!isNaN(id) && PRODUCTS.some(p => p.id === id)) handleProductSelect(id);
    } else if (hash.startsWith('article/')) {
      const id = parseInt(hash.split('/')[1], 10);
      if (!isNaN(id) && BLOG_POSTS.some(p => p.id === id)) { setPageState('blog'); setSelectedPostId(id); }
    } else if (hash.startsWith('news/')) {
      const id = parseInt(hash.split('/')[1], 10);
      if (!isNaN(id) && NEWS_ARTICLES.some(n => n.id === id)) { handleNewsSelect(id); }
    }
  }, []);
  
  useEffect(() => {
    const currentTheme = THEME_OPTIONS.find(t => t.color === themeColor) || THEME_OPTIONS[0];
    const colorValue = currentTheme.hex;
    const styleId = 'prose-theme-style';
    let style = document.getElementById(styleId);
    if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
    }
    style.innerHTML = `
        :root { --theme-color-prose-marker: ${colorValue}; }
        .prose li::marker { color: var(--theme-color-prose-marker); }
    `;
  }, [themeColor]);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const setPage = (newPage: string) => {
    setPageState(newPage);
    setSelectedPostId(null);
    setSelectedProductId(null);
    setSelectedNewsId(null);
    if (newPage === 'boutique') setBoutiqueFilterRequest({ categoryId: null, searchQuery: null, key: Date.now() });
    window.scrollTo(0, 0);
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if(category) analytics.trackEvent({ type: 'VIEW_CATEGORY', payload: { id: categoryId, name: category.name } });
    setBoutiqueFilterRequest({ categoryId: categoryId, searchQuery: null, key: Date.now() });
    setPageState('boutique');
    setSelectedProductId(null);
    window.scrollTo(0, 0);
  };
  
  const handleSearch = (query: string) => {
    setBoutiqueFilterRequest({ categoryId: null, searchQuery: query, key: Date.now() });
    setPageState('boutique');
    setSelectedProductId(null);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    const post = selectedPostId ? BLOG_POSTS.find(p => p.id === selectedPostId) : null;
    if (page === 'blog' && post) return <ArticlePage post={post} onBack={() => setSelectedPostId(null)} onSelectPost={setSelectedPostId} />;

    const news = selectedNewsId ? NEWS_ARTICLES.find(n => n.id === selectedNewsId) : null;
    if (page === 'news' && news) return <NewsArticlePage article={news} onBack={() => setSelectedNewsId(null)} onSelectNews={handleNewsSelect} />;

    const product = selectedProductId ? PRODUCTS.find(p => p.id === selectedProductId) : null;
    if (product) return <ProductDetailPage product={product} onBack={() => setSelectedProductId(null)} onSelectProduct={handleProductSelect} />;

    switch (page) {
        case 'home': return (
            <>
                {/* Mobile/Tablet Layout: Single column, re-ordered */}
                <div className="lg:hidden space-y-8">
                    {FEATURE_FLAGS.homepage.showHeroSection && <Hero setPage={setPage} />}
                    {FEATURE_FLAGS.homepage.showPlatDuJourWidget && <PlatDuJourWidget setPage={setPage} onSelectProduct={handleProductSelect} />}
                    <CategoriesWidget onCategorySelect={handleCategorySelect} />
                    <MainContent onSelectProduct={handleProductSelect} showHero={false} setPage={setPage} />
                    <LeftSidebar 
                        onCategorySelect={handleCategorySelect} 
                        setPage={setPage} 
                        onSelectProduct={handleProductSelect} 
                        showCategories={false} 
                        showPlatDuJour={false} 
                    />
                    <RightSidebar onSelectNews={handleNewsSelect} />
                </div>
                
                {/* Desktop Layout: 3 columns */}
                <div className="hidden lg:flex lg:gap-8 items-start">
                    <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                        <LeftSidebar onCategorySelect={handleCategorySelect} setPage={setPage} onSelectProduct={handleProductSelect} />
                    </aside>
                    <div className="w-full lg:w-1/2">
                        <MainContent onSelectProduct={handleProductSelect} setPage={setPage} />
                    </div>
                    <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                        <RightSidebar onSelectNews={handleNewsSelect} />
                    </aside>
                </div>
            </>
        );
        case 'boutique': return <BoutiquePage filterRequest={boutiqueFilterRequest} onSelectProduct={handleProductSelect} />;
        case 'boissons': return <BoissonsPage onSelectProduct={handleProductSelect} />;
        case 'blog': return <BlogPage onSelectPost={setSelectedPostId} />;
        case 'news': return <NewsPage onSelectNews={handleNewsSelect} />;
        case 'contact': return <ContactPage />;
        case 'plat-du-jour': return <PlatDuJourPage onSelectProduct={handleProductSelect} />;
        case 'cart': return <CartPage setPage={setPage} />;
        case 'favorites': return <FavoritesPage setPage={setPage} onSelectProduct={handleProductSelect} />;
        case 'account': return <AccountPage setPage={setPage} />;
        case 'data': return <DataPage setPage={setPage} />;
        case 'stats': return <StatsPage setPage={setPage} />;
        case 'order-history': return <OrderHistoryPage setPage={setPage} />;
        case 'pro': return <ProPage />;
        case 'privacy-policy': return <PrivacyPolicyPage setPage={setPage} />;
        case 'refund-policy': return <RefundPolicyPage setPage={setPage} />;
        case 'branches': return <BranchesPage />;
        case 'offers': return <OffersPage />;
        case 'kitchen-tour': return <KitchenTourPage />;
        case 'team': return <TeamPage />;
        case 'more-links': return <MoreLinksPage />;
        case 'order-success': return lastSuccessfulOrder ? <OrderSuccessPage order={lastSuccessfulOrder} setPage={setPage} /> : <NotFoundPage setPage={setPage} />;
        default: return <NotFoundPage setPage={setPage} />;
    }
  };

  return (
      <div className="bg-neutral-900 text-neutral-300 min-h-screen">
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setPage={setPage} onCategorySelect={handleCategorySelect}/>
        <header className="sticky top-0 z-40 bg-neutral-800/80 backdrop-blur-sm shadow-lg">
          <div className="container mx-auto px-4"><Header onMenuClick={() => setIsMenuOpen(true)} page={page} setPage={setPage} onSearch={handleSearch} /></div>
        </header>
        <main className="container mx-auto px-4 py-8">{renderPage()}</main>
        <Footer setPage={setPage} />
        {FEATURE_FLAGS.global.showBackToTopButton && (
          <button 
            onClick={scrollToTop} 
            className={`fixed bottom-8 right-8 bg-${themeColor}-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-${themeColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-${themeColor}-500 transition-all duration-300 ease-in-out z-50 ${showBackToTop ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'}`} 
            aria-label="Retour en haut" 
            title="Retour en haut"
          >
            <span className="material-icons-outlined">arrow_upward</span>
          </button>
        )}
      </div>
  );
}

const AppWrapper = () => (
    <ToastProvider>
        <AnalyticsProvider>
            <UserProvider>
                <FavoritesProvider>
                    <CartProvider>
                        <OrderProvider>
                            <AppearanceProvider>
                                <App />
                            </AppearanceProvider>
                        </OrderProvider>
                    </CartProvider>
                </FavoritesProvider>
            </UserProvider>
        </AnalyticsProvider>
    </ToastProvider>
);

export default AppWrapper;