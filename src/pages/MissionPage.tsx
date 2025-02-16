import styles from '../styles/pages/MissionPage.module.scss';
import missionText from '../assets/mission.txt';

export default function MissionPage() {
    return (
        <main className={styles.mission_page_ctr}>
            <span className={styles.page_title}>Our mission</span>
            <span className={styles.page_text}>
                {missionText}
            </span>
        </main>

    )
}