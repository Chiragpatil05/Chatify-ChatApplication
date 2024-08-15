import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({
    w="100%",
    chats = [], // data inside chats - avatar , _id , name , groupChat , memebers , 
    chatId = [],
    onlineUsers = [],
    newMessagesAlert = [{
        count: 0,
        chatId: "",
    }],
    handleDeleteChat,

}) => {
    return (
        <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
            {
                chats?.map((data , index) => {
                    const {avatar , _id , name , groupChat , members} = data;

                    const newMessageAlert = newMessagesAlert.find(({chatId}) => chatId === _id);

                    const isOnline = members?.some((member) => onlineUsers.includes(_id));
                    
                    return(
                        <ChatItem avatar={avatar}  name={name}  _id={_id} groupChat={groupChat} 
                        newMessageAlert={newMessageAlert} isOnline={isOnline}
                        sameSender = {chatId === _id} handleDeleteChat={handleDeleteChat}
                        index={index} key={index}
                        />
                    )
                })
            }
        </Stack>
    )

}


export default ChatList