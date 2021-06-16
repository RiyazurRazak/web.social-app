import { Avatar, HStack, Box } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tstore } from '../Store'
import styles from '../styles/components/UserDetails.module.css'
import { baseUrl } from '../utils/baseUrl'

interface IData {
  id : number,
  fullname : string,
  following: [],
  followers : [],
  avatar : string,
  username : string,
  posts : [],
}

function UserDetails() {


  const {username, fullname, token, avatar, id} = useSelector((state:Tstore)=> state.Auth)
  const [data, setData]=useState<IData>()

  useEffect(()=>{
     (async ()=>{
         await axios.get(`${baseUrl}/api/account/profile?id=${id}`, {
           headers : {
             "Authorization" : `Token ${token}`
           }
         }).then((res)=>{
           if(res.status === 200){
               setData(res.data)
           }
         })
     })()
  },[])



    return (
        <div className={styles.root}>
            <h1>Social App</h1>
            <div className={styles.firstHalf}>
              <Avatar 
                src={avatar}
                name="avatar"
                size="xl"
                sx={{margin: "20px"}}
              />
              <h2 className={styles.username}>@ {username}</h2>
              <p>{fullname}</p>
            
              <HStack spacing="auto" sx={{marginTop: "30px"}} className={styles.details}>
                 <Box>
                    <p>{data?.posts.length}</p>
                    <p>posts</p>
                  </Box>
                  <Box>
                    <p>{data?.followers.length}</p>
                    <p>followers</p>
                  </Box>
                  <Box>
                    <p>{data?.following.length}</p>
                    <p>following</p>
                  </Box>
               </HStack>
            </div>
         
            <div className={styles.postsContainer}>
              {
                data?.posts.map((post : any, index : number)=>{
                  return (
                     <img key={index} className={styles.post_img} src={post.post_url} alt="post" />
                  )
                })
              }
            </div>


        </div>
    )
}

export default UserDetails

