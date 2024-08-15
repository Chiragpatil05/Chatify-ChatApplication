import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import  AlternateEmailIcon from '@mui/icons-material/AlternateEmail'; 
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment"

const Profile = () => {
return (
    <Stack spacing={"2rem"} direction={'column'} alignItems={"center"}>
        <Avatar      sx={{width:200 , height:200 , objectFit:"contain" , marginBottom:"1rem" , border:"5px solid white"}}/>
        <ProfileCard 
        heading={"bio"} 
        text={"Look back and thank god , look forward and trust god 🌟 💗"}/>
        
        <ProfileCard 
        Icon ={<AlternateEmailIcon/>} 
        heading={"username"} 
        text={"chir.aag"}/>
        
        <ProfileCard 
        Icon={<FaceRetouchingNaturalIcon/>} 
        heading={"name"} 
        text={"Chirag Patil"}/>

        <ProfileCard 
        Icon={<CalendarMonthIcon/>} 
        heading={"joined"} 
        text={moment('2024-05-03T18:30:00.000Z').fromNow()}/>
    </Stack>
)
}


const ProfileCard = ({text , Icon , heading}) => {
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
            {Icon && Icon}

            <Stack>
                <Typography variant='body1'>{text}</Typography>
                <Typography variant='caption' color={"gray"}>{heading}</Typography>
            </Stack>

        </Stack>
    )
}

export default Profile