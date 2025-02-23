import styles from "../../styles/components/UIKit/TableRow.module.scss";
import {JSX} from "react";

type TableRowProps = {
    label: string;
    value: string | string[] | JSX.Element;
};

export default function TableRow({ label, value }: Readonly<TableRowProps>) {
    return (
        <tr>
            <th scope="row" className={styles.table_label}>
                {label}
            </th>
            <td className={styles.table_data}>
                {Array.isArray(value) ? (
                    <ul>
                        {value.map((item, index) => (
                            <li key={index} className={styles.table_data}>
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    value
                )}
            </td>
        </tr>
    );
}