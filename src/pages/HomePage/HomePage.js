import { useState, useEffect } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import Blogs from '../../components/Blogs/Blogs'
import styles from './HomePage.module.scss'

export default function HomePage(props) {
    const [blogs, setBlogs] = useState([])
    const [showCreate, setShowCreate] = useState(false)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await props.getAllBlogs()
                setBlogs(data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchBlogs()
    }, [])

    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true)
        }
        if (localStorage.token && localStorage.user && !props.user) {
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
        if (props.token) {
            setShowCreate(true)
        }
    }, [])

    return (
        <div className={styles.homePageContainer}>
            <h1 className={styles.title}>Welcome to the Liberty Blog</h1>
            {showCreate && (
                <div className={styles.createFormContainer}>
                    <CreateForm user={props.user} createBlog={props.createBlog} token={props.token} />
                </div>
            )}
            {blogs.length ? (
                <Blogs blogs={blogs} />
            ) : (
                <p className={styles.errorMessage}>Sorry, our writers are lazy.</p>
            )}
        </div>
    )
}
