import styles from '../styles/components/Header.module.scss';
import logo from '../assets/logo no bg.png'
import {NavLink} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";


export default function Header() {
    const setActive = ({ isActive }: { isActive: boolean }) =>
        isActive ? styles.active : styles.nav_link;

    return (
        <header className={styles.header_ctr}>
            <img src={logo} alt="Nosologic" className={styles.logo}/>
            <div className={styles.header_content}>
                <ul className={styles.navigation_buttons}>
                    <li className={styles.navigation_btn}>
                        <NavLink to="/" className={setActive}>
                            Home
                        </NavLink>
                    </li>
                    <li className={styles.navigation_btn}>
                        <NavLink to="/diseases" className={setActive}>
                            Diseases
                        </NavLink>
                    </li>
                    <li className={styles.navigation_btn}>
                        <NavLink to="/about" className={setActive}>
                            About
                        </NavLink>
                    </li>
                    <li className={styles.navigation_btn}>
                        <NavLink to="/blog" className={setActive}>
                            Blog
                        </NavLink>
                    </li>
                </ul>


                <div className={styles.search_container}>
                    <AiOutlineSearch className={styles.search_icon} />
                    <input
                        type="text"
                        className={styles.search_input}
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </div>


            </div>
        </header>
    )
}