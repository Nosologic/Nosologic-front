import styles from "../../styles/components/AboutUsPage/RoleListSection.module.scss";
import MemberEntry from "./MemberEntry.tsx";
import roles from "../../assets/Roles.ts";
import members from "../../assets/Members.ts";

export default function RoleListSection() {
    return (
        <div className={styles.role_list_section}>
            {roles.map((role) => (
                <div key={role.id} className={styles.role_section}>
                    <span className={styles.about_role_title}>{role.name}:</span>
                    <div className={styles.members_list}>
                        {members
                            .filter((member) => member.role_id === role.id)
                            .map((member) => (
                                <MemberEntry key={member.id} name={member.name} linkedin={member.linkedin} />
                            ))}
                    </div>

                </div>
            ))}
        </div>
    );
}