import styles from '../styles/pages/BlogPage.module.scss';
import blogs from "../assets/Blogs.ts";
import BlogEntryCard from "../components/BlogPage/BlogEntryCard.tsx";
import CustomSearch from "../components/UIKit/CustomSearch.tsx";

export default function BlogPage() {
    return (
        <main className={styles.blog_page_ctr}>
            <span className={styles.page_title}>Blog</span>
            <CustomSearch className={styles.search_container}/>
            <div className={styles.blog_entries}>
                {blogs
                    .filter((blog) => blog.visibility)
                    .map((blog) => (
                    <BlogEntryCard key={blog.id} blog={blog}/>
                ))}
            </div>
        </main>
    )
}