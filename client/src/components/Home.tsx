
import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css'
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <div className="home-page">
                <div className="row">
                    <div className="column">
                        <section className="welcome-text flow-content container dark-background">
                            <h2>Welcome to Book Nook!</h2>
                            <p>
                                Browse and discover new tomes to expand your world.
                            </p>
                        </section>
                        <section className="category-images container">
                            <div className="category-image-items">
                                <HomeCategoryList />
                            </div>
                        </section>
                    </div>
                    <div className="shop-now">
                        <h1>
                            <Link to={`/categories/SciFi`}>
                                <button className="shop-now-button">Shop Now</button>
                            </Link>
                        </h1>
                    </div>
                    <div className="column">
                        <div className="offer-banner">
                            <img
                                src={require("../assets/images/site/It's-Sci-Fi-and-Fantasy-Month.png")}
                                alt="Curved Text It's Sci-Fi and Fantasy Month"
                                width="500px"
                                height="500px"
                            />
                        </div>
                        <div className="offer-tag">
                            <img
                                src={require("../assets/images/site/Sci-Fi-and-Fantasy-Titles-40-off.png")}
                                alt="Sci-Fi and Fantasy Titles 40 % off stamp"
                                width="300px"
                                height="300px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
