import styles from '../styles/pages/DiseasesPage.module.scss';
import DiseaseCard from "../components/DiseasesPage/DiseaseCard.tsx";
import diseases from "../assets/Diseases.ts";
import CustomSearch from "../components/UIKit/CustomSearch.tsx";

export default function DiseasesPage() {
    return (
        <main className={styles.diseases_page_ctr}>
            <span className={styles.page_title}>
                Diseases:
            </span>
            <CustomSearch className={styles.search_container}/>
            {/* Loops through all the records from Diseases.ts and creates a DiseaseCard for each */}
            {diseases.map( (dis) => (
                <DiseaseCard key={dis.id} id={dis.id}/>
            ))}
        </main>
    )
}