import styles from "../../styles/components/HomePage/HomePageCard.module.scss";
import {IoLocationOutline} from "react-icons/io5";
import {SiMicrogenetics} from "react-icons/si";

interface IHomePageCardProps {
    name: string;
    purpose: string;
    locations_number?: number;
    locus_number?: number;
    date?: string;
}

export default function HomePageCard({ name, purpose, locations_number, locus_number } : Readonly<IHomePageCardProps>) {

    const defineContent = () => {
        if (purpose === "disease") {
            return (
                <div className={styles.hpc_info}>
                    <div className={styles.hpc_info_section}>
                        <IoLocationOutline />
                        {locations_number}
                    </div>
                    <div>
                        <SiMicrogenetics />
                        {locus_number}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={styles.home_page_card}>
            <span className={styles.card_name}>
                {name}
            </span>
            {defineContent()}
        </div>
    )
}