import React, {useEffect, useState} from 'react'
import {Box} from '@chakra-ui/react'
import PostCard from './PostCard'
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { useSelector } from 'react-redux';
import { Tstore } from '../Store';
import Visibility from "react-visibility-sensor"


function Mansory() {


    const [posts, setPosts] = useState<object[]>([])
    const [nextUrl, setNextUrl] = useState<string | null>(null)

    const {token} = useSelector((state : Tstore)=> state.Auth)

    useEffect(()=>{
        (async ()=> {
            await axios.get(`${baseUrl}/api/posts/explore`, {
                headers : {
                    "Authorization" : `Token ${token}`
                }
            }).then((res)=>{
                if(res.status === 200){
                    setPosts(res.data.results)
                    setNextUrl(res.data.next)
                }
            })
        })()
    },[])

    const fetchNextPageHandller = async(isVisible : boolean)=>{
        if(isVisible && nextUrl != null){
            await axios.get(nextUrl, {
                headers : {
                    "Authorization" : `Token ${token}`
                }
            }).then((res)=>{
                if(res.status === 200){
                    setPosts((prev)=> [...prev, ...res.data.results])
                    setNextUrl(res.data.next)
                }
            })
        }
    }

    return (
        <div>

            <Box 
              padding={2}
              w="100%"
              mx="auto"
              sx={{ columnCount: [1, 2, 3], columnGap: "12px" }}
            >

               {posts.map((post : any, index : any) => {
                   
                   if(posts.length === index + 1){
                       return (
                        <div style={{display: "inline-block"}} key={index}>
                            <Visibility partialVisibility onChange={fetchNextPageHandller} >

                              <PostCard 
                                 key={index}
                                 src={post.post_url}
                                 username={post.posted_user.username}
                                 avatar={post.posted_user.avatar}
                                 likes={post.post_likes.length}
                             />

                            </Visibility>
                          
                     </div>
                       )
                   }else{
                       return(
                        <div style={{display: "inline-block"}} key={index}>
                         <PostCard 
                           key={index}
                           src={post.post_url}
                           username={post.posted_user.username}
                           avatar={post.posted_user.avatar}
                           likes={post.post_likes.length}
                       />
                      </div>
                       )
                   }
                })}

            </Box>
            
        </div>
    )
}

export default Mansory
