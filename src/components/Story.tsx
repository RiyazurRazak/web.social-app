import React from 'react'
import {Modal, ModalOverlay, ModalContent, Progress, Image, HStack, Avatar} from "@chakra-ui/react"

interface IProps{
    open : boolean,
    onClose : ()=>void,
    value : number,
    data: {
        url : string,
        username : string,
        avatar : string,
    },
}

function Story({open, onClose, value, data}:IProps) {
    return (
        <Modal isOpen={open} onClose={onClose} size="sm" closeOnOverlayClick={false} isCentered>
            <ModalOverlay />
            <ModalContent sx={{textAlign: "center",}}>
                <Progress value={value} />
                <br />
                <HStack spacing="10px" sx={{padding: "0 10px"}}>
                    <Avatar size="sm" src={data.avatar} />
                    <p style={{height: "12px"}}>{data.username}</p>
                 </HStack>
                    
                <br />
                <Image 
                  src={data.url}
                  h="70vh"
                  mb={2}
                  alt="Alt"
                  sx={{objectFit: "contain"}}
                 />
            </ModalContent>
        </Modal>

    )
}

export default Story
