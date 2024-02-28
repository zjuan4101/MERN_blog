import { Link } from 'react-router-dom'
import styles from './Blogs.module.scss'

export default function Blogs(props) {
    return (
        <div className={styles.blogList}>
            {props.blogs.map((blog) => {
                return (
                    <article key={blog._id} className={styles.blogItem}>
                        <h3 className={styles.blogTitle}>{blog.title}</h3>
                        <Link to={`/blog/${blog._id}`} className={styles.readLink}>Read "{`${blog.title}`}"</Link>
                    </article>
                )
            })}
        </div>
    )
}
