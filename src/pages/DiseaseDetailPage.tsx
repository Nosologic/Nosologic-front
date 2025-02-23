import { useState } from "react";
import styles from "../styles/pages/DiseaseDetailPage.module.scss";
import {NavLink, useParams} from "react-router-dom";
import diseases from "../assets/Diseases.ts";

export default function DiseaseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    const { name, locations, alt_names, locus, omim, description } = diseases[numericId - 1];

    // State to track whether the "Locations" section is visible or not
    const [isLocationsVisible, setIsLocationsVisible] = useState(false);

    // Toggle visibility when the "Locations" title is clicked
    const toggleLocationsVisibility = () => {
        setIsLocationsVisible((prev) => !prev);
    };

    return (
        <main className={styles.disease_detail_page_ctr}>
            <span className={styles.page_title}>
                {name}:
            </span>
            <div className={styles.disease_info_ctr}>
                <div className={styles.disease_info_left_section}>
                    <div className={styles.disease_info_left_ctr}>
                        <button
                            className={styles.location_toggle_btn}
                            onClick={toggleLocationsVisibility}
                        >
                            Locations:
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
                            <table className={styles.disease_info_table} role={"table"}>
                                <caption className={styles.table_caption}>{name}</caption>
                                <tbody>
                                <tr>
                                    <th scope={"row"} className={styles.table_label}>
                                        Alt. names:
                                    </th>
                                    <td>
                                        <ul className={styles.table_data}>
                                            {alt_names.map((an) => (
                                                <li key={an} className={styles.list_item}>
                                                    {an}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope={"row"} className={styles.table_label}>
                                        Locus:
                                    </th>
                                    <td className={styles.table_data}>{locus}</td>
                                </tr>
                                <tr>
                                    <th scope={"row"} className={styles.table_label}>
                                        Omim:
                                    </th>
                                    <td className={styles.table_data}>{omim}</td>
                                </tr>
                                </tbody>
                            </table>
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