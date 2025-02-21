import { NavLink } from "react-router-dom";
import styles from "../../styles/components/DiseasesPage/DiseaseCard.module.scss"
import diseases from "../../assets/Diseases.ts";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useState} from "react";


export default function DiseaseCard({id}: Readonly<{ id: number }>) {
    const { name, locations, alt_names, locus } = diseases[id - 1];
    const [isFavourite, setIsFavourite] = useState(false);
    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.disease_card}>
            <div className={styles.dc_upper_ctr}>
                <NavLink to={`/diseases/${id}`} className={styles.dc_name}>
                    {name}
                </NavLink>
                <button className={styles.fav_btn} onClick={toggleFavourite}>
                    {isFavourite ? (
                        <FaHeart className={styles.fav_icon} /> // Filled heart when active
                    ) : (
                        <FaRegHeart className={styles.fav_icon} /> // Outline heart when not active
                    )}

                </button>
            </div>

            <div className={styles.disease_card_info_ctr}>
                {/* dc stands for disease card */}
                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title}>Locations:</span>
                    <div className={styles.dc_info_overflow}>
                        {locations.map(((name) => (
                            <span key={name} className={styles.tag}>{name}</span>
                        )))}
                    </div>
                </div>

                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title}>Alternative Names:</span>
                    <div className={styles.dc_info_overflow}>
                        {alt_names.map(((name) => (
                            <span key={name} className={styles.tag}>{name}</span>
                        )))}
                    </div>
                </div>

                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title}>Locus:</span>
                    <span className={styles.tag}>{locus}</span>
                </div>
            </div>

        </div>
    );
}