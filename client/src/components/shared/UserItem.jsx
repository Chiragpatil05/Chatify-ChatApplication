import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const UserItem = ({ user , handler , handlerIsLoading , isAdded = false , styling={}}) => {

    const {name , _id , avatar} = user;


return (
        <ListItem>
            <Stack 
            direction={"row"} 
            alignItems={"center"} 
            spacing={"1rem"} 
            width={"100%"}
            {...styling}
            >
                <Avatar src={avatar} />
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
                    {name} 
                </Typography>

                <IconButton 
                onClick={() => handler(_id)} 
                disabled={handlerIsLoading }
                size='small' 
                sx={{ 
                    bgcolor:isAdded?"error.main":"primary.main",
                    color:"white",
                    "&:hover": {bgcolor : isAdded ? "error.dark" : "primary.dark"},
                }}
                >
                
                {
                    isAdded ? <RemoveIcon/> : <AddIcon/>
                }

                </IconButton>

            </Stack>
        </ListItem>
)
}

export default memo(UserItem);
// memo mai isliye wrap kiya kyuni , jab tak ListItem ke prop mai koi change nahi hota ye re render nahi hoga