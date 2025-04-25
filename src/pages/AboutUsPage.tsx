import styles from '../styles/pages/AboutUsPage.module.scss';
import RoleListSection from "../components/AboutUsPage/RoleListSection.tsx";

export default function AboutUsPage() {
    return (
        <main className={styles.about_page_ctr}>
            <span className={styles.page_title}>About us</span>
            <span className={styles.about_page_text}>Nosologic is a foundation based in Amsterdam, created in 2024.</span>
            <RoleListSection/>
        </main>
    )
}