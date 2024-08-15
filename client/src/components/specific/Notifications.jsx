import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from '../../constants/sampleData'


const Notifications = () => {

  const friendRequestHandler = ({_id , acccept}) => {
    console.log(`Friend Request from chat id ${_id}`)
  }


  return (
    <Dialog open>
      <Stack p={{xs:"1rem" , sm:"2rem"}} maxWidth={"25rem"}>

        <DialogTitle textAlign={"center"}> Notifications </DialogTitle>

        {
          sampleNotifications.length > 0 ? (
            sampleNotifications.map((notification)=>(
              <NotificationItem 
              key={notification._id}
              sender={notification.sender}
              _id={notification._id}
              handler={friendRequestHandler}
              />
            ))
          ) 
          
          : 

          (
            <Typography textAlign={"center"}>No Notifications</Typography>
          )
        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({sender , _id , handler}) => {

  const {name , avatar} = sender;

  return (
    <ListItem>
      <Stack 
      direction={"row"} 
      alignItems={"center"} 
      spacing={"1rem"} 
      width={"100%"}
    >

      <Avatar src={avatar}/>

      <Typography 
      variant='body1' 
      sx={{
          width:"100%",
          flexGrow:1,
          display:"-webkit-box",
          WebkitLineClamp:1,
          WebkitBoxOrient:"vertical",
          overflow:"hidden",
          textOverflow:"ellipsis"
      }}
      >
          {`${name} sent you a friend request`} 
      </Typography>

      <Stack direction={{xs:"column" , sm:"row"}}>
        <Button 
        onClick={() => handler({_id,acccept:true})}
        >
          Accept
        </Button>
        
        <Button 
        color="error"
        onClick={() => handler({_id,acccept:false})}
        >
          Reject
        </Button>

      </Stack>

  </Stack>
</ListItem>
  )
  
})
// memo mai isliye wrap kiya taaki , jab bhi notificationItem ke props mai koi change hoga tabhi ye component re render hoga

export default Notifications