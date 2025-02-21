import styles from "../../styles/components/AboutUsPage/MemberEntry.module.scss";

interface IMemberEntryProps {
    name: string;
    linkedin: string;
}

export default function MemberEntry({ name, linkedin } : Readonly<IMemberEntryProps>) {

    return (
        <div className={styles.about_member_entry}>
            <span className={styles.about_member_name}>
                {name}
            </span>
            <a href={linkedin}>
                LinkedIn
            </a>
        </div>
    )
}