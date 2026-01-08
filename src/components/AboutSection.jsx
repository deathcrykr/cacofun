const AboutSection = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-content text-center">
                    <h2 className="section-title">We Are <span className="highlight-alt">Caco Fun</span></h2>
                    <p className="about-text">
                        We are a team of dreamers, artists, and engineers dedicated to creating games that bring joy to the world.
                        Beloved by millions, our characters transcend the screen and become part of your life.
                    </p>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">50M+</span>
                            <span className="stat-label">Downloads</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">4.8</span>
                            <span className="stat-label">App Store Rating</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">150+</span>
                            <span className="stat-label">Countries</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
