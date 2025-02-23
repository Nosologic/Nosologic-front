import styles from '../styles/pages/MissionPage.module.scss';
import {NavLink} from "react-router-dom";

export default function MissionPage() {

    return (
        <main className={styles.mission_page_ctr}>
            <div className={styles.title_ctr}>
                <span className={styles.nosologic_title}>NOSOLOGIC</span>
                <span className={styles.motto}>Introducing evolutionary health geography</span>
            </div>
            <div className={styles.mission_text_ctr}>
                <span className={styles.mission_label}>Our mission: </span>
                <span className={styles.page_text}>
                Nosologic is a foundation based in Amsterdam, created in 2024. It studies the causes of the geographical
                distribution of hereditary diseases. These causes are twofold. One type of cause involves evolutionary
                processes: these are the so-called ultimate causes, also called selective agents. The textbook example
                is the malaria parasite as a cause of the very common hereditary disease sickle cell anemia. Selective
                agents take many generations to act, and can shape the geographical distribution of the genes linked to
                a hereditary disease. By contrast, the second type, proximate causes, do not affect the distribution of
                these genes, but only whether carriers will be affected or not. The latter type of cause is much more
                recent, affecting patients directly in the course of their lives. You can read more about these two very
                different types of causal process on this website. The first example is about the ultimate cause of a
                very rare disease that occurs only in people of Cypriot descent:
                <NavLink to="/diseases/1" className={styles.mission_ref}> c3 glomerulonephritis</NavLink>. The second
                example is about the proximate causes of another rare disease, transthyretin amyloidosis, which shows
                a few very pronounced geographical foci in different parts of the world. Recently, two researchers have
                shown that these places have something in common. By investigating the ecological circumstances in some
                of its geographical foci, we find this generalization has good predictive value. If you’re interested,
                read more about the causes of
                <NavLink to="/diseases/2" className={styles.mission_ref}> transthyretin amyloidosis</NavLink>.
                <br/><br/>
                We intend to not only publish our findings in peer-reviewed scientific journals, but also to work
                towards diagnosis, prevention and translational research. Therefore, we want share our insights with
                everyone concerned. Do not hesitate to contact us.
                <br/><br/>

                </span>
                <span className={styles.mission_author}>
                    Valentijn van Dijk, scientific director Nosologic
                </span>
            </div>

        </main>

    )
}