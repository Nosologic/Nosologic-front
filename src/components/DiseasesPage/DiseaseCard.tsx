import { NavLink } from "react-router-dom";
import styles from "../../styles/components/DiseasesPage/DiseaseCard.module.scss"
import diseases from "../../assets/Diseases.ts";
import FavButton from "../UIKit/FavButton.tsx";
import {useIsMobile} from "../../hooks/useIsMobile.tsx";


export default function DiseaseCard({id}: Readonly<{ id: number }>) {
    const { name, locations, table_data } = diseases[id - 1];
    const { alt_names, locus } = table_data;
    const visibleLocations = locations
        .filter((loc) => loc.visibility);

    const isMobile = useIsMobile();

    return (
        <div className={styles.disease_card}>
            <div className={styles.dc_upper_ctr}>
                <NavLink to={`/diseases/${id}`} className={styles.dc_name}>
                    {name}
                </NavLink>
                <FavButton />
            </div>

            <div className={styles.disease_card_info_ctr}>
                {/* dc stands for disease card */}
                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title}>{ visibleLocations.length > 1 ? "Locations:" : "Location:" }</span>
                    <div className={styles.dc_info_overflow}>
                        {isMobile ?
                            <span className={styles.tag}>{visibleLocations.length}</span> :
                            visibleLocations.map(((loc) => (
                            <span key={loc.id} className={styles.tag}>{loc.location}</span>
                        )))}
                    </div>
                </div>

                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title}>
                        Alt{ window.innerWidth <= 500 ? ". " : "ernative " }
                        {
                            alt_names.length > 1 ? " names:" : "name:"
                        }
                    </span>
                    <div className={styles.dc_info_overflow}>
                        {isMobile ?
                            <span className={styles.tag}>{alt_names.length}</span> :
                            alt_names.map(((name) => (
                                <span key={name} className={styles.tag}>{name}</span>
                            )))}
                    </div>
                </div>
                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title}>{ locus.length > 1 ? "Loci:" : "Locus:" }</span>
                    <div className={styles.dc_info_overflow}>
                        {isMobile ?
                            <span className={styles.tag}>{locus.length}</span> :
                            locus.map(((locus) => (
                                <span key={locus} className={styles.tag}>{locus}</span>
                            )))}
                    </div>
                </div>
            </div>
        </div>
    );
}