import {JSX} from "react";
import styles from "../../styles/components/ClusterDetailPage/TextSection.module.scss";
import DataTable from "./DataTable.tsx";

interface TextSectionProps {
    dataRows?:
        {
            label: string,
            value: string | string[] | JSX.Element
        }[]

    text_fields_data: {
        label: string,
        value: string | string[]
    }
}

export default function DetailTextSection({ dataRows, text_fields_data } : Readonly<TextSectionProps>) {

    return (
        <div className={styles.cluster_detail_info}>
            <span className={styles.page_subtitle}>{text_fields_data.label}</span>
            <div className={styles.cluster_description_ctr}>
                {dataRows && <DataTable dataRows={dataRows}/>}
                <p className={styles.cluster_info_text}>{text_fields_data.value}</p>
            </div>
        </div>
    )
}