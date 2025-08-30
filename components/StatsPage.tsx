import React, { useState, useEffect, useRef } from 'react';
import { useAnalytics, useAppearance } from '../App';
import type { UserEvent } from '../types';
import { Chart, registerables } from 'chart.js';
import { THEME_OPTIONS } from '../constants';

Chart.register(...registerables);

type Metric = 'cart' | 'favorites' | 'views' | 'categories';
type ChartType = 'bar' | 'doughnut';
type TimeRange = '7d' | '30d' | 'all';

const StatsPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const { getEvents } = useAnalytics();
    const { themeColor } = useAppearance();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    const [metric, setMetric] = useState<Metric>('cart');
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [timeRange, setTimeRange] = useState<TimeRange>('all');

    useEffect(() => {
        const processData = () => {
            let events = getEvents();

            // 1. Filter by Time
            if (timeRange !== 'all') {
                const now = new Date();
                const days = timeRange === '7d' ? 7 : 30;
                const cutoff = new Date(now.setDate(now.getDate() - days));
                events = events.filter(e => new Date(e.timestamp) >= cutoff);
            }

            // 2. Filter by Metric Type
            const eventTypeMap: { [key in Metric]: UserEvent['type'] } = {
                cart: 'ADD_TO_CART',
                favorites: 'ADD_FAVORITE',
                views: 'VIEW_PRODUCT',
                categories: 'VIEW_CATEGORY',
            };
            const relevantEvents = events.filter(e => e.type === eventTypeMap[metric]);

            // 3. Group and Count
            const counts = relevantEvents.reduce((acc, event) => {
                const key = event.payload.name;
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {} as { [key: string]: number });
            
            const sortedData = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
            
            return {
                labels: sortedData.map(item => item[0]),
                data: sortedData.map(item => item[1]),
            };
        };

        const { labels, data } = processData();
        
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        if (labels.length === 0) {
            return; // No data to display
        }

        const currentTheme = THEME_OPTIONS.find(t => t.color === themeColor) || THEME_OPTIONS[0];
        const chartRgb = currentTheme.chartRgb;

        chartRef.current = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Nombre d\'interactions',
                    data: data,
                    backgroundColor: `rgba(${chartRgb}, 0.7)`,
                    borderColor: '#1f2937',
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#d1d5db',
                        },
                    },
                    title: {
                        display: true,
                        text: getChartTitle(metric, timeRange),
                        color: '#f9fafb',
                        font: { size: 16 }
                    }
                },
                scales: chartType === 'bar' ? {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#9ca3af', stepSize: 1 },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#9ca3af' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                } : {}
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [metric, chartType, timeRange, getEvents, themeColor]);
    
    const getChartTitle = (metric: Metric, timeRange: TimeRange) => {
        const metricText = {
            cart: 'Produits les plus ajoutés au panier',
            favorites: 'Produits les plus ajoutés en favoris',
            views: 'Produits les plus consultés',
            categories: 'Catégories les plus consultées'
        }[metric];
        const timeText = {
            '7d': '(7 derniers jours)',
            '30d': '(30 derniers jours)',
            'all': '(Tout temps)'
        }[timeRange];
        return `${metricText} ${timeText}`;
    };

    const hasData = getEvents().length > 0;

    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
            <button onClick={() => setPage('account')} className={`mb-8 inline-flex items-center gap-2 text-${themeColor}-500 hover:text-${themeColor}-400 font-semibold`}>
                <span className="material-icons-outlined">arrow_back</span>
                Retour au compte
            </button>
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-white text-center mb-6">Mes Statistiques</h1>
                
                {hasData ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-neutral-900 rounded-lg">
                            <div>
                                <label htmlFor="metric" className="block text-sm font-medium text-neutral-300 mb-1">Métrique</label>
                                <select id="metric" value={metric} onChange={e => setMetric(e.target.value as Metric)} className={`w-full bg-neutral-700 border-neutral-600 rounded-md p-2 focus:ring-${themeColor}-500 focus:border-${themeColor}-500`}>
                                    <option value="cart">Ajouts au panier</option>
                                    <option value="favorites">Favoris</option>
                                    <option value="views">Produits vus</option>
                                    <option value="categories">Catégories vues</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="chartType" className="block text-sm font-medium text-neutral-300 mb-1">Type de graphique</label>
                                <select id="chartType" value={chartType} onChange={e => setChartType(e.target.value as ChartType)} className={`w-full bg-neutral-700 border-neutral-600 rounded-md p-2 focus:ring-${themeColor}-500 focus:border-${themeColor}-500`}>
                                    <option value="bar">Barres</option>
                                    <option value="doughnut">Donut</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="timeRange" className="block text-sm font-medium text-neutral-300 mb-1">Période</label>
                                <select id="timeRange" value={timeRange} onChange={e => setTimeRange(e.target.value as TimeRange)} className={`w-full bg-neutral-700 border-neutral-600 rounded-md p-2 focus:ring-${themeColor}-500 focus:border-${themeColor}-500`}>
                                    <option value="all">Tout temps</option>
                                    <option value="30d">30 derniers jours</option>
                                    <option value="7d">7 derniers jours</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative h-96">
                            <canvas ref={canvasRef}></canvas>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                         <span className="material-icons-outlined text-6xl text-neutral-600">query_stats</span>
                         <p className="text-xl text-neutral-400 mt-4">Pas encore de données à afficher.</p>
                         <p className="text-neutral-500">Commencez à naviguer pour voir vos statistiques apparaître ici !</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsPage;