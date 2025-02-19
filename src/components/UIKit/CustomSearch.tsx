import styles from "../../styles/components/UIKit/CustomSearch.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

type CustomSearchProps = {
    className?: string; // Accept custom classNames
};

export default function CustomSearch({ className }: Readonly<CustomSearchProps>) {
    return (
        <div className={`${styles.search_container} ${className}`}>
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