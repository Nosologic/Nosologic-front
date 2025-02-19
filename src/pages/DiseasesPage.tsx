import styles from '../styles/pages/DiseasesPage.module.scss';
import DiseaseCard from "../components/DiseaseCard.tsx";
import diseases from "../assets/Diseases.ts";

export default function DiseasesPage() {
    return (
        <main className={styles.diseases_page_ctr}>
            {/* Loops through all the records from Diseases.ts and creates a DiseaseCard for each */}
            {diseases.map( (dis) => (
                <DiseaseCard key={dis.id} id={dis.id}/>
            ))}
        </main>
    )
}