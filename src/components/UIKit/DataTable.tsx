import styles from "../../styles/components/UIKit/DataTable.module.scss";
import TableRow from "./TableRow.tsx";
import {JSX} from "react";

interface DataTableProps {
    caption?: string;
    dataRows: {
        label: string;
        value: string | string[] | JSX.Element;
    }[];
}

export default function DataTable({ caption, dataRows }: Readonly<DataTableProps>) {
    return (
        <table className={styles.disease_info_table} style={caption ? undefined : { borderRadius: "4px" }}
               role="table">
            {caption ? <caption className={styles.table_caption}>{caption}</caption> : null}
            <tbody>
            {dataRows.map(({ label, value }, index) => (
                <TableRow key={index} label={label} value={value} />
            ))}
            </tbody>
        </table>
    )
}