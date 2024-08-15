import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import GroupIcon from '@mui/icons-material/Group'
import MessageIcon from '@mui/icons-material/Message'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import moment from "moment"
import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'

const Dashboard = () => {


    const Appbar = <Paper elevation={3} sx={{
            padding:"1rem" , margin:"3rem 0" , borderRadius:"1rem" , display:{xs:"none" , sm:"block"}
        }}>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <AdminPanelSettingsIcon sx={{fontSize:"3rem"}}/>

            <SearchField placeholder='Search here ...'/>
            
            {/* yaha par mene change kara hai kuch gadbad ho toh hata dena */}
            <CurveButton> <SearchIcon/> </CurveButton>

            <Box flexGrow={1}/>

            <Typography display={{xs:"none" , lg:"block"}} color={"rgba(0,0,0,0.7)"} textAlign={"center"}> 
                {moment().format("dddd , D MMMM  YYYY")} 
            </Typography>

            <NotificationsIcon/>

        </Stack>

    </Paper>


    const Widgets = <Stack direction={{xs:"column" , sm:"row"}} 
    justifyContent={"space-between"} alignItems={"center"} margin={"2rem 0"}
    >
        <Widget title={"Users"} value={34} Icon={<PersonIcon/>}/>
        <Widget title={"Chats"} value={67} Icon={<GroupIcon/>}/>
        <Widget title={"Messages"} value={976} Icon={<MessageIcon/>}/>
    </Stack>



return (
    // admin layout ka children -> dashboard hai
    <AdminLayout>
        <Container component={"main"}>
            {/* app bar */}
            {Appbar}

            
            <Stack direction={{xs:"column",lg:"row"}}
            flexWrap={"wrap"} 
            justifyContent={"center"} 
            alignItems={{xs:"center" , lg:"stretch"}}
            sx={{
                gap:"2rem"
            }}
            >
                <Paper elevation={3} sx={{
                    padding:"2rem 3.5rem",
                    borderRadius:"1rem",
                    width:"100%",
                    maxWidth:"40rem",

                }}>
                    <Typography margin={"2rem 0 "} variant='h4'>Last Messages</Typography>
                    <LineChart value={[1,2,5,6,9]}/>
                </Paper>

                <Paper elevation={3} sx={{
                    padding:"1rem",
                    borderRadius:"1rem",
                    display:"flex",
                    justifyContent:"center",
                    alignContent:"center",
                    width:{xs:"100%" , sm:"50%"},
                    position:"relative",
                    maxWidth:"25rem",
                }}>
                    <DoughnutChart 
                    value = {[40 , 55]} // yaha par kuch error aarhai hai 
                    labels={["Single Chats" , "Group Chats"]}/>

                    <Stack position={"absolute"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"0.5rem"} width={"100%"} height={"100%"}>
                        <GroupIcon/> <Typography>Vs</Typography>
                        <PersonIcon/> 
                    </Stack>
                </Paper>


            </Stack>

            {/* widgets */}
            {Widgets}

        </Container>
    </AdminLayout>   
)
};


const Widget = ({title , value , Icon}) =>(
    <Paper elevation={9} sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
        width:"20rem",
        spacing:"2rem"
    }}>
        <Stack alignItems={"center"} spacing={"1rem"}>
            <Typography sx={{
                color: "rgba(0,0,0,0.9)",
                border: "5px solid rgba(0,0,0,0.9)",
                borderRadius: "50%",
                width: "5rem",
                height: "5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {value}
            </Typography>

            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                {Icon}
                <Typography>{title}</Typography>
            </Stack>

        </Stack>
    </Paper>
) 



export default Dashboard