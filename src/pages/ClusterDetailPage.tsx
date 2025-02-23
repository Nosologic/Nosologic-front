import styles from "../styles/pages/ClusterDetailPage.module.scss";
import { useParams } from "react-router-dom";
import locations from "../assets/Locations.ts";
import DataTable from "../components/UIKit/DataTable.tsx";

export default function ClusterDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    const location = locations.find((loc) =>
        loc.id === numericId);

    // Extract location fields with defaults
    const {
        name = "N/A",
        disease = "N/A",
        alt_names = [],
        phenotype = "N/A",
        gene = "N/A",
        variant = "N/A",
        reference = "N/A",
        reference_link = "N/A",
        description = "N/A",
    } = location || {};

    // Map all data fields into a key-value structure
    const dataRows = [
        { label: "Disease", value: disease },
        { label: "Alt. names", value: alt_names },
        { label: "Phenotype", value: phenotype },
        { label: "Gene", value: gene },
        { label: "Variant", value: variant },
        { label: "Reference", value: <a href={reference_link} target="_blank" rel="noopener noreferrer">{reference}</a> },
    ];

    return (
        <main className={styles.cluster_detail_page_ctr}>
            <span className={styles.page_title}>{name}</span>
            <div className={styles.cluster_detail_info}>
                <span className={styles.page_subtitle}>Description</span>
                <div>
                    <DataTable dataRows={dataRows}/>
                    <p className={styles.cluster_info_text}>{description}</p>
                </div>

            </div>

        </main>
    );
}