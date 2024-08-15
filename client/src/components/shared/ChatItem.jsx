import React from 'react'
import { Link } from '../styles/StyledComponents'
import { Box, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import AvatarCard from './AvatarCard'


const ChatItem = ({
  avatar = [],
  name,
  _id ,
  groupChat,
  sameSender,
  isOnline,
  newMessageAlert,
  index =0 ,
  handleDeleteChat,
}) => {
  return (
      <Link sx={{padding:"0"}} to={`/chat/${_id}`} 
      onContextMenu={(e) => handleDeleteChat(e , _id, groupChat) }> 
      {/*  context menu means - right click */}

        <div style={{display:"flex" , alignItems:"center" , padding:"1rem" , 
            backgroundColor: sameSender ? "rgba(0,0,0,0.85)" : "unset" , color: sameSender ? "white" : "unset",
            gap:"1rem" , 
      }}>

          {/* avatar card */}
          <AvatarCard avatar={avatar}/>

          {/* name and new messages */}
          <Stack>
            <Typography>{name}</Typography>
            {
              newMessageAlert && <Typography> {newMessageAlert.count} New Messages </Typography>
            }
          </Stack>
          
          {
            isOnline && <Box sx={{
              width:"10px" , height:"10px" , borderRadius:"50%" , backgroundColor:"green",
              position:"absoulte" , top:"50%" , right:"1rem" , transform:"translate(-50%)"
            }}/>
          }



        </div>
      </Link>
  )
}

export default memo(ChatItem)
// memo mai isliye wrap kara taaki , jab tak ChatItem ka koi bhi prop chanhe nahi hota tab tak re render nahi ho