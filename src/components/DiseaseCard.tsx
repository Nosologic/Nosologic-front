import { NavLink } from "react-router-dom";
import styles from "../styles/components/DiseaseCard.module.scss"
import diseases from "../assets/Diseases.ts";

export default function DiseaseCard({id}: Readonly<{ id: number }>) {
    const { name, locations, alt_names, locus } = diseases[id - 1];

    return (
        <div className={styles.disease_card}>
            <NavLink to={`/diseases/${id}`} className={styles.view_more_link}>
                {name}
            </NavLink>
            <div>
                <p><strong>Genetic Locus:</strong> {locus}</p>
                <p><strong>Alternative Names:</strong> {alt_names.join(', ')}</p>
                <p><strong>Locations:</strong> {locations.join(', ')}</p>
            </div>

        </div>
    );
}