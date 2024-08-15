import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'
import ChatList from '../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'


// high order component
// Applayout return karega WrappedComponent ko aur WrappedComponent return karega function

const AppLayout = () => WrappedComponent => {
    return(props) => {

        // accessing chat id from params (url se id ko fecth kara hai)
        const params = useParams();
        const chatId = params.chatId;

        const handleDeleteChat = (e , _id, groupChat) => {
            e.preventDefault();
            console.log("Delete chat" , _id , groupChat)
        }


        return(
        <>
                <Title/>
                <Header/>

                <Grid container height={"calc(100vh - 4rem)"} >
                    <Grid item sm={4} md={3}  height={"100%"} bgcolor={"#DBD8E3"} 
                        sx={{display :{xs:"none" , sm:'block'}} }
                    > 
                        {/* chat list  */} 
                        <ChatList chats={sampleChats} chatId={chatId} handleDeleteChat={handleDeleteChat}
                        // newMessagesAlert={[{chatId , count: 5}]} onlineUsers={["1","2"] }
                        />

                    </Grid>

                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} 
                    >
                        <WrappedComponent {...props}/>
                    </Grid>
                    
                    <Grid item xs={4} height={"100%"}  md={4} lg={3} 
                    sx={{display :{xs:"none" , md:'block'}, padding:"2rem" , bgcolor:"rgba(0,0,0,0.85)"}}
                    >
                        <Profile/>
                    </Grid>
                    
                </Grid>

        </>
        )
    }
}

export default AppLayout
