import React, { lazy, useState , Suspense } from 'react';
import {useNavigate} from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

// lazy - dynamically load the components
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {

    const navigate = useNavigate();

    const [isMobile , setIsMobile] = useState(false);
    const [isSearch , setIsSearch] = useState(false);
    const [isNewGroup , setIsNewGroup] = useState(false);
    const [isNotification , setIsNotification] = useState(false);

    const handleMobile = () =>{
        // setIsMobile(!isMobile);
        setIsMobile((prev) => !prev);
        console.log("mobile");
    }

    const openSearch = () => {
        setIsSearch((prev) => !prev);
        console.log("search icon clicked , open search dialog");
    }

    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev);
        console.log("add icon clicked , open new group dialog")
    }

    const navigateToGroup = () => {
        navigate('/groups');
        console.log("group icon clicked , open the group page");
    }

    const logoutHandler = () => {
        // navigate('/login');
        console.log("Logout icon clicked , logout the user navigate to login page");
    }

    const openNotification = () => {
        setIsNotification((prev) => !prev)
        console.log("notificatio icon clicked , show all notifications")
    }

return (
    <>
        <Box height={"4rem"}  sx={{flexGrow:1}}>
            <AppBar position='static' sx={{bgcolor:"#2A2438"}}>
             {/* toolbar kuch padding and margin dega default */}
                <Toolbar> 
                    
                    {/* heading of app  */}
                    <Typography variant='h6' sx={{display:{xs:"none" , sm:"block"}}}>
                        Chatify
                    </Typography>

                   {/* mobile pe drawer aagyega */}
                    <Box sx={{display:{xs:"block" , sm:"none"}}}>
                        <IconButton color='inherit' onClick={handleMobile}>
                            <MenuIcon></MenuIcon>
                        </IconButton>
                    </Box>

                    {/* taaki menu items ko right side le ja sake */}
                    <Box sx={{flexGrow:1}}/>

                    {/* nav items ke liye box */}
                    <Box>
                        {/* search icon  */}
                        <IconBtn title={"Search"} icon={<SearchIcon/>} onClick={openSearch}/>
                        
                        <IconBtn title={"New Group"} icon={<AddIcon/>} onClick={openNewGroup}/>

                        <IconBtn title={"Manage Group"} icon={<GroupIcon/>} onClick={navigateToGroup}/>

                        <IconBtn title={"Notifications"} icon={<NotificationsIcon/>} onClick={openNotification}/>
        
                        <IconBtn title={"Logout"} icon={<LogoutIcon/>} onClick={logoutHandler}/>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>

        
        { isSearch && (
            <Suspense fallback={<Backdrop open/>}> 
                <SearchDialog/>
            </Suspense>
        )}

        {
            isNotification && (
                <Suspense fallback={<Backdrop open/>}> 
                    <NotificationDialog/>
                </Suspense>
            )
        }

        {
            isNewGroup && (
                <Suspense fallback={<Backdrop open/>}>
                    <NewGroupDialog/>
                </Suspense>
            )
        }
    </>
)
};


const IconBtn = ({title , icon , onClick}) => {
    return(
        <Tooltip title={title}>
            <IconButton color='inherit' size="large" onClick={onClick}>
                {icon}
            </IconButton>
    </Tooltip>
    )
}

export default Header