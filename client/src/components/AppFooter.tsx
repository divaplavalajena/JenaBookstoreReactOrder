import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter(){
return (
    <footer className="footer-container">
        <section className="footer-copyright">
            <img
                src={require("../assets/images/site/copyright-book-nook.png")}
                alt="copyright symbol"
                width="21px"
                height="21px"
            />
            <p>2024 Book Nook All Rights Reserved</p>
        </section>
        <section className="footer-icon-content">
            <section className="social-media-icons">
                <Link to="/" className="smButton">
                    <img src={require("../assets/images/site/facebook-icon-book-nook.png")}
                         alt={"facebook icon"}/>
                </Link>
                <Link to="/" className="smButton">
                    <img src={require("../assets/images/site/twitter-icon-book-nook.png")}
                         alt={"X icon"}/>
                </Link>
            </section>
            <img
                src={require("../assets/images/site/Book-Nook-Logo-No-Words.png")}
                alt="Book Nook Logo No Words"
                width="100px"
                height="64px"
            />
        </section>
        <section className="links">
            <Link to="/" className="button">Contact</Link>
            <Link to="/" className="button">Directions</Link>
        </section>
    </footer>
)
}

export default AppFooter;
