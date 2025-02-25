import { useState } from "react";
import styles from "../styles/pages/DiseaseDetailPage.module.scss";
import {NavLink, useParams} from "react-router-dom";
import diseases from "../assets/Diseases.ts";
import {GoChevronDown, GoChevronRight} from "react-icons/go";
import DataTable from "../components/UIKit/DataTable.tsx";

export default function DiseaseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    // TODO: use otherFields to improve scalability in case many new fields created
    const { name, locations, alt_names, locus, mondo, description } = diseases[numericId - 1];

    const dataRows = [
        { label: "Alt. names", value: alt_names },
        { label: "Locus", value: locus },
        { label: "Mondo", value: <a href={mondo} target="_blank" rel="noopener noreferrer">{mondo.slice(8)}</a> },
    ];

    const [isLocationsVisible, setIsLocationsVisible] = useState(false);

    const toggleLocationsVisibility = () => {
        setIsLocationsVisible((prev) => !prev);
    };

    return (
        <main className={styles.disease_detail_page_ctr}>
            <span className={styles.page_title}>
                {name}
            </span>
            <div className={styles.disease_info_ctr}>
                <div className={styles.disease_info_left_section}>
                    <div className={styles.disease_info_left_ctr}>
                        <button
                            className={styles.location_toggle_btn}
                            onClick={toggleLocationsVisibility}
                        >
                            Locations
                            {isLocationsVisible ? <GoChevronDown /> : <GoChevronRight/>}
                        </button>

                        {/* Conditionally render the locations list */}
                        {isLocationsVisible && (
                            <div className={styles.locations_list}>
                                {locations.map((loc) => (
                                    <NavLink
                                        to={`/clusters/${loc.id}`}
                                        className={styles.disease_info_left_section_text}
                                        key={loc.id}
                                    >
                                        {loc.location}<br/>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <span className={styles.disease_info_left_section_title}>
                            Description:
                        </span>
                        <div>
                            <DataTable caption={name} dataRows={dataRows}/>
                            <p className={styles.disease_info_left_section_text}>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}