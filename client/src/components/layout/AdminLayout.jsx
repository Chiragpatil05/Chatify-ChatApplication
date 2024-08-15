import React, { useState } from 'react'
import {Box, Drawer, Grid, IconButton, Stack, Typography, styled} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useLocation , Link as LinkComponent, useNavigate, Navigate} from "react-router-dom"    
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Link = styled(LinkComponent)`
    text-decoration: none;
    border-radius : 2rem;
    padding : 1rem 2rem;
    color: black;
    &:hover{
        color: #3C3633; 
    }
`

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccountsIcon />,
    },  
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <GroupsIcon />,
    },  
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon />,
    },  
];


const Sidebar = ({w="100%"}) => {
    
    const location = useLocation();

    const logoutHandler = () => {
        console.log("logout");
    }

    return(
        <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>

            <Typography variant='h5' textTransform={"uppercase"} >
                chatify
            </Typography>

            <Stack spacing={"1rem"} >
                {
                    adminTabs.map((tab)=>(
                        <Link key={tab.path} to={tab.path} 
                        sx={
                            location.pathname === tab.path && {
                                bgcolor:"black",
                                color:"white",
                                ":hover":{color:"white"}
                            }
                        }
                        >
                            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                                {tab.icon}
                                <Typography fontSize={"1.2rem"}> {tab.name} </Typography>
                            </Stack>
                        </Link>
                    ))
                }

                    <Link onClick={logoutHandler}>
                            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                                <ExitToAppIcon/>
                                <Typography fontSize={"1.2rem"}> Logout </Typography>
                            </Stack>
                        </Link>

            </Stack>
        </Stack>
    )
}


const isAdmin = true;


const AdminLayout = ({children}) => {

    const [isMobile , setIsMobile] = useState(false);

    const handleMobile = () => {
        console.log("menu icon clicked on admin dashboard page");
        setIsMobile(!isMobile)
    }

    const handleClose = () => {
        console.log("close the sidebar drawer");
        setIsMobile(false);
    }

    if(!isAdmin) return <Navigate to="/admin" />


return (
    <Grid container minHeight={"100vh"} >

        <Box sx={{
            display:{xs:"block" , md:"none"},
            position:"fixed",
            right:"1rem",
            top:"1rem", 
            color:"white"
        }}>

            <IconButton onClick={handleMobile} sx={{color:"white"}}>
                {
                    isMobile ? <CloseIcon/> : <MenuIcon/>
                }
            </IconButton>
        </Box>


        {/* sidebar */}
        <Grid item md={4} lg={3} sx={{display:{xs:"none" , md:"block"}}}>
            <Sidebar/>
        </Grid>

        {/* children */}
        <Grid item xs={12} md={8} lg={9} sx={{bgcolor:"#3C3633" , color:"white"}}>
            {children}
        </Grid>


        {/* drawer for sidebar in mobile screen */}
        <Drawer open={isMobile} onClose={handleClose}>
            <Sidebar w="50vw"/>
        </Drawer>

    </Grid>
)
}

export default AdminLayout