import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from "../components/shared/UserItem"

const AddMemberDialog = ({addMember , isLoadingAddMember , chatId}) => {

    const [members , setMembers] = useState(sampleUsers);
    const [selectedMembers , setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id])
    }

    const addMemberSubmitHandler = (id) => {
        console.log(`friends with ${id} added successfully on clicking submit changes btn`)
        closeHandler();
    }

    const closeHandler = () => {
        console.log("canel button clicked , no friends added");
        setSelectedMembers([]);
        setMembers([]);
    }

return(
    <Dialog open onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
            <DialogTitle textAlign={"center"}> Add Member </DialogTitle>

            <Stack spacing={"1rem"}>
                {
                    members.length > 0 ? (
                        members.map((user)=>(
                            <UserItem user={user} key={user.id} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
                        ))
                    )
                    :
                    <Typography textAlign={"center"}> 
                        No friends  
                    </Typography>
                }
            </Stack>


            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}
            onClick={closeHandler}
            >
                <Button color="error">
                    Cancel
                </Button>

                <Button color="success" disabled={isLoadingAddMember}
                onClick={addMemberSubmitHandler}
                >
                    Submit Changes
                </Button>
            </Stack>

        </Stack>
    </Dialog>
)

}

export default AddMemberDialog