import {JSX} from "react";

interface ParseDataProps {
    table_data: Record<string, unknown>;
    text_data: Record<string, string> | Record<string, string[]>;
}

export default function parseData({table_data, text_data}: Readonly<ParseDataProps>) {
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const checkIfArray = (value: unknown) => {
        return ( Array.isArray(value) ? value as string[] : String(value));
    }

    type TableDataRow = {
        label: string;
        value: string | string[] | JSX.Element;
    }

    const dataRows: TableDataRow[] =
        Object.entries(table_data)
            .filter((value) => value !== undefined)
            .map(([key, value]) => ({
                label: capitalize(key).replace("_", ". "),
                value: Array.isArray(value) && value.length > 0 && value[0].slice(0, 8) === "https://" ?
                    <a href={value[0]} target="_blank" rel="noopener noreferrer">{value[1]}</a> :
                    checkIfArray(value)
            }))

    type TextField = {
        label: string;
        value: string | string[];
    }

    const text_fields: TextField[] =
        Object.entries(text_data)
            .filter((value) => value !== undefined)
            .map(([key, value]) => ({
                label: capitalize(key),
                value: Array.isArray(value) ? value as string[] : String(value)
            }));

    return {dataRows, text_fields};
}