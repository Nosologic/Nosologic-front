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
            <div className={styles.disease_card_info_ctr}>
                {/* dc stands for disease card */}
                <div className={styles.dc_info_ctr}>
                    <span>Locations:</span>
                    <span className={styles.dc_info_overflow}>{locations.join(", ")}</span>
                </div>

                <div className={styles.dc_info_ctr}>
                    <span>Alternative Names:</span>
                    <span className={styles.dc_info_overflow}>{alt_names.join(", ")}</span>
                </div>

                <div className={styles.dc_info_ctr}>
                    <span>Locus:</span>
                    <span>{locus}</span>
                </div>
            </div>

        </div>
    );
}