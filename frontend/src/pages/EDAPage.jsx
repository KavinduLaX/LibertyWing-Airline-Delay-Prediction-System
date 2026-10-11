function StatCard({ value, label, note }) {
  return (
    <div className="eda-mini-stat">
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{note}</small>
    </div>
  );
}

function SimpleBar({ label, value, type = "blue" }) {
  return (
    <div className="simple-bar-row">
      <div className="simple-bar-top">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="simple-bar-track">
        <div
          className={`simple-bar-fill ${type}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function EDAPage() {
  return (
    <section className="eda-simple-page">

      {/* ================= HERO ================= */}
      <div className="eda-simple-hero">
        <span className="page-eyebrow">
          EXPLORATORY DATA ANALYSIS
        </span>

        <h1>What did we learn from the data?</h1>

        <p>
          January 2025 U.S. flight data was explored to understand
          delay patterns, data quality and the distribution of the
          prediction target.
        </p>
      </div>


      {/* ================= TOP STATS ================= */}
      <div className="eda-mini-grid">

        <StatCard
          value="539,747"
          label="Original Flights"
          note="January 2025"
        />

        <StatCard
          value="523,435"
          label="Clean Records"
          note="Used for modelling"
        />

        <StatCard
          value="18.23%"
          label="Significant Delays"
          note="Overall dataset"
        />

        <StatCard
          value="15+ min"
          label="Significant Delay"
          note="Prediction target"
        />

      </div>


      {/* ================= TARGET DISTRIBUTION ================= */}
      <div className="eda-simple-section">

        <div className="eda-section-title">
          <span>01</span>

          <div>
            <h2>Most flights were not significantly delayed</h2>
            <p>
              The target class was imbalanced, which influenced how
              the models were evaluated.
            </p>
          </div>
        </div>

        <div className="eda-chart-grid">

          {/* Donut chart */}
          <div className="eda-donut-card">

            <div className="eda-donut">
              <div className="eda-donut-center">
                <strong>18.23%</strong>
                <span>Delayed</span>
              </div>
            </div>

            <div className="donut-legend">
              <div>
                <span className="legend-dot no-delay"></span>
                No Significant Delay
                <strong>81.77%</strong>
              </div>

              <div>
                <span className="legend-dot delayed"></span>
                Significant Delay
                <strong>18.23%</strong>
              </div>
            </div>

          </div>


          {/* Key interpretation */}
          <div className="eda-highlight-card">

            <span className="eda-highlight-icon">!</span>

            <div>
              <span className="page-eyebrow">
                KEY INSIGHT
              </span>

              <h3>Accuracy alone could be misleading</h3>

              <p>
                Because significantly delayed flights were the minority,
                a model could predict mostly non-delayed flights and still
                appear accurate.
              </p>

              <div className="eda-metric-tags">
                <span>Precision</span>
                <span>Recall</span>
                <span>F1-score</span>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ================= CLEANING ================= */}
      <div className="eda-simple-section">

        <div className="eda-section-title">
          <span>02</span>

          <div>
            <h2>Data cleaning before modelling</h2>
            <p>
              Invalid or unsuitable records were removed before training.
            </p>
          </div>
        </div>

        <div className="eda-clean-flow">

          <div className="clean-step">
            <strong>539,747</strong>
            <span>Original records</span>
          </div>

          <div className="clean-arrow">→</div>

          <div className="clean-step">
            <strong>15,923</strong>
            <span>Missing DEP_DELAY identified</span>
          </div>

          <div className="clean-arrow">→</div>

          <div className="clean-step">
            <strong>1</strong>
            <span>Duplicate removed</span>
          </div>

          <div className="clean-arrow">→</div>

          <div className="clean-step final">
            <strong>523,435</strong>
            <span>Final modelling records</span>
          </div>

        </div>

        <div className="eda-note">
          Cancelled flights were also excluded because the project
          predicts departure delays for flights that actually operate.
        </div>

      </div>


      {/* ================= TRAIN TEST ================= */}
      <div className="eda-simple-section">

        <div className="eda-section-title">
          <span>03</span>

          <div>
            <h2>Chronological train and test split</h2>
            <p>
              Earlier January flights were used for training and later
              flights for evaluation.
            </p>
          </div>
        </div>

        <div className="timeline-bar">
          <div className="timeline-train">
            <strong>77.3%</strong>
            <span>1–24 January</span>
          </div>

          <div className="timeline-test">
            <strong>22.7%</strong>
            <span>25–31 January</span>
          </div>
        </div>

        <div className="timeline-details">

          <div>
            <span>Training</span>
            <strong>404,662 flights</strong>
            <small>20.22% significantly delayed</small>
          </div>

          <div>
            <span>Later Test Period</span>
            <strong>118,773 flights</strong>
            <small>11.46% significantly delayed</small>
          </div>

        </div>

      </div>


      {/* ================= CARRIER PATTERN ================= */}
      <div className="eda-simple-section">

        <div className="eda-section-title">
          <span>04</span>

          <div>
            <h2>Delay rates varied across carriers</h2>
            <p>
              Carrier information showed useful patterns in the January data.
            </p>
          </div>
        </div>

        <div className="eda-carrier-layout">

          <div className="eda-bars-box">

            <SimpleBar
              label="G4"
              value={23.57}
              type="purple"
            />

            <SimpleBar
              label="HA"
              value={11.37}
              type="cyan"
            />

          </div>

          <div className="eda-carrier-insight">
            <span>✦</span>

            <div>
              <strong>Carrier was useful as a predictor</strong>

              <p>
                G4 had an observed significant-delay rate of about
                23.57%, compared with about 11.37% for HA.
                These are associations, not evidence that an airline
                causes delays.
              </p>
            </div>
          </div>

        </div>

      </div>


      {/* ================= FEATURES ================= */}
      <div className="eda-simple-section last">

        <div className="eda-section-title">
          <span>05</span>

          <div>
            <h2>Final information used for prediction</h2>
            <p>
              Nine features were selected for the final modelling pipeline.
            </p>
          </div>
        </div>

        <div className="eda-feature-chips">
          <span>Carrier</span>
          <span>Origin</span>
          <span>Destination</span>
          <span>Departure Hour</span>
          <span>Arrival Hour</span>
          <span>Day of Week</span>
          <span>Weekend</span>
          <span>Flight Duration</span>
          <span>Distance</span>
        </div>

        <div className="eda-leakage-note">
          <strong>DEP_DELAY was not used as an input.</strong>
          <span>
            It represents the outcome being predicted and would not be
            available before departure.
          </span>
        </div>

      </div>

    </section>
  );
}

export default EDAPage;