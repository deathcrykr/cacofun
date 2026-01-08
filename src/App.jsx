import Hero from './components/Hero';
import GameShowcase from './components/GameShowcase';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import './components/AboutSection.css'; // Importing here to ensure load order if not modularized perfectly

function App() {
  return (
    <div className="app">
      <Hero />
      <GameShowcase />
      <AboutSection />
      <Footer />
    </div>
  );
}

export default App;
