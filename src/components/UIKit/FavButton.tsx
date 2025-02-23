import styles from "../../styles/components/UIKit/FavButton.module.scss";
import {FaRegStar, FaStar} from "react-icons/fa";
import {useState} from "react";

export default function FavButton() {
    const [isFavourite, setIsFavourite] = useState(false);
    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    }
    return (
        <button className={styles.fav_btn} onClick={toggleFavourite}>
            {isFavourite ? (
                <FaStar className={styles.fav_icon} /> // Filled heart when active
            ) : (
                <FaRegStar className={styles.fav_icon} /> // Outline heart when not active
            )}
        </button>
    );

}