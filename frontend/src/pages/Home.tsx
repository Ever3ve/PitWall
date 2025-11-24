import "../styles/global.css";
import "../styles/home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <div className="home-card">
          <h2>card 1</h2>
          <p>info about smth</p>
        </div>

        <div className="home-card">
          <h2>card 2</h2>
          <p>info about smth</p>
        </div>
      </main>
    </div>
  );
};
