import { NavLink } from "react-router-dom";
import styles from "../../styles/components/DiseasesPage/DiseaseCard.module.scss"
import diseases from "../../assets/Diseases.ts";
import FavButton from "../UIKit/FavButton.tsx";
import {useEffect, useState} from "react";
import {useIsMobile} from "../../hooks/useIsMobile.tsx";
import {FaMapLocation} from "react-icons/fa6";
import {MdOutlineDriveFileRenameOutline} from "react-icons/md";
import {SiMicrogenetics} from "react-icons/si";


export default function DiseaseCard({id}: Readonly<{ id: number }>) {
    const { name, locations, table_data } = diseases[id - 1];
    const { alt_names, locus } = table_data;
    const visibleLocations = locations
        .filter((loc) => loc.visibility);

    const isMobile = useIsMobile();
    const [smallMobile, setSmallMobile] = useState(window.innerWidth <= 500);

    // Update `isMobile` when the viewport size changes
    useEffect(() => {
        const handleResize = () => {
            setSmallMobile(window.innerWidth <= 500);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const defineContent = (purpose: string) => {
        if (purpose === "location") {
            if (smallMobile) {
                return <FaMapLocation className={styles.dc_description_icon}/>;
            } else {
                return ( visibleLocations.length > 1 ? "Locations:" : "Location:" );
            }

        } else if (purpose === "alt_name") {
            if (smallMobile) {
                return <MdOutlineDriveFileRenameOutline className={styles.dc_description_icon}/>;
            } else {
                return ( alt_names.length > 1 ? "Alternative names:" : "Alternative name:" );
            }
        } else if (purpose === "locus") {
            if (smallMobile) {
                return <SiMicrogenetics className={styles.dc_description_icon}/>;
            } else {
                return ( locus.length > 1 ? "Loci:" : "Locus:" );
            }
        } else {
            throw new Error("Unknown purpose");
        }
    }

    const getTooltip = (purpose: string) => {
        if (purpose === "location") {
            return "Number of geographic regions where a cluster of this disease occurs.";
        } else if (purpose === "alt_name") {
            return "Number of other names by which this disease is known";
        } else if (purpose === "locus") {
            return "Genetic regions associated with this disease";
        } else {
            return "";
        }
    }

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
                    <span className={styles.dc_info_title} title={getTooltip("location")}>{ defineContent("location") }</span>
                    <div className={styles.dc_info_overflow}>
                        {isMobile ?
                            <span className={styles.tag}>{visibleLocations.length}</span> :
                            visibleLocations.map(((loc) => (
                            <span key={loc.id} className={styles.tag}>{loc.location}</span>
                        )))}
                    </div>
                </div>

                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title} title={getTooltip("alt_name")}>{ defineContent("alt_name") }</span>
                    <div className={styles.dc_info_overflow}>
                        {isMobile ?
                            <span className={styles.tag}>{alt_names.length}</span> :
                            alt_names.map(((name) => (
                                <span key={name} className={styles.tag}>{name}</span>
                            )))}
                    </div>
                </div>
                <div className={styles.dc_info_ctr}>
                    <span className={styles.dc_info_title} title={getTooltip("locus")}>{ defineContent("locus") }</span>
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