import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useInputValidation} from "6pp"
import SearchIcon from '@mui/icons-material/Search';
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';


const Search = () => {

  const search = useInputValidation("");
  const [users , setUsers] = useState(sampleUsers);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log(id);
  }

  return (
    <Dialog open >
      <Stack p={"2rem"} direction={'column'} width={"25rem"}>
        
        <DialogTitle textAlign={"center"}> Find People </DialogTitle>

        <TextField 
        label="" 
        value={search.value} 
        onChange={search.changeHandler}
        id="filled-basic" 
        variant="filled"
        size='small'
        InputProps={{
          startAdornment:(
            <InputAdornment>
              <SearchIcon/>
            </InputAdornment>
          )
        }}
        />

        <List>
          {
            users.map((user)=>(
              <UserItem
              key={user._id} 
              user={user} 
              handler={addFriendHandler} 
              handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          }
        </List>


      </Stack>
    </Dialog>
  )
}

export default Search;