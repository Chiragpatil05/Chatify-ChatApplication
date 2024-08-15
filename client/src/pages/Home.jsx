import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import main from "../assets/main.gif"

const Home = () => {
  return(
    <Box>
      <Typography p={"2rem"} variant='h5' textAlign={"center"}>
        Select a friend to chat
      </Typography>

      {/* changes by me - kuch dikkat aaye toh ye hata dena*/} 
      <Box display={"flex"} justifyContent={"center"} mt={"50px"}>
      <Box sx={{display:{xs:"none" , sm:"block" , md:"block"}}}>
        <img src={main} width={"300px"} />
      </Box>
      </Box>
      {/*  */}
    
    </Box>

  )
}

export default AppLayout()(Home);