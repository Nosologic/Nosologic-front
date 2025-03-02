import styles from '../styles/pages/HomePage.module.scss';
import HomePageCard from "../components/HomePage/HomePageCard.tsx";
import diseases from "../assets/Diseases.ts";

export default function HomePage() {
    return (
       <main className={styles.home_page_ctr}>
           <div className={styles.qa_section}>
               <span className={styles.page_subtitle}>Diseases</span>
               {diseases
                   .filter( (dis) => dis.visibility)
                   .map( (dis) => (
                   <HomePageCard key={dis.id} name={dis.name} purpose={"disease"}
                                 locations_number={dis.locations.length} locus_number={dis.table_data.locus.length}/>
               ))}
           </div>
           <div className={styles.qa_section}>
               <span className={styles.page_subtitle}>Clusters</span>
           </div>
           <div className={styles.qa_section}>
               <span className={styles.page_subtitle}>Blogs</span>
               <div className={styles.qa_cards_ctr}>

               </div>
           </div>
       </main>
    )
}