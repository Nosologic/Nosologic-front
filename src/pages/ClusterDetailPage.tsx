import styles from "../styles/pages/ClusterDetailPage.module.scss";
import { useParams } from "react-router-dom";
import locations from "../assets/Locations.ts";
import DetailTextSection from "../components/UIKit/DetailTextSection.tsx";

export default function ClusterDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    const location = locations.find((loc) =>
        loc.id === numericId);

    // Extract location fields with defaults
    const {
        name = "N/A",
        table_data = {
            disease: "",
            phenotype: "",
            gene: "",
            variant: "",
            reference: ["", ""],
        },
        text_data = {}
    } = location || {};

    // Map all data fields into a key-value structure
    const dataRows = [
        { label: "Disease", value: table_data.disease },
        { label: "Phenotype", value: table_data.phenotype },
        { label: "Gene", value: table_data.gene },
        { label: "Variant", value: table_data.variant },
        { label: "Reference", value: <a href={table_data.reference[0]} target="_blank" rel="noopener noreferrer">
                {table_data.reference[1]}</a> },
    ];

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    type TextField = {
        label: string;
        value: string | string[];
    };

    const text_fields: TextField[] =
        Object.entries(text_data)
            .filter((value) => value !== undefined)
            .map(([key, value]) => ({
                label: capitalize(key),
                value: Array.isArray(value) ? value as string[] : String(value) // Normalize value to string or string[]
            }));


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