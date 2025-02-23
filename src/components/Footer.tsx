import styles from '../styles/components/Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span className={styles.footer_contact}>
                Contact: info@nosologic.org
            </span>
            <span className={styles.text_footer}>
                2025 Nosologic.org
            </span>
        </footer>
    )
}