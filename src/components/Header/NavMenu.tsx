import styles from "../../styles/components/Header/NavMenu.module.scss";
import {NavLink} from "react-router-dom";

interface NavMenuProps {
    close?: () => void;
}

export default function NavMenu({close} : Readonly<NavMenuProps>) {

    const setActive = ({ isActive }: { isActive: boolean }) =>
        isActive ? styles.active : styles.nav_link;


    return (
        <nav className={styles.header_nav_menu}>
            <ul className={styles.navigation_buttons}>
                <li className={styles.navigation_btn}>
                    <NavLink to="/home" className={setActive} onClick={close}>
                        Home
                    </NavLink>
                </li>
                <li className={styles.navigation_btn}>
                    <NavLink to="/diseases" className={setActive} onClick={close}>
                        Diseases
                    </NavLink>
                </li>
                <li className={styles.navigation_btn}>
                    <NavLink to="/about" className={setActive} onClick={close}>
                        About
                    </NavLink>
                </li>
                <li className={styles.navigation_btn}>
                    <NavLink to="/blog" className={setActive} onClick={close}>
                        Blog
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}