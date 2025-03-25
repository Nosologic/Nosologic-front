import styles from "../../styles/components/UIKit/CustomSearch.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

type CustomSearchProps = {
    className?: string; // Accept custom classNames
    id?: string;
};

export default function CustomSearch({ className, id }: Readonly<CustomSearchProps>) {
    return (
        <div className={`${styles.search_container} ${className ?? ""}`} id={id ?? ""}>
            <AiOutlineSearch className={styles.search_icon} />
            <input
                type="text"
                className={styles.search_input}
                placeholder="Search..."
                aria-label="search"
            />
        </div>
    );
}