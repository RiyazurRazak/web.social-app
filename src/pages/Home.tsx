import React from 'react'
import Stories from '../components/Stories'
import UserDetails from '../components/UserDetails'
import Mansory from '../components/Mansory'
import styles from '../styles/pages/Home.module.css'

function Home() {
  
    return (
        <div className={styles.root}>
           
               <UserDetails />
         
             <div className={styles.right}>
                  <div className={styles.content_container}>
                      <div className={styles.stories_container}>
                        <h1 className={styles.title}>Stories</h1>
                        <Stories />
                      </div>
                      <div className={styles.posts}>
                         <Mansory />
                      </div> 
                  </div>
             </div>
        </div>
    )
}

export default Home
