import styles from '../styles/pages/DiseaseDetailPage.module.scss';
import {useParams} from "react-router-dom";
import diseases from "../assets/Diseases.ts";

export default function DiseaseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    const {name, locations, alt_names, locus, omim, description} = diseases[numericId - 1];

    return (
        <main className={styles.disease_detail_page_ctr}>
            <span className={styles.page_title}>
                {name}:
            </span>
            <div className={styles.disease_info_ctr}>
                <div className={styles.disease_info_left_section}>
                    <div className={styles.disease_info_left_ctr}>
                        <span className={styles.disease_info_left_section_title}>
                            Locations:
                        </span>
                        {locations.map((loc) => (
                            <span className={styles.disease_info_left_section_text} key={loc}>{loc}</span>
                        ))}
                    </div>

                    <span className={styles.disease_info_left_section_title}>
                        Description:
                    </span>
                    <span className={styles.disease_info_left_section_text}>
                        {description}
                    </span>

                </div>
                <table className={styles.disease_info_table} role={"table"}>
                    <caption className={styles.table_caption}>{name}</caption>
                    <tbody>
                        <tr>
                            <th scope={"row"} className={styles.table_label}>Alt. names:</th>
                            <td>
                                <ul className={styles.table_data}>
                                    {alt_names.map((an) => (
                                        <li key={an} className={styles.list_item}>{an}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th scope={"row"} className={styles.table_label}>Locus:</th>
                            <td className={styles.table_data}>{locus}</td>
                        </tr>
                        <tr>
                            <th scope={"row"} className={styles.table_label}>Omim:</th>
                            <td className={styles.table_data}>{omim}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}