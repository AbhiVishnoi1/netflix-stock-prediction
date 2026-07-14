import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, RefreshCw, BarChart2, ShieldCheck, 
  Activity, Award, LayoutDashboard, Sliders, Database, LineChart
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

function App() {
  // Input states
  const [dailyReturn, setDailyReturn] = useState(0.5);
  const [highLowPct, setHighLowPct] = useState(2.1);
  const [volumeChange, setVolumeChange] = useState(1.0);
  const [closePrice, setClosePrice] = useState(500);

  // App logic states
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Leaderboard Data (Directly from your project results)
  const leaderboardData = [
    { name: 'Random Forest', Accuracy: 58.59, Precision: 64.56, Recall: 48.57 },
    { name: 'XGBoost', Accuracy: 57.58, Precision: 63.64, Recall: 46.67 },
    { name: 'SVM', Accuracy: 57.58, Precision: 61.54, Recall: 53.33 },
    { name: 'Decision Tree', Accuracy: 56.57, Precision: 61.73, Recall: 47.62 },
    { name: 'AdaBoost', Accuracy: 54.55, Precision: 61.90, Recall: 37.14 },
    { name: 'Linear Regression', Accuracy: 52.02, Precision: 55.10, Recall: 51.43 },
    { name: 'KNN', Accuracy: 52.02, Precision: 56.10, Recall: 43.81 },
    { name: 'Naive Bayes', Accuracy: 49.49, Precision: 51.80, Recall: 68.57 },
    { name: 'Logistic Regression', Accuracy: 47.98, Precision: 50.96, Recall: 50.48 }
  ];

  // Top 3 comparison data for Radar Chart
  const radarData = [
    { subject: 'Accuracy', 'Random Forest': 58.59, XGBoost: 57.58, SVM: 57.58 },
    { subject: 'Precision', 'Random Forest': 64.56, XGBoost: 63.64, SVM: 61.54 },
    { subject: 'Recall', 'Random Forest': 48.57, XGBoost: 46.67, SVM: 53.33 },
  ];

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://netflix-ml-api.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          daily_return: parseFloat(dailyReturn),
          volume_change: parseFloat(volumeChange),
          high_low_pct: parseFloat(highLowPct),
          close_price: parseFloat(closePrice),
        }),
      });

      if (!response.ok) {
        throw new Error('Could not connect to ML backend.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* 1. MAIN APPS HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-red-600 font-black text-2xl tracking-tighter">NETFLIX</span>
          <div className="flex items-center gap-1.5 bg-slate-800 text-xs px-2.5 py-1 rounded-full text-slate-300 font-mono tracking-wider">
            <LayoutDashboard className="w-3.5 h-3.5 text-red-500" />
            ANALYTICS HUB
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm text-slate-400">
            Current Champion: <span className="text-red-500 font-bold">Random Forest (58.59%)</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ML Server Connected
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK GRID CONTAINER */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 lg:p-6 space-y-6">
        
        {/* SECTION 1: TOP EXECUTIVE METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-lg"><Award className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Best Model</p>
              <h4 className="text-lg font-bold">Random Forest</h4>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg"><ShieldCheck className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Peak Accuracy</p>
              <h4 className="text-lg font-bold">58.59 %</h4>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><Activity className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Model Precision</p>
              <h4 className="text-lg font-bold">64.56 %</h4>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg"><Database className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Analyzed Models</p>
              <h4 className="text-lg font-bold">9 Classifiers</h4>
            </div>
          </div>
        </div>

        {/* SECTION 2: SIMULATION ZONE & LIVE SIGNAL GENERATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Input Parameters Form (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-3">
                <Sliders className="text-red-500 w-5 h-5" />
                <h2 className="text-lg font-bold">Predictor Parameters</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-400 font-medium">Daily Return (%)</span>
                    <span className="font-mono text-emerald-400 font-bold">{dailyReturn}%</span>
                  </div>
                  <input 
                    type="range" min="-10" max="10" step="0.1" value={dailyReturn} 
                    onChange={(e) => setDailyReturn(e.target.value)}
                    className="w-full accent-red-600 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-400 font-medium">High-Low Spread (%)</span>
                    <span className="font-mono text-purple-400 font-bold">{highLowPct}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="15" step="0.1" value={highLowPct} 
                    onChange={(e) => setHighLowPct(e.target.value)}
                    className="w-full accent-red-600 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-400 font-medium">Volume Change Ratio</span>
                    <span className="font-mono text-blue-400 font-bold">{volumeChange}x</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="5.0" step="0.1" value={volumeChange} 
                    onChange={(e) => setVolumeChange(e.target.value)}
                    className="w-full accent-red-600 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 font-medium mb-1.5">
                    Today's Closing Price ($)
                  </label>
                  <input 
                    type="number" value={closePrice} 
                    onChange={(e) => setClosePrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 font-mono text-slate-200 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] mt-6"
            >
              {loading ? (
                <RefreshCw className="animate-spin w-5 h-5" />
              ) : (
                <span>Run Diagnostics Engine</span>
              )}
            </button>
          </div>

          {/* Right: Signal Output Screen (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col justify-center items-center shadow-xl relative overflow-hidden min-h-[360px]">
            {error && (
              <div className="text-center">
                <p className="text-red-400 font-semibold mb-2">Diagnostic Error</p>
                <p className="text-sm text-slate-400">{error}</p>
              </div>
            )}

            {!result && !error && !loading && (
              <div className="text-center text-slate-500 max-w-sm">
                <BarChart2 className="w-12 h-12 mx-auto mb-4 stroke-[1.5] text-slate-600" />
                <p className="font-semibold text-slate-400 text-base">Awaiting Diagnostic Signals</p>
                <p className="text-xs mt-1.5 text-slate-500">Configure parameters on the left pane and fire the diagnostics execution engine to see the direction vector.</p>
              </div>
            )}

            {loading && (
              <div className="text-center">
                <RefreshCw className="animate-spin w-10 h-10 text-red-500 mx-auto mb-4" />
                <p className="text-sm text-slate-400 font-mono">Querying Random Forest matrix...</p>
              </div>
            )}

            {result && !loading && !error && (
              <div className="w-full text-center z-10">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                  Tomorrow's Direction Signal
                </p>

                {result.prediction === "UP" ? (
                  <div className="animate-fade-in">
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                      <TrendingUp className="w-14 h-14" />
                    </div>
                    <h3 className="text-5xl font-black text-emerald-400 tracking-tight">🟢 UP (BUY)</h3>
                    <p className="text-sm text-slate-400 mt-3 max-w-md mx-auto">
                      Our Random Forest model expects upward pressure. Netflix price indicators show strong momentum support.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="inline-flex p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4">
                      <TrendingDown className="w-14 h-14" />
                    </div>
                    <h3 className="text-5xl font-black text-red-500 tracking-tight">🔴 DOWN (SELL)</h3>
                    <p className="text-sm text-slate-400 mt-3 max-w-md mx-auto">
                      Our Random Forest model expects downward pressure. Trend indicators recommend defensive hedging.
                    </p>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-xs mx-auto">
                  <div className="flex justify-between text-xs text-slate-400 font-semibold mb-1.5">
                    <span>AI Confidence Probability</span>
                    <span>{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${result.prediction === "UP" ? 'bg-emerald-500' : 'bg-red-500'}`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: ML LEADERBOARD VISUAL COMPARISON CHARTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800/80 pb-3">
            <LineChart className="text-red-500 w-5 h-5" />
            <h2 className="text-lg font-bold">Machine Learning Model Comparison</h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left: Interactive Model Accuracy Bar Chart (8 Columns wide) */}
            <div className="xl:col-span-8">
              <h3 className="text-sm font-semibold text-slate-400 mb-4">Overall Performance vs. 50% Baseline (Random Guess)</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={leaderboardData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" domain={[40, 65]} stroke="#94a3b8" />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={110} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="Accuracy" fill="#e50914" radius={[0, 4, 4, 0]} barSize={16} />
                    {/* Visual 50% target baseline line */}
                    <ReferenceLine x={50} stroke="#ef4444" strokeDasharray="5 5" label={{ value: '50% Guessing', fill: '#ef4444', position: 'top', fontSize: 10 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Multi-Metric Radar Comparison Chart (4 Columns wide) */}
            <div className="xl:col-span-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-4">Champion Trio Deep Dive</h3>
                <p className="text-xs text-slate-500 mb-4">Detailed metric breakdown comparison mapping our top three models across key validation vectors.</p>
              </div>
              <div className="h-[280px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" r="80%" data={radarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[40, 70]} stroke="#475569" style={{ fontSize: '10px' }} />
                    <Radar name="Random Forest" dataKey="Random Forest" stroke="#e50914" fill="#e50914" fillOpacity={0.2} />
                    <Radar name="XGBoost" dataKey="XGBoost" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                    <Radar name="SVM" dataKey="SVM" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;