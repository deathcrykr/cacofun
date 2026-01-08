import './GameShowcase.css';
import game1 from '../assets/game_thumb_1.png';
import game2 from '../assets/game_thumb_2.png';
import game3 from '../assets/game_thumb_3.png';

const games = [
    {
        id: 1,
        title: "Caco World",
        description: "Build, explore, and create your own adventures in a blocky paradise.",
        image: game1,
        color: "#ffca28"
    },
    {
        id: 2,
        title: "Caco Legends",
        description: "Embark on an epic journey to save the realm in this action RPG.",
        image: game2,
        color: "#7b1fa2"
    },
    {
        id: 3,
        title: "Caco Pets",
        description: "Adopt, care for, and play with the cutest fluffy friends.",
        image: game3,
        color: "#4caf50"
    }
];

const GameShowcase = () => {
    return (
        <section id="games" className="section game-showcase">
            <div className="container">
                <h2 className="section-title text-center">Our <span className="gradient-text">Hit Games</span></h2>
                <p className="section-subtitle text-center">Played by millions of fans worldwide.</p>

                <div className="games-grid">
                    {games.map(game => (
                        <div key={game.id} className="game-card">
                            <div className="game-image-wrapper">
                                <img src={game.image} alt={game.title} className="game-image" />
                                <div className="game-overlay">
                                    <button className="btn btn-primary">Play Now</button>
                                </div>
                            </div>
                            <div className="game-info">
                                <h3 className="game-title">{game.title}</h3>
                                <p className="game-desc">{game.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GameShowcase;
