import { StatGroup } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tstore } from '../Store'
import styles from '../styles/components/Stories.module.css'
import { baseUrl } from '../utils/baseUrl'
import Story from './Story'


interface Istory {
   url : string,
   username : string,
   avatar : string,
}

function Stories() {

   const [story, setStory] = useState<Istory>({
      url : "",
      username : "",
      avatar : "",
   })
   const [open, setOpen] = useState<boolean>(false)
   const [value, setValue] = useState<number>(0)
   const [stories, setStories] = useState<any[]>([])
   let tm : ReturnType<typeof setTimeout> 
   let intreval : ReturnType<typeof setInterval>
   const {token} = useSelector((state : Tstore)=> state.Auth)

   const onClose = ()=>{
      return null
   }

   useEffect(()=>{
      if(open){
         intreval = setInterval(()=>{
            setValue((prev)=> prev+10)
         },1000)

         tm = setTimeout(()=>{
             setOpen(false)
         },11000)
        
      }

      return ()=> {
         clearTimeout(tm)
         clearInterval(intreval)
         setValue(0)
      }  
   },[open])


   useEffect(()=>{
      (async ()=>{
         await axios.get(`${baseUrl}/api/stories/get-stories`, {
            headers : {
               "Authorization" : `Token ${token}`
            }
         }).then((res)=>{
             if(res.status === 200){
                 setStories(res.data.results)
             }
         })
      })()
   },[])

  
    return (
        <div className={styles.root}>
           <div className={styles.stories}>

              {

                 stories.length > 0 ?
                 stories.map((story, index)=>{

                  return (
                     <div
                        key={index} 
                        className={styles.border} 
                        onClick={()=>{
                         setStory({
                            url : story.story_url,
                            username : story.username,
                            avatar : story.avatar,
                         })
                         setOpen(true)
                        }}
                      >
                        <img src={story.avatar} alt="avatar" />  
                     </div>  
                  )
                 })
                  :
                  <h1>No Stories</h1>
               }
         

          </div>

         <Story open={open} onClose={onClose} value={value} data={story} />
           
        </div>
    )
}

export default Stories
