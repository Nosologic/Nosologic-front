import { NavLink } from "react-router-dom";
import styles from "../../styles/components/BlogPage/BlogEntryCard.module.scss";
import FavButton from "../UIKit/FavButton.tsx";
import {IoPersonOutline} from "react-icons/io5";
import {FaRegCalendarAlt} from "react-icons/fa";

interface IBlogEntryCardProps {
    blog: {
        id: number;
        title: string;
        content: string;
        author: string;
        date: string;
    }
}

export default function BlogEntryCard({blog}: Readonly<IBlogEntryCardProps>) {
    const { id, title, content, author, date } = blog;

    return (
        <div className={styles.disease_card}>
            <div className={styles.bec_upper_ctr}>
                <NavLink to={`/blog/${id}`} className={styles.bec_title}>
                    {title}
                </NavLink>
                <FavButton />
            </div>
            <span className={styles.bec_content}>
                {content.length > 250 ? `${content.slice(0, 250)}...` : content}
            </span>

            <div className={styles.blog_entry_card_info_ctr}>
                {/* bec stands for blog entry card */}
                <div className={styles.bec_info_ctr}>
                    <IoPersonOutline className={styles.icon}/>
                    <span className={styles.be_info}>{author}</span>
                </div>

                <div className={styles.bec_info_ctr}>
                    <FaRegCalendarAlt className={styles.icon}/>
                    <span className={styles.be_info}>{date}</span>
                </div>
            </div>

        </div>
    );
}