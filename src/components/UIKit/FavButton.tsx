import styles from "../../styles/components/DiseasesPage/DiseaseCard.module.scss";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useState} from "react";

export default function FavButton() {
    const [isFavourite, setIsFavourite] = useState(false);
    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    }
    return (
        <button className={styles.fav_btn} onClick={toggleFavourite}>
            {isFavourite ? (
                <FaHeart className={styles.fav_icon} /> // Filled heart when active
            ) : (
                <FaRegHeart className={styles.fav_icon} /> // Outline heart when not active
            )}
        </button>
    );

}