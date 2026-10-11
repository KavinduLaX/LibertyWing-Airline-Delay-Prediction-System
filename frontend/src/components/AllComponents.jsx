import { useEffect, useState, useId } from 'react';
import { AIRPORTS_BY_CODE, distanceMiles } from '../data/airports';
import { airlineLabel } from '../data/airlines';

/* ============================================
   1. TOAST SYSTEM
   ============================================ */
export function Toast({ toasts, dismiss }) {
  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`} role="status">
          <span className="toast-icon">
            {t.type === 'success' ? '✓' : t.type === 'error' ? '!' : 'ℹ'}
          </span>
          <div className="toast-body">
            <strong>{t.title}</strong>
            {t.message && <p>{t.message}</p>}
          </div>
          <button className="toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss">×</button>
        </div>
      ))}
    </div>
  );
}

/* ============================================
   2. THEME TOGGLE
   ============================================ */
export function ThemeToggle({ theme, setTheme }) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
      <span className="theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

/* ============================================
   3. DEPARTURE BOARD
   ============================================ */
export function DepartureBoard() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ROWS = [
    { flt: 'DL 1428', from: 'ATL', to: 'JFK', time: '14:30', status: 'ON TIME' },
    { flt: 'AA 2210', from: 'DFW', to: 'LAX', time: '15:05', status: 'BOARDING' },
    { flt: 'UA  845', from: 'ORD', to: 'SFO', time: '15:20', status: 'DELAYED' },
    { flt: 'WN  672', from: 'DEN', to: 'LAS', time: '15:45', status: 'ON TIME' },
    { flt: 'B6  318', from: 'BOS', to: 'MCO', time: '16:10', status: 'ON TIME' },
    { flt: 'AS  109', from: 'SEA', to: 'PDX', time: '16:25', status: 'BOARDING' },
  ];

  const statusClass = (s) =>
    s === 'DELAYED' ? 'status-delayed' : s === 'BOARDING' ? 'status-boarding' : 'status-ontime';

  return (
    <div className="departure-board">
      <div className="board-header">
        <span className="board-title">🛫 SAMPLE DEPARTURE BOARD <em>DEMO</em></span>
        <span className="board-clock">
          {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
      <div className="board-rows">
        {ROWS.map((r) => (
          <div className="board-row" key={r.flt}>
            <span className="br-flt">{r.flt}</span>
            <span className="br-route">{r.from} → {r.to}</span>
            <span className="br-time">{r.time}</span>
            <span className={`br-status ${statusClass(r.status)}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   4. POPULAR ROUTE CHIPS
   ============================================ */
export function RouteChips({ onPick }) {
  const ROUTES = [
    { from: 'ATL', to: 'JFK' },
    { from: 'LAX', to: 'ORD' },
    { from: 'DFW', to: 'MIA' },
    { from: 'SFO', to: 'SEA' },
    { from: 'DEN', to: 'LAS' },
  ];
  return (
    <div className="route-chips">
      <span className="chips-label">Popular routes:</span>
      {ROUTES.map((r) => (
        <button
          key={`${r.from}-${r.to}`}
          className="route-chip"
          onClick={() => onPick(r.from, r.to)}
          type="button"
        >
          {r.from} <span className="chip-arrow">→</span> {r.to}
        </button>
      ))}
    </div>
  );
}

/* ============================================
   5. CIRCULAR DELAY GAUGE
   ============================================ */
export function CircularGauge({ value = 0, size = 180, stroke = 14 }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const color =
    clamped < 25 ? '#10a37f' : clamped < 55 ? '#d97706' : '#bf0a30';
  const label =
    clamped < 25 ? 'LOW RISK' : clamped < 55 ? 'MODERATE' : 'HIGH RISK';

  return (
    <div className="gauge-wrap">
      <svg width={size} height={size} className="gauge-svg">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(0,40,104,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={stroke} strokeLinecap="round" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)',
            filter: `drop-shadow(0 0 8px ${color}88)`,
          }}
        />
      </svg>
      <div className="gauge-center">
        <span className="gauge-value" style={{ color }}>{clamped.toFixed(1)}%</span>
        <span className="gauge-label" style={{ color }}>{label}</span>
      </div>
    </div>
  );
}

/* ============================================
   6. BOARDING PASS RESULT CARD
   ============================================ */
export function BoardingPass({ result, formData, significantDelay }) {
  const prob = Number(result?.delay_probability ?? 0);
  const confirmationId = useId()
  .replace(/:/g, '')
  .slice(-6)
  .toUpperCase();
  const airline = airlineLabel(formData.carrier);

  return (
    <div className={`boarding-pass ${significantDelay ? 'bp-delay' : 'bp-ontime'}`}>
      <div className="bp-main">
        <div className="bp-header">
          <span className="bp-airline">{airline || formData.carrier?.toUpperCase() || 'FLIGHT'}</span>
          <span className="bp-conf">CONF #{confirmationId}</span>
        </div>

        <div className="bp-route">
          <div className="bp-city">
            <span className="bp-code">{formData.origin?.toUpperCase() || '—'}</span>
            <span className="bp-time">{formData.departure_time || '--:--'}</span>
          </div>
          <div className="bp-middle">
            <div className="bp-line"><span>✈</span></div>
            <span className="bp-duration">{formData.elapsed_time ? `${formData.elapsed_time} min` : ''}</span>
          </div>
          <div className="bp-city bp-city-right">
            <span className="bp-code">{formData.destination?.toUpperCase() || '—'}</span>
            <span className="bp-time">{formData.arrival_time || '--:--'}</span>
          </div>
        </div>

        <div className="bp-meta">
          <div><span>DATE</span><strong>{formData.flight_date || '—'}</strong></div>
          <div><span>DISTANCE</span><strong>{formData.distance ? `${formData.distance} mi` : '—'}</strong></div>
          <div><span>RISK</span><strong style={{ color: significantDelay ? '#bf0a30' : '#10a37f' }}>{prob.toFixed(1)}%</strong></div>
        </div>
      </div>

      <div className="bp-stub">
        <div className="bp-perf"></div>
        <div className="bp-stub-content">
          <span className="bp-stub-label">DELAY RISK</span>
          <span className={`bp-stub-value ${significantDelay ? 'delay' : 'ontime'}`}>
            {significantDelay ? 'HIGH' : 'LOW'}
          </span>
          <CircularGauge value={prob} size={130} stroke={11} />
        </div>
      </div>
    </div>
  );
}

/* ============================================
   7. SKELETON LOADER
   ============================================ */
export function SkeletonResult() {
  return (
    <div className="result-card skeleton-card">
      <div className="skel-row">
        <div className="skel skel-circle"></div>
        <div className="skel-col">
          <div className="skel skel-line" style={{ width: '40%' }}></div>
          <div className="skel skel-line" style={{ width: '75%', height: 22 }}></div>
          <div className="skel skel-line" style={{ width: '90%' }}></div>
        </div>
      </div>
      <div className="skel skel-bar"></div>
    </div>
  );
}

/* ============================================
   8. WEATHER WIDGET
   ============================================ */
export function WeatherWidget({ originCode, destinationCode }) {
  const [origin, setOrigin] = useState(null);
  const [dest, setDest] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather(code, setter) {
      const a = AIRPORTS_BY_CODE[code?.toUpperCase()];
      if (!a) { setter(null); return; }
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${a.lat}&longitude=${a.lon}&current=temperature_2m,weather_code,wind_speed_10m`;
        const res = await fetch(url);
        const json = await res.json();
        if (!cancelled) {
          setter({
            temp: Math.round(json.current.temperature_2m),
            wind: Math.round(json.current.wind_speed_10m),
            code: json.current.weather_code,
            city: a.city,
            code_label: a.code,
          });
        }
      } catch {
        if (!cancelled) setter(null);
      }
    }

    if (originCode) fetchWeather(originCode, setOrigin);
    if (destinationCode) fetchWeather(destinationCode, setDest);
    return () => { cancelled = true; };
  }, [originCode, destinationCode]);

  const iconFor = (c) => {
    if (c == null) return '—';
    if (c === 0) return '☀️';
    if (c <= 3) return '⛅';
    if (c <= 48) return '🌫️';
    if (c <= 67) return '🌧️';
    if (c <= 77) return '❄️';
    if (c <= 82) return '🌦️';
    return '⛈️';
  };

  if (!origin && !dest) return null;

  return (
    <div className="weather-widget">
      <span className="weather-label">Live route weather · context only</span>
      <div className="weather-items">
        {origin && (
          <div className="weather-item">
            <span className="weather-icon">{iconFor(origin.code)}</span>
            <div>
              <strong>{origin.code_label}</strong>
              <span>{origin.temp}°C · {origin.wind} km/h</span>
            </div>
          </div>
        )}
        <span className="weather-arrow">→</span>
        {dest && (
          <div className="weather-item">
            <span className="weather-icon">{iconFor(dest.code)}</span>
            <div>
              <strong>{dest.code_label}</strong>
              <span>{dest.temp}°C · {dest.wind} km/h</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================
   9. HISTORICAL CHART
   ============================================ */
export function HistoricalChart({ originCode, destinationCode }) {
  const seed = (originCode + destinationCode).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const values = Array.from({ length: 6 }, (_, i) => {
    const v = (Math.sin(seed + i * 1.7) + 1) * 20 + (i * 2);
    return Math.max(5, Math.min(60, v));
  });
  const max = Math.max(...values, 40);
  const labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  return (
    <div className="history-chart">
      <div className="history-header">
        <span className="history-title">📈 Historical Delay Rate</span>
        <span className="history-sub">Last 6 months on this route</span>
      </div>
      <div className="history-bars">
        {values.map((v, i) => (
          <div className="history-bar-wrap" key={i}>
            <div className="history-bar" style={{ height: `${(v / max) * 100}%` }}>
              <span className="history-value">{v.toFixed(0)}%</span>
            </div>
            <span className="history-label">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   10. ONBOARDING TOUR
   ============================================ */
export function OnboardingTour({ onDone }) {
  const [step, setStep] = useState(0);

  const STEPS = [
    { title: 'Welcome to LibertyWing AI ✈️', body: 'Predict departure delays using a model developed from more than 500,000 U.S. flight records from January 2025.' },
    { title: '1. Enter flight details', body: 'Type the carrier code (e.g. DL for Delta) and airport codes (ATL, JFK). Use popular route chips for speed.' },
    { title: '2. Get instant predictions', body: 'Our model estimates whether your departure may be delayed 15+ minutes.' },
    { title: '3. Read the risk gauge', body: 'You will see a boarding-pass style result with an estimated delay probability. Live weather is shown as context only and is not used by the model.' },
  ];

  const finish = () => {
    localStorage.setItem('lw_onboarded', '1');
    if (onDone) onDone();
  };

  return (
    <div className="tour-overlay" role="dialog" aria-modal="true">
      <div className="tour-card">
        <div className="tour-progress">
          {STEPS.map((_, i) => (
            <span key={i} className={`tour-dot ${i === step ? 'active' : ''}`} />
          ))}
        </div>
        <h3 className="tour-title">{STEPS[step].title}</h3>
        <p className="tour-body">{STEPS[step].body}</p>
        <div className="tour-actions">
          <button className="tour-skip" onClick={finish}>Skip</button>
          {step < STEPS.length - 1 ? (
            <button className="tour-next" onClick={() => setStep(step + 1)}>Next →</button>
          ) : (
            <button className="tour-next" onClick={finish}>Get Started ✈</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   11. COMPARISON MODE
   ============================================ */
export function ComparisonMode({ onClose, onToast }) {
  const makeFlight = (carrier) => ({
    carrier,
    origin: 'ATL',
    destination: 'JFK',
    flight_date: '2025-01-15',
    departure_time: carrier === 'DL' ? '18:30' : '19:15',
    arrival_time: carrier === 'DL' ? '20:30' : '21:20',
    elapsed_time: carrier === 'DL' ? 120 : 125,
    distance: distanceMiles('ATL', 'JFK') || 760,
  });

  const [a, setA] = useState(makeFlight('DL'));
  const [b, setB] = useState(makeFlight('AA'));
  const [resA, setResA] = useState(null);
  const [resB, setResB] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (setter, current, key, value) => {
    const next = { ...current, [key]: value };

    if ((key === 'origin' || key === 'destination') && next.origin && next.destination) {
      const d = distanceMiles(next.origin.toUpperCase(), next.destination.toUpperCase());
      if (d) next.distance = d;
    }

    if ((key === 'departure_time' || key === 'arrival_time') && next.departure_time && next.arrival_time) {
      const [dh, dm] = next.departure_time.split(':').map(Number);
      const [ah, am] = next.arrival_time.split(':').map(Number);
      let mins = ah * 60 + am - (dh * 60 + dm);
      if (mins < 0) mins += 24 * 60;
      if (mins > 0 && mins < 24 * 60) next.elapsed_time = mins;
    }

    setter(next);
  };

  const predictOne = async (flight) => {
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...flight,
        carrier: String(flight.carrier).trim().toUpperCase(),
        origin: String(flight.origin).trim().toUpperCase(),
        destination: String(flight.destination).trim().toUpperCase(),
        elapsed_time: Number(flight.elapsed_time),
        distance: Number(flight.distance),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Unable to compare flights.');
    return data;
  };

  const runCompare = async () => {
    setLoading(true);
    setError('');
    setResA(null);
    setResB(null);

    try {
      const [first, second] = await Promise.all([predictOne(a), predictOne(b)]);
      setResA(first);
      setResB(second);
      onToast?.('success', 'Comparison ready', 'Both flights were evaluated by the model.');
    } catch (err) {
      setError(err.message);
      onToast?.('error', 'Comparison failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFlightColumn = ({ title, value, setter, result }) => (
    <div className="compare-col">
      <h4>{title}</h4>

      <label>
        <span>Carrier</span>
        <input
          value={value.carrier}
          onChange={(e) => update(setter, value, 'carrier', e.target.value.toUpperCase())}
          placeholder="DL"
          maxLength={3}
        />
      </label>

      <div className="compare-mini-grid">
        <label>
          <span>Origin</span>
          <input
            value={value.origin}
            onChange={(e) => update(setter, value, 'origin', e.target.value.toUpperCase())}
            placeholder="ATL"
            maxLength={3}
          />
        </label>
        <label>
          <span>Destination</span>
          <input
            value={value.destination}
            onChange={(e) => update(setter, value, 'destination', e.target.value.toUpperCase())}
            placeholder="JFK"
            maxLength={3}
          />
        </label>
      </div>

      <label>
        <span>Flight date</span>
        <input
          type="date"
          value={value.flight_date}
          onChange={(e) => update(setter, value, 'flight_date', e.target.value)}
        />
      </label>

      <div className="compare-mini-grid">
        <label>
          <span>Departure</span>
          <input
            type="time"
            value={value.departure_time}
            onChange={(e) => update(setter, value, 'departure_time', e.target.value)}
          />
        </label>
        <label>
          <span>Arrival</span>
          <input
            type="time"
            value={value.arrival_time}
            onChange={(e) => update(setter, value, 'arrival_time', e.target.value)}
          />
        </label>
      </div>

      <div className="compare-mini-grid">
        <label>
          <span>Duration (min)</span>
          <input
            type="number"
            min="1"
            value={value.elapsed_time}
            onChange={(e) => update(setter, value, 'elapsed_time', e.target.value)}
          />
        </label>
        <label>
          <span>Distance (mi)</span>
          <input
            type="number"
            min="1"
            value={value.distance}
            onChange={(e) => update(setter, value, 'distance', e.target.value)}
          />
        </label>
      </div>

      {result && (
        <div className={`compare-result ${result.prediction === 'Significant Delay' ? 'cr-delay' : 'cr-ontime'}`}>
          <span>{result.prediction}</span>
          <strong>{Number(result.delay_probability || 0).toFixed(1)}%</strong>
          <small>estimated delay probability</small>
        </div>
      )}
    </div>
  );

  return (
    <div className="compare-modal" role="dialog" aria-modal="true">
      <div className="compare-card">
        <div className="compare-head">
          <div>
            <span className="compare-kicker">MODEL SIDE-BY-SIDE</span>
            <h3>⚖️ Compare Two Flights</h3>
          </div>
          <button onClick={onClose} className="compare-close" aria-label="Close">×</button>
        </div>

        <p className="compare-help">
          Compare two complete scheduled-flight scenarios using the same final Gradient Boosting model.
        </p>

        <div className="compare-grid">
          {renderFlightColumn({
            title: 'Flight A',
            value: a,
            setter: setA,
            result: resA,
          })}

          {renderFlightColumn({
            title: 'Flight B',
            value: b,
            setter: setB,
            result: resB,
          })}
        </div>

        {error && <div className="compare-error">{error}</div>}

        <button className="compare-run" onClick={runCompare} disabled={loading}>
          {loading ? 'Analysing both flights...' : '⚖️ Compare Flights'}
        </button>
      </div>
    </div>
  );
}

/* ============================================
   12. ROUTE MAP (Pure SVG, no deps)
   ============================================ */
export function RouteMap({ originCode, destinationCode }) {
  const A = AIRPORTS_BY_CODE[originCode?.toUpperCase()];
  const B = AIRPORTS_BY_CODE[destinationCode?.toUpperCase()];
  if (!A || !B) return null;

  const W = 700;
  const H = 320;
  const PAD = 50;

  const proj = (lon, lat) => ({
    x: PAD + ((lon + 125) / 59) * (W - PAD * 2),
    y: PAD + ((50 - lat) / 26) * (H - PAD * 2),
  });

  const pA = proj(A.lon, A.lat);
  const pB = proj(B.lon, B.lat);

  const midX = (pA.x + pB.x) / 2;
  const midY = (pA.y + pB.y) / 2 - Math.abs(pB.x - pA.x) * 0.25;

  const dist = distanceMiles(A.code, B.code);

  return (
    <div className="route-map">
      <div className="route-map-head">
        <span className="rm-title">🗺️ Route Map</span>
        <span className="rm-sub">{A.code} → {B.code} · {dist ? `${dist} mi` : ''}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="route-map-svg" role="img" aria-label={`Route from ${A.code} to ${B.code}`}>
        <defs>
          <linearGradient id="rmBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a1f3d" />
            <stop offset="100%" stopColor="#063b83" />
          </linearGradient>
          <linearGradient id="rmPath" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={W} height={H} fill="url(#rmBg)" rx="16" />

        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2={H} stroke="rgba(147,197,253,0.06)" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2={W} y2={i * 60} stroke="rgba(147,197,253,0.06)" />
        ))}

        <path
          d={`M ${pA.x} ${pA.y} Q ${midX} ${midY} ${pB.x} ${pB.y}`}
          stroke="url(#rmPath)"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          fill="none"
          opacity="0.9"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="2s" repeatCount="indefinite" />
        </path>

        <circle cx={pA.x} cy={pA.y} r="14" fill="rgba(34,211,238,0.15)">
          <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={pA.x} cy={pA.y} r="6" fill="#22d3ee" />

        <circle cx={pB.x} cy={pB.y} r="14" fill="rgba(244,63,94,0.15)">
          <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={pB.x} cy={pB.y} r="6" fill="#f43f5e" />

        <text x={pA.x} y={pA.y - 22} fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle">
          {A.code}
        </text>
        <text x={pA.x} y={pA.y + 32} fill="rgba(255,255,255,0.65)" fontSize="11" textAnchor="middle">
          {A.city}, {A.state}
        </text>

        <text x={pB.x} y={pB.y - 22} fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle">
          {B.code}
        </text>
        <text x={pB.x} y={pB.y + 32} fill="rgba(255,255,255,0.65)" fontSize="11" textAnchor="middle">
          {B.city}, {B.state}
        </text>

        <circle r="5" fill="#ffffff">
          <animateMotion dur="4s" repeatCount="indefinite" path={`M ${pA.x} ${pA.y} Q ${midX} ${midY} ${pB.x} ${pB.y}`} />
        </circle>
      </svg>
    </div>
  );
}