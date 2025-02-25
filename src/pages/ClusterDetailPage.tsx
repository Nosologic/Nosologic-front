import styles from "../styles/pages/ClusterDetailPage.module.scss";
import { useParams } from "react-router-dom";
import locations from "../assets/Locations.ts";
import DetailTextSection from "../components/UIKit/DetailTextSection.tsx";
import parseData from "../scripts/ParseData.tsx";

export default function ClusterDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    const location = locations.find((loc) =>
        loc.id === numericId);

    // Extract location fields with defaults
    const {
        name = "N/A",
        table_data = {},
        text_data = {},
    } = location || {};

    const { dataRows, text_fields } = parseData({table_data, text_data});

    return (
        <main className={styles.cluster_detail_page_ctr}>
            <span className={styles.page_title}>{name}</span>
            {text_fields.map((field, index) => (
                index !== 0 ? <DetailTextSection text_fields_data={field} key={field.label} /> :
                <DetailTextSection text_fields_data={field} key={field.label} dataRows={dataRows}/>
            ))}

        </main>
    );
}