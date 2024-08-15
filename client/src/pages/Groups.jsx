import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import {Link} from "../components/styles/StyledComponents"
import AvatarCard from "../components/shared/AvatarCard"
import {sampleChats} from "../constants/sampleData"
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { sampleUsers } from '../constants/sampleData';
import UserItem from '../components/shared/UserItem';


const ConfirmDeleteDialog = lazy(()=> import("../dialogs/ConfirmDeleteDialog"));

const AddMemberDialog = lazy(() => import("../dialogs/AddMemberDialog"));

const isAddMember = false;

const Groups = () => {

  const chatId = useSearchParams()[0].get("group");

  const [isMobileMenuOpen , setIsMobileMenuOpen] = useState(false);
  const [isEdit , setIsEdit] = useState(false);
  const [groupName , setGroupName] = useState("");
  const [groupNameUpdatedValue , setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog , setConfirmDeleteDialog] = useState(false);


  // console.log(chatId)
  // console.log(groupNameUpdatedValue)

  const navigate = useNavigate();

  const navigateBack = () => {
    console.log("back button pressed in group page");
    navigate("/"); 
  }

  const handleMobile = () => {
    console.log("menu button clicked in group page");
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }

  const updateGroupName = () => {
    setIsEdit(false);
    console.log("group name changed succesfully to" , groupNameUpdatedValue);
  }


  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("delete group button icon clicked")
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  const openAddMember = () => {
    console.log("add member icon clicked")
  }

  const deleteHandler = () => {
    console.log("delete the group");
    closeConfirmDeleteHandler();
  }

  const removeMemberHandler = (id) => {
    console.log(`remove the user with ${id} from the group`)
  }

  useEffect( () => {
    if(chatId){
      setGroupName(`Group Name of ${chatId}`);
      setGroupNameUpdatedValue(`Group Name of ${chatId}`);
    }

    // dobara useEffect run hone se phele ye function run hoga
    return ()=> {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit("");
    }
  }, [chatId])


  const IconBtns = <>

  <Box sx={{display:{xs:"block" , sm:"none" , position:"fixed", right:"2rem" , top:"2rem"}}}>
    <Tooltip title="Menu">
      <IconButton onClick={handleMobile}>
        <MenuIcon/>
      </IconButton>
    </Tooltip>
  </Box>


    <Tooltip title="Back">
      <IconButton  onClick={navigateBack} sx={{
        position:"absolute" , 
        top:"2rem" , 
        left:"2rem" , 
        bgcolor:"rgba(0,0,0,0.85)" , 
        color:"white",
        ":hover":{
          bgcolor:"rgba(0,0,0,0.7)"
        }
        }}>
        <KeyboardBackspaceIcon/>
      </IconButton>
    </Tooltip>
  </>

const GroupName = <>
  <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
    {
      isEdit ? (
        <>
          <TextField onChange={(e) => setGroupNameUpdatedValue(e.target.value)}/>
          <IconButton onClick={updateGroupName}>
            <DoneIcon/>
          </IconButton>
        </>
      ) 
      : (
        <>
          <Typography variant='h4'> {groupName} </Typography>
          <IconButton onClick={()=> setIsEdit(true)}> 
            <EditIcon/>
          </IconButton>
        </>
      )

    }
  </Stack>
</>

const ButtonGroup = (
  <Stack direction={{ xs:"column-reverse", sm:"row"}} spacing={"1rem"} p={{xs:"0" , sm:"1rem" , md:"1rem 4rem"}}>
    
    <Button size="large" variant="contained" color="error" startIcon={<DeleteIcon/>}
    onClick={openConfirmDeleteHandler}
    >
      Delete Group
    </Button>

    <Button size="large" variant='contained' startIcon={<AddIcon/>}
    onClick={openAddMember}
    >
      Add Member
    </Button>
  </Stack>
)


  return(
    <Grid container height={"100vh"}>

      {/* group list wala container */}
      <Grid item sm={4} sx={{display:{xs:"none" , sm:"block"},color:"black"}}
      bgcolor={"#DBD8E3"}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId}/>
      </Grid>

      {/* manage group wala container */}
      <Grid item xs={12} sm={8} sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"relative",
        padding:"1rem 3rem"
      }}>

        {IconBtns}

        {groupName &&
          <>
            {GroupName}

            <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body1'>
              Members
            </Typography>

            <Stack maxWidth={"45rem"} width={"100%"} boxSizing={"border-box"} 
            padding={{sm:"1rem" , xs:"0" , md:"1rem 4rem"}} spacing={"2rem"} 
            height={"50vh"} overflow={"auto"} 
            // color={"white"} bgcolor={"rgba(0,0,0,0.85)"}
            >
                {/* group members here */}
                {
                  sampleUsers.map((user)=>(
                    <UserItem user={user} isAdded handler={removeMemberHandler} key={user._id}
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding:"1rem",
                      borderRadius:"1rem"
                    }}
                    />
                  ))
                }

            </Stack>


            {ButtonGroup}
          </>
        }
      </Grid>


      {
        isAddMember && (
          <Suspense fallback={<Backdrop open/>}>  
            <AddMemberDialog/>
          </Suspense>
        )
      }


        {/* delete group dialog */}
        {
          confirmDeleteDialog && 
          <Suspense fallback={<Backdrop open/>}>
              <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
              />
          </Suspense>
        }




      {/* drawer for mobile menu */}
      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}
      sx={{
        display:{xs:"block" , sm:"none"}
      }}>
        <GroupsList myGroups={sampleChats} chatId={chatId} w={"50vw"}/>
      </Drawer>

    </Grid>
  )
}


const GroupsList = ({w="100%", myGroups=[] , chatId}) => (
  <Stack width={w} sx={{height:"100vh" , overflow:"auto"}}>
    {
      myGroups.length > 0 ? myGroups.map((group)=> 
          <GroupListItem group={group} chatId={chatId} key={group._id}/>)
      :
      (
        <Typography>No Groups</Typography>
      )
    }
  </Stack>
);


const GroupListItem = memo(({group , chatId}) => {
  const {name , avatar , _id} = group;

  return <Link to={`?group=${_id}`} 
  onClick={e => { if(chatId === _id) e.preventDefault() }}
  >

    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <AvatarCard avatar={avatar}/>
      <Typography> {name} </Typography>
    </Stack>

  </Link>
})



export default Groups