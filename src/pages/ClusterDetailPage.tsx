import styles from "../styles/pages/ClusterDetailPage.module.scss";
import { useParams } from "react-router-dom";
import locations from "../assets/Locations.ts";
import DetailTextSection from "../components/UIKit/DetailTextSection.tsx";
import {JSX} from "react";

export default function ClusterDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    const location = locations.find((loc) =>
        loc.id === numericId);

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Extract location fields with defaults
    const {
        name = "N/A",
        table_data = {},
        text_data = {},
    } = location || {};


    type TableDataRow = {
        label: string;
        value: string | string[] | JSX.Element;
    }

    const checkIfArray = (value: unknown) => {
        return ( Array.isArray(value) ? value as string[] : String(value));
    }

    const dataRows: TableDataRow[] =
        Object.entries(table_data)
            .filter((value) => value !== undefined)
            .map(([key, value]) => ({
                label: capitalize(key),
                value: Array.isArray(value) && value.length > 0 && value[0].slice(0, 8) === "https://" ?
                    <a href={value[0]} target="_blank" rel="noopener noreferrer">{value[1]}</a> :
                   checkIfArray(value)
            }))


    type TextField = {
        label: string;
        value: string | string[];
    };

    const text_fields: TextField[] =
        Object.entries(text_data)
            .filter((value) => value !== undefined)
            .map(([key, value]) => ({
                label: capitalize(key),
                value: Array.isArray(value) ? value as string[] : String(value)
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