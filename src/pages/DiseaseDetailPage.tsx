import styles from '../styles/pages/DiseaseDetailPage.module.scss';
import {useParams} from "react-router-dom";
import diseases from "../assets/Diseases.ts";

export default function DiseaseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id ?? "0");
    const {name, description} = diseases[numericId - 1];

    return (
        <main className={styles.disease_detail_page_ctr}>
            <span className={styles.page_title}>
                {name}:
            </span>
            <div className={styles.disease_info_ctr}>
                <div className={styles.disease_info_left_section}>
                    <span className={styles.disease_info_left_section_title}>
                        Description:
                    </span>
                    <span className={styles.disease_info_left_section_text}>
                        {description}
                    </span>
                </div>

            </div>
        </main>
    )
}