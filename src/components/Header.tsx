import {useState} from "react";
import styles from "../styles/components/Header.module.scss";
import logo from "../assets/logo no bg.png";
import { NavLink } from "react-router-dom";
import CustomSearch from "./UIKit/CustomSearch.tsx";
import MobileNavigationOverlay from "./MobileNavigationOverlay.tsx";
import NavMenu from "./Header/NavMenu.tsx";
import {useIsMobile} from "../hooks/useIsMobile.tsx";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isMobile = useIsMobile();

    const toggleMenu = () => {

        setIsMenuOpen(!isMenuOpen);
    };

    const displayHeaderMenu = () => {
        if (!isMobile) {
            return <NavMenu />;
        } else if (isMenuOpen) {
            return <MobileNavigationOverlay isOpen={isMenuOpen} onClose={toggleMenu}/>;
        }
    }

    return (
        <header className={styles.header_ctr}>
            <div className={styles.header_content}>
                <div className={styles.header_content_nav}>
                    <NavLink to="/">
                        <img src={logo} alt="Nosologic" className={styles.logo} />
                    </NavLink>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.menu_btn}
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>

                    { displayHeaderMenu() }
                </div>

                <div className={styles.header_content_search_login} >
                    <CustomSearch id={styles.header_search} />

                    <button className={styles.sign_in_btn}>Sign in</button>
                    <button className={styles.sign_up_btn}>Sign up</button>
                </div>
            </div>
        </header>
    );
}