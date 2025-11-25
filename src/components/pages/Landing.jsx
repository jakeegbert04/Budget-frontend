const Landing = () => {
  return (
    <div className="page-container">
      <div className="hero-wrapper">
        <div className="left-column">
          <h1>Take Control of Your Budget Today</h1>
          <p>
            Our budget app helps you manage multiple accounts, track expenses
            across various categories, and stay on top of your financial goals.
            Experience seamless budgeting with real-time transaction updates and
            insightful statistics.
          </p>
          <div className="button-wrapper">
            <button>Get Started</button>
            <button>Learn More</button>
          </div>
        </div>
        <img src="../../assets/images/calculator.png" alt="" />
      </div>
    </div>
  );
};

export default Landing;
