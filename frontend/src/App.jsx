import { useCallback, useEffect, useState } from 'react';
import './App.css';

import HomePage from './pages/HomePage';
import EDAPage from './pages/EDAPage';

import { AIRPORTS, AIRPORTS_BY_CODE, airportLabel, distanceMiles } from './data/airports';
import { AIRLINES, airlineLabel } from './data/airlines';
import {
  Toast,
  ThemeToggle,
  DepartureBoard,
  RouteChips,
  BoardingPass,
  SkeletonResult,
  WeatherWidget,
  OnboardingTour,
  ComparisonMode,
  RouteMap,
} from './components/AllComponents';

const BLANK = {
  carrier: '',
  origin: '',
  destination: '',
  flight_date: '',
  departure_time: '',
  arrival_time: '',
  elapsed_time: '',
  distance: '',
};

const SAMPLE_FLIGHT = {
  carrier: 'DL',
  origin: 'ATL',
  destination: 'JFK',
  flight_date: '2025-01-15',
  departure_time: '18:30',
  arrival_time: '20:30',
  elapsed_time: '120',
  distance: String(distanceMiles('ATL', 'JFK') || 760),
};

export default function App() {
const [currentPage, setCurrentPage] = useState("home");
  /* ---------- Theme ---------- */
  const [theme, setTheme] = useState(
    () => localStorage.getItem('lw_theme') || 'light'
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lw_theme', theme);
  }, [theme]);

  /* ---------- Onboarding ---------- */
  const [showTour, setShowTour] = useState(
    () => !localStorage.getItem('lw_onboarded')
  );

  /* ---------- Toasts ---------- */
  const [toasts, setToasts] = useState([]);
  
const pushToast = useCallback((type, title, message) => {
  const id = Date.now() + Math.random();

  setToasts((t) => [...t, { id, type, title, message }]);

  setTimeout(() => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, 4500);
}, []);

  const dismissToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  /* ---------- Form ---------- */
  const [formData, setFormData] = useState(() => {
  const sp = new URLSearchParams(window.location.search);

  if (!sp.toString()) return BLANK;

  return {
    carrier: sp.get('carrier') || '',
    origin: sp.get('origin') || '',
    destination: sp.get('destination') || '',
    flight_date: sp.get('flight_date') || '',
    departure_time: sp.get('departure_time') || '',
    arrival_time: sp.get('arrival_time') || '',
    elapsed_time: sp.get('elapsed_time') || '',
    distance: sp.get('distance') || '',
  };
});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      // Auto-compute distance when both airports are valid
      if ((name === 'origin' || name === 'destination') && next.origin && next.destination) {
        const d = distanceMiles(next.origin.toUpperCase(), next.destination.toUpperCase());
        if (d) next.distance = String(d);
      }

      // Auto-compute elapsed_time from departure/arrival
      if ((name === 'departure_time' || name === 'arrival_time') && next.departure_time && next.arrival_time) {
        const [dh, dm] = next.departure_time.split(':').map(Number);
        const [ah, am] = next.arrival_time.split(':').map(Number);
        let mins = ah * 60 + am - (dh * 60 + dm);
        if (mins < 0) mins += 24 * 60; // overnight flight
        if (mins > 0 && mins < 24 * 60) next.elapsed_time = String(mins);
      }

      return next;
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          carrier: formData.carrier.trim().toUpperCase(),
          origin: formData.origin.trim().toUpperCase(),
          destination: formData.destination.trim().toUpperCase(),
          elapsed_time: Number(formData.elapsed_time),
          distance: Number(formData.distance),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to generate prediction.');
      setResult(data);
      pushToast('success', 'Prediction ready', `Delay risk: ${Number(data.delay_probability ?? 0).toFixed(1)}%`);
    } catch (err) {
      setError(err.message);
      pushToast('error', 'Prediction failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = useCallback(() => {
  setFormData(BLANK);
  setResult(null);
  setError('');
  pushToast('info', 'Form cleared', 'All fields have been reset.');
}, [pushToast]);

  const loadSampleFlight = () => {
    setFormData(SAMPLE_FLIGHT);
    setResult(null);
    setError('');
    pushToast('info', 'Sample loaded', 'ATL → JFK sample flight is ready to predict.');
    setTimeout(() => document.getElementById('carrier')?.focus(), 0);
  };

  const quickPickRoute = (from, to) => {
    const d = distanceMiles(from, to);
    setFormData((p) => ({
      ...p,
      origin: from,
      destination: to,
      distance: d ? String(d) : p.distance,
    }));
  };

  /* ---------- Keyboard shortcuts ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        document.getElementById('carrier')?.focus();
      }
      if (e.key === 'Escape') {
        handleClear();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.querySelector('.prediction-form')?.requestSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClear]);

  const significantDelay = result?.prediction === 'Significant Delay';
  const originMeta = AIRPORTS_BY_CODE[formData.origin?.toUpperCase()];
  const destMeta = AIRPORTS_BY_CODE[formData.destination?.toUpperCase()];

  /* ---------- Copy summary to clipboard ---------- */
  const copySummary = async () => {
    if (!result) return;
    const text =
`LibertyWing AI — Flight Delay Prediction
Route: ${formData.origin?.toUpperCase()} → ${formData.destination?.toUpperCase()}
Carrier: ${formData.carrier?.toUpperCase()}
Date: ${formData.flight_date}
Departure: ${formData.departure_time}
Prediction: ${result.prediction}
Delay probability: ${Number(result.delay_probability ?? 0).toFixed(2)}%`;
    try {
      await navigator.clipboard.writeText(text);
      pushToast('success', 'Copied', 'Summary copied to clipboard.');
    } catch {
      pushToast('error', 'Copy failed', 'Please copy manually.');
    }
  };

  /* ---------- Download report ---------- */
  const downloadReport = () => {
    if (!result) return;
    const lines = [
      'LibertyWing AI — Prediction Report',
      '====================================',
      `Generated: ${new Date().toLocaleString()}`,
      '',
      `Carrier:       ${formData.carrier?.toUpperCase()}`,
      `Origin:        ${formData.origin?.toUpperCase()}`,
      `Destination:   ${formData.destination?.toUpperCase()}`,
      `Date:          ${formData.flight_date}`,
      `Departure:     ${formData.departure_time}`,
      `Arrival:       ${formData.arrival_time}`,
      `Duration:      ${formData.elapsed_time} min`,
      `Distance:      ${formData.distance} mi`,
      '',
      `Prediction:    ${result.prediction}`,
      `Probability:   ${Number(result.delay_probability ?? 0).toFixed(2)}%`,
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `libertywing-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast('success', 'Report downloaded', 'Check your downloads.');
  };

  const shareLink = async () => {
    const params = new URLSearchParams(formData).toString();
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    try {
      await navigator.clipboard.writeText(url);
      pushToast('success', 'Link copied', 'Share this flight with anyone.');
    } catch {
      pushToast('error', 'Could not copy link', url);
    }
  };

  return (
    <div className="app">
      {/* ---------- Backgrounds ---------- */}
      <div className="air-traffic" aria-hidden="true">
        <div className="contrail contrail-1"></div>
        <div className="contrail contrail-2"></div>
        <div className="contrail contrail-3"></div>
        <div className="sky-plane plane-1"><span className="plane-body">✈</span><span className="plane-light"></span></div>
        <div className="sky-plane plane-2"><span className="plane-body">✈</span><span className="plane-light"></span></div>
        <div className="sky-plane plane-3"><span className="plane-body">✈</span><span className="plane-light"></span></div>
        <div className="sky-plane plane-4"><span className="plane-body">✈</span><span className="plane-light"></span></div>
        <div className="sky-plane plane-5"><span className="plane-body">✈</span><span className="plane-light"></span></div>
      </div>
      <div className="background-decoration decoration-one"></div>
      <div className="background-decoration decoration-two"></div>

      {/* ---------- Toasts ---------- */}
      <Toast toasts={toasts} dismiss={dismissToast} />

      {/* ---------- Onboarding ---------- */}
      {showTour && currentPage === 'prediction' && (
        <OnboardingTour onDone={() => setShowTour(false)} />
      )}

      {/* ---------- Comparison Modal ---------- */}
      {showCompare && <ComparisonMode onClose={() => setShowCompare(false)} onToast={pushToast} />}

      <main className="main-wrapper">
        {/* Brand bar */}
        
        {/* ---------- Top Navigation ---------- */}
      <div className="brand-bar">
        <button
          type="button"
          className="brand brand-button"
          onClick={() => setCurrentPage('home')}
        >
          <div className="brand-icon">✈</div>

          <div>
            <span className="brand-title">LibertyWing AI</span>
            <span className="brand-subtitle">
              Departure Delay Prediction
            </span>
          </div>
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <button
            type="button"
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Home
          </button>

          <button
            type="button"
            className={`nav-link ${currentPage === 'eda' ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage('eda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            EDA
          </button>

          <button
            type="button"
            className={`nav-link ${currentPage === 'prediction' ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage('prediction');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Prediction
          </button>
        </nav>

        <div className="brand-actions">
          {currentPage === 'prediction' && (
            <button
              type="button"
              className="compare-trigger"
              onClick={() => setShowCompare(true)}
            >
              ⚖️ Compare
            </button>
          )}

          <ThemeToggle theme={theme} setTheme={setTheme} />

          <div className="model-badge">
            <span className="status-dot"></span>
            Model Live
          </div>
        </div>
      </div>
      {currentPage === 'home' && (
                  <HomePage
                    onOpenPrediction={() => {
                      setCurrentPage('prediction');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onOpenEDA={() => {
                      setCurrentPage('eda');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

                {currentPage === 'eda' && (
                  <EDAPage />
                )}

                {currentPage === 'prediction' && (
                  <section className="prediction-card">
          {/* HERO */}
          <div className="hero-section">
            <div className="hero-map-grid" aria-hidden="true"></div>
            <div className="hero-map-shape" aria-hidden="true"></div>
            <div className="hero-radar" aria-hidden="true"></div>
            <div className="map-path map-path-1" aria-hidden="true"></div>
            <div className="map-path map-path-2" aria-hidden="true"></div>
            <div className="map-path map-path-3" aria-hidden="true"></div>
            <div className="map-plane map-plane-1" aria-hidden="true">✈</div>
            <div className="map-plane map-plane-2" aria-hidden="true">✈</div>
            <div className="map-plane map-plane-3" aria-hidden="true">✈</div>
            <div className="map-airport airport-1"></div>
            <div className="map-airport airport-2"></div>
            <div className="map-airport airport-3"></div>
            <div className="map-airport airport-4"></div>

            <div className="hero-content">
              <div className="eyebrow">
                <span>★</span>
                LIBERTYWING • U.S. AVIATION INTELLIGENCE
              </div>
              <h1>
                Will your flight
                <span> leave on time?</span>
              </h1>
              <p>
                Enter information available before departure and our
                Gradient Boosting model will estimate whether the flight may
                depart 15 minutes or more late.
              </p>
              <div className="hero-cta">
                <button type="button" className="hero-sample-btn" onClick={loadSampleFlight}>
                  ✦ Load sample flight
                </button>
                <span className="hero-hint">Press <kbd>/</kbd> to jump to input · <kbd>⌘/Ctrl+↵</kbd> to predict</span>
              </div>
            </div>

            <div className="hero-status-strip">
              <div className="hero-stat">
                <span className="hero-stat-label">Status</span>
                <span className="hero-stat-value live">Live</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-label">Recall</span>
                <span className="hero-stat-value">60.05%</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-label">F1-score</span>
                <span className="hero-stat-value">23.59%</span>
              </div>
            </div>
          </div>

          {/* Departure board strip */}
          <DepartureBoard />

          <div className="flag-divider"><span></span><span></span><span></span></div>

          {/* Popular route chips */}
          <div className="route-chips-wrapper">
            <RouteChips onPick={quickPickRoute} />
          </div>

          <div className="model-facts-panel">
            <div className="model-fact-main">
              <span className="model-fact-kicker">FINAL MODEL</span>
              <strong>Gradient Boosting with Balanced Sample Weights</strong>
              <small>
                Selected using F1-score as the primary metric for the imbalanced delay target.
              </small>
            </div>
            <div className="model-fact-metrics">
              <div><span>Precision</span><strong>14.67%</strong></div>
              <div><span>Recall</span><strong>60.05%</strong></div>
              <div><span>ROC-AUC</span><strong>59.64%</strong></div>
              <div><span>PR-AUC</span><strong>15.31%</strong></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="form-heading">
              <div>
                <h2>Flight Information</h2>
                <p>Complete all fields to generate a prediction.</p>
              </div>
              <div className="form-heading-actions">
                <button type="button" className="sample-inline-btn" onClick={loadSampleFlight}>Use sample</button>
                <span className="required-note">* All fields required</span>
              </div>
            </div>

            <div className="form-grid">
              {/* Carrier with autocomplete */}
              <div className="form-group">
                <label htmlFor="carrier">
                  <span className="field-icon">✦</span>
                  Operating Carrier
                </label>
                <input
                  id="carrier"
                  type="text"
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleChange}
                  placeholder="e.g. DL"
                  minLength="2"
                  maxLength="3"
                  pattern="[A-Za-z0-9]+"
                  required
                  list="airline-list"
                />
                <datalist id="airline-list">
                  {Object.entries(AIRLINES).map(([code, info]) => (
                    <option key={code} value={code}>{info.name}</option>
                  ))}
                </datalist>
                <small>{airlineLabel(formData.carrier) || '2–3 character airline code'}</small>
              </div>

              <div className="form-group">
                <label htmlFor="flight_date">
                  <span className="field-icon">◆</span>
                  Flight Date
                </label>
                <input id="flight_date" type="date" name="flight_date" value={formData.flight_date} onChange={handleChange} required />
                <small>Select the scheduled flight date</small>
              </div>

              <div className="form-group">
                <label htmlFor="origin">
                  <span className="field-icon origin-dot">●</span>
                  Origin Airport
                </label>
                <input
                  id="origin" type="text" name="origin" value={formData.origin}
                  onChange={handleChange} placeholder="e.g. ATL" minLength="3" maxLength="3"
                  pattern="[A-Za-z]{3}" required list="airport-list"
                />
                <small>{airportLabel(formData.origin) || '3-letter departure airport code'}</small>
              </div>

              <div className="form-group">
                <label htmlFor="destination">
                  <span className="field-icon destination-dot">●</span>
                  Destination Airport
                </label>
                <input
                  id="destination" type="text" name="destination" value={formData.destination}
                  onChange={handleChange} placeholder="e.g. JFK" minLength="3" maxLength="3"
                  pattern="[A-Za-z]{3}" required list="airport-list"
                />
                <small>{airportLabel(formData.destination) || '3-letter arrival airport code'}</small>
              </div>

              <div className="form-group">
                <label htmlFor="departure_time"><span className="field-icon">↑</span>Scheduled Departure</label>
                <input id="departure_time" type="time" name="departure_time" value={formData.departure_time} onChange={handleChange} required />
                <small>Scheduled departure time</small>
              </div>

              <div className="form-group">
                <label htmlFor="arrival_time"><span className="field-icon">↓</span>Scheduled Arrival</label>
                <input id="arrival_time" type="time" name="arrival_time" value={formData.arrival_time} onChange={handleChange} required />
                <small>{formData.elapsed_time ? `Duration: ${formData.elapsed_time} min (auto)` : 'Scheduled arrival time'}</small>
              </div>

              <div className="form-group">
                <label htmlFor="elapsed_time"><span className="field-icon">◷</span>Flight Duration</label>
                <div className="input-with-unit">
                  <input id="elapsed_time" type="number" name="elapsed_time" value={formData.elapsed_time} onChange={handleChange} placeholder="e.g. 150" min="1" required />
                  <span>min</span>
                </div>
                <small>Scheduled elapsed flight time</small>
              </div>

              <div className="form-group">
                <label htmlFor="distance"><span className="field-icon">↔</span>Flight Distance</label>
                <div className="input-with-unit">
                  <input id="distance" type="number" name="distance" value={formData.distance} onChange={handleChange} placeholder="e.g. 760" min="1" required />
                  <span>mi</span>
                </div>
                <small>{originMeta && destMeta ? `Auto-calculated: ${distanceMiles(originMeta.code, destMeta.code)} mi` : 'Scheduled route distance'}</small>
              </div>
            </div>

            <datalist id="airport-list">
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>{a.city}, {a.state} — {a.name}</option>
              ))}
            </datalist>

            <div className="button-row">
              <button type="button" className="clear-button" onClick={handleClear}>Clear Form</button>
              <button type="submit" className="predict-button" disabled={loading}>
                {loading ? <><span className="loader"></span>Analysing Flight...</> : <><span className="button-plane">✈</span>Predict Flight Delay</>}
              </button>
            </div>
          </form>

          {/* Route weather + map preview (when airports are valid) */}
          {originMeta && destMeta && (
            <div className="live-context-wrap">
              <div className="context-note">
                <span>Live route context</span>
                <small>Weather is shown for user context only and is not an input to the trained model.</small>
              </div>
              <div className="live-context">
                <WeatherWidget originCode={originMeta.code} destinationCode={destMeta.code} />
                <RouteMap originCode={originMeta.code} destinationCode={destMeta.code} />
              </div>
            </div>
          )}

          {/* Skeleton loader */}
          {loading && <SkeletonResult />}

          {/* Error */}
          {error && !loading && (
            <div className="error-message">
              <div className="message-icon">!</div>
              <div><h3>Unable to Make Prediction</h3><p>{error}</p></div>
            </div>
          )}

          {/* Result as Boarding Pass */}
          {result && !loading && (
            <>
              <BoardingPass result={result} formData={formData} significantDelay={significantDelay} />

            

              {/* Result actions */}
              <div className="result-actions">
                <button className="action-btn" onClick={copySummary}>📋 Copy summary</button>
                <button className="action-btn" onClick={downloadReport}>📄 Download report</button>
                <button className="action-btn" onClick={shareLink}>🔗 Share link</button>
              </div>

              {/* Probability bar (kept for compatibility) */}
              {result.delay_probability !== undefined && (
                <div className="result-card">
                  <div className="probability-section">
                    <div className="probability-header">
                      <span>Estimated delay probability</span>
                      <strong>{Number(result.delay_probability).toFixed(2)}%</strong>
                    </div>
                    <div className="probability-track">
                      <div className="probability-fill" style={{ width: `${Math.min(Number(result.delay_probability), 100)}%` }}></div>
                    </div>
                    <div className="probability-scale"><span>0%</span><span>50%</span><span>100%</span></div>
                  </div>
                  <div className="result-note">
                    <span>i</span>
                    A significant delay is defined as a departure delay of 15 minutes or more.
                  </div>
                </div>
              )}
            </>
          )}
        </section>
        )}

        <footer>
          <div className="footer-flag"><span></span><span></span><span></span></div>
          <p>LibertyWing AI • January 2025 U.S. Flight Delay Intelligence</p>
          <small>
            Predictions are estimates based on patterns learned from historical
            flight data and should not be treated as guaranteed outcomes.
            Press <kbd>/</kbd> to jump to input · <kbd>Esc</kbd> to clear.
          </small>
        </footer>
      </main>
    </div>
  );
}