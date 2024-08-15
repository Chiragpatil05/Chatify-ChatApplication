import React, { useRef , Fragment} from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material';
import { grayColor } from '../constants/color';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';


const Chat = () => {

  const containerRef = useRef(null);

  // sample user - jo currnetly logged in hai 
  const user = {
    _id:"qwertyuiopasdfghjkl",
    name:'Chirag Patil'
  }


  return (
    <Fragment>

      <Stack 
      ref={containerRef} 
      boxSizing={"border-box"} 
      padding={"1rem"} 
      spacing={"1rem"}
      bgcolor={grayColor}
      height={"90%"}
      sx={{
        overflowX:"hidden",
        overflowY:"auto",
      }}
      >
        {/* messages render karna hai */}
        {
          sampleMessage.map((mssg)=>(
            <MessageComponent key={mssg._id} message={mssg} user={user}/>
          ))
        }

      </Stack>

      <form style={{height:"10%"}}>
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"}
        position={"relative"}
        >
          <IconButton 
          sx={{
            position:"absolute",
            rotate:"30deg",
            left:"1.5rem",
          }}

          >
            <AttachFileIcon/>
          </IconButton>

          <InputBox placeholder="Type Message Here ..."/>

          <IconButton type='submit' 
          sx={{
            rotate:"-30deg",
            color:"white",
            backgroundColor:"#2A2438",
            marginLeft:"1rem",
            padding:"0.5rem",
            "&:hover":{
              backgroundColor:"white",
              color:"#2A2438"
            }
          }}>
            <SendIcon/>
          </IconButton>
        </Stack>
      </form>


      <FileMenu />


    </Fragment>
  )
}

export default AppLayout()(Chat);