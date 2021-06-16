import React from 'react'
import styles from '../styles/components/PostCard.module.css'
import {Avatar, Image} from '@chakra-ui/react'
import {IoMdHeart} from 'react-icons/io'


interface Iprops {
    src : string,
    username : string,
    avatar : string,
    likes : number,
}
function PostCard({src, username, avatar, likes}:Iprops) {
    return (
        <div className={styles.root}>
            <div className={styles.profile}>
                <Avatar 
                  src={avatar} 
                  size="sm"
                />
                 <p className={styles.username}>{username}</p>
            </div>

             <Image
                 w="100%"
                 borderRadius="xl"
                 mb={2}
                 src={src}
                 alt="Alt"
                 sx={{boxShadow: "2px 5px 6px rgba(0, 0, 0, 0.25)",}}
            />
             
            <div className={styles.btm}>
               <IoMdHeart size="20px" color="red"/>
               <p>{likes} Likes</p>
            </div> 
        </div>
    )
}

export default PostCard
