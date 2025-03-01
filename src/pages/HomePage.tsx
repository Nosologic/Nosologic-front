import styles from '../styles/pages/HomePage.module.scss';
import HomePageCard from "../components/HomePage/HomePageCard.tsx";

export default function HomePage() {
    return (
       <main className={styles.home_page_ctr}>
           <div className={styles.qa_section}>
               <span className={styles.page_subtitle}>Diseases</span>
           </div>
           <div className={styles.qa_section}>
               <span className={styles.page_subtitle}>Clusters</span>
           </div>
           <div className={styles.qa_section}>
               <span className={styles.page_subtitle}>Blogs</span>
               <div className={styles.qa_cards_ctr}>
                   <HomePageCard/>
               </div>
           </div>
       </main>
    )
}