import React, {useState} from 'react'
import QRCode from 'react-qr-code';
import styles from '../styles/pages/Login.module.css';
import { PinInput, PinInputField, HStack, Center } from "@chakra-ui/react"
import {useDispatch} from 'react-redux'
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { setAuth } from '../redux/auth';

function Login() {

    const dispatch = useDispatch()
    const [invalid, setInvalid] = useState<boolean>(false)

    const checkUUIDHandller = async(value: string)=>{
      console.log(value)
        await axios.get(`${baseUrl}/api/web-connect/verify-uuid?uuid=${value}`).then(async(res)=>{
          if(res.status === 200){
              const token = res.data.token
              await axios.get(`${baseUrl}/api/account/current-user`,{
                headers : {
                    "Authorization" : `Token ${token}`
                }
              }).then((res)=>{
                 if(res.status === 200){
                   dispatch(setAuth({isAuthenticated: true, token : token, username: res.data.username, avatar: res.data.avatar, fullname : res.data.fullname, id: res.data.id}))
                 }else{
                   setInvalid(true)
                 }
              })
          }else{
              setInvalid(true)
          }
        })
    }
    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.left_container}>
                   <h4>Scan Me In Mobile App</h4>
                   <br />
                   <Center>
                  <QRCode value="fd2d79ab-3000-41c7-8666-98103e3ccec6" fgColor="#121212" bgColor="#98ddca" />
                  </Center>
                </div>
              
            </div>
            <div className={styles.right}>
               <div className={styles.logo}>
                    <h1>Social App</h1>
                </div>
                <div className={styles.right_container}> 
                  <h1>Scan The QR Code In Mobile App And Enter The Code</h1> 
                  <br />
                  <Center>
                    <HStack>
                      <PinInput type="alphanumeric" focusBorderColor="#000" onComplete={checkUUIDHandller} isInvalid={invalid}>
                         <PinInputField sx={{borderColor: "#000"}} />
                         <PinInputField sx={{borderColor: "#000", }} />
                         <PinInputField sx={{borderColor: "#000", }} />
                         <PinInputField sx={{borderColor: "#000", }} />
                      </PinInput>
                   </HStack>
                  </Center>
                  <br />
                 <h1>Code Is Valid Only For 2 Minutes</h1>
                </div>
            </div>
        </div>
    )
}

export default Login
