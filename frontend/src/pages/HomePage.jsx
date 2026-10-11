function HomePage({ onOpenPrediction, onOpenEDA }) {
  return (
    <section className="page-panel home-page">

      {/* ================= HERO ================= */}
      <div className="home-hero home-hero-animated">

        {/* Animated aviation background */}
        <div className="hero-map-grid" aria-hidden="true"></div>
        <div className="hero-map-shape" aria-hidden="true"></div>
        <div className="hero-radar" aria-hidden="true"></div>

        {/* Flight paths */}
        <div className="map-path map-path-1" aria-hidden="true"></div>
        <div className="map-path map-path-2" aria-hidden="true"></div>
        <div className="map-path map-path-3" aria-hidden="true"></div>

        {/* Moving aircraft */}
        <div className="map-plane map-plane-1" aria-hidden="true">
          ✈
        </div>

        <div className="map-plane map-plane-2" aria-hidden="true">
          ✈
        </div>

        <div className="map-plane map-plane-3" aria-hidden="true">
          ✈
        </div>

        {/* Airport markers */}
        <div
          className="map-airport airport-1"
          aria-hidden="true"
        ></div>

        <div
          className="map-airport airport-2"
          aria-hidden="true"
        ></div>

        <div
          className="map-airport airport-3"
          aria-hidden="true"
        ></div>

        <div
          className="map-airport airport-4"
          aria-hidden="true"
        ></div>


        {/* ================= LEFT CONTENT ================= */}
        <div className="home-hero-content">

          <span className="page-eyebrow">
            LIBERTYWING AI • FLIGHT DELAY INTELLIGENCE
          </span>

          <h1>
            Understand delay risk
            <span> before departure.</span>
          </h1>

          <p>
            LibertyWing AI uses patterns learned from historical U.S.
            flight data to estimate whether a scheduled flight may
            experience a significant departure delay of 15 minutes
            or more.
          </p>

          <div className="home-actions">

            <button
              type="button"
              className="home-primary-btn"
              onClick={onOpenPrediction}
            >
              ✈ Make a Prediction
            </button>

            <button
              type="button"
              className="home-secondary-btn"
              onClick={onOpenEDA}
            >
              View Data Insights
            </button>

          </div>
        </div>


        {/* ================= RIGHT VISUAL ================= */}
        <div className="home-hero-side">

          <div className="home-air-status">
            <span className="status-light"></span>
            AVIATION INTELLIGENCE
          </div>

          <div className="home-flight-symbol">
            ✈
          </div>

        </div>

      </div>


      {/* ================= DATA SUMMARY ================= */}
      <div className="home-stat-grid">

        <div className="home-stat-card">
          <span className="home-stat-number">
            539,747
          </span>

          <strong>
            Original Flight Records
          </strong>

          <p>
            January 2025 U.S. flight data from BTS.
          </p>
        </div>


        <div className="home-stat-card">

          <span className="home-stat-number">
            523,435
          </span>

          <strong>
            Records After Cleaning
          </strong>

          <p>
            Operating flights with usable departure-delay
            information.
          </p>

        </div>


        <div className="home-stat-card">

          <span className="home-stat-number">
            15+ min
          </span>

          <strong>
            Significant Delay
          </strong>

          <p>
            Flights delayed by at least 15 minutes are treated
            as significantly delayed.
          </p>

        </div>


        <div className="home-stat-card">

          <span className="home-stat-number">
            23.59%
          </span>

          <strong>
            Final F1-score
          </strong>

          <p>
            Highest F1-score among the four machine-learning
            approaches tested.
          </p>

        </div>

      </div>


      {/* ================= BUSINESS PROBLEM ================= */}
      <div className="home-section-heading">

        <span className="page-eyebrow">
          THE BUSINESS PROBLEM
        </span>

        <h2>
          Why does departure-delay prediction matter?
        </h2>

        <p>
          Flight delays affect passengers, airline schedules,
          airport operations, connecting flights and operational
          planning.
        </p>

      </div>


      {/* ================= BUSINESS VALUE ================= */}
      <div className="business-value-grid">

        <div className="business-card">

          <span className="business-icon">
            ◷
          </span>

          <h3>
            Earlier Awareness
          </h3>

          <p>
            Identify flights that may have increased historical
            delay risk before departure.
          </p>

        </div>


        <div className="business-card">

          <span className="business-icon">
            ◎
          </span>

          <h3>
            Decision Support
          </h3>

          <p>
            Provide an additional risk signal that can support
            operational planning.
          </p>

        </div>


        <div className="business-card">

          <span className="business-icon">
            ✦
          </span>

          <h3>
            Simple Experience
          </h3>

          <p>
            Users enter normal flight details and receive an
            understandable prediction and estimated delay probability.
          </p>

        </div>

      </div>


      {/* ================= FINAL MODEL ================= */}
      <div className="home-model-banner">

        <div>

          <span className="page-eyebrow">
            FINAL SOLUTION
          </span>

          <h2>
            Gradient Boosting with balanced sample weights
          </h2>

          <p>
            The model was selected using F1-score as the primary
            comparison metric because significantly delayed flights
            were the minority class.
          </p>

        </div>


        <div className="home-model-metrics">

          <div>
            <span>Precision</span>
            <strong>14.67%</strong>
          </div>

          <div>
            <span>Recall</span>
            <strong>60.05%</strong>
          </div>

          <div>
            <span>F1-score</span>
            <strong>23.59%</strong>
          </div>

        </div>

      </div>


      {/* ================= DISCLAIMER ================= */}
      <div className="home-disclaimer">

        <span>i</span>

        <p>
          LibertyWing AI is a decision-support prototype based on
          historical patterns. It should not be treated as a
          guaranteed prediction of future flight delays.
        </p>

      </div>

    </section>
  );
}

export default HomePage;