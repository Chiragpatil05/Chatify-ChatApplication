import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightBlue } from '../../constants/color';
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({message , user}) => {

    const {sender , content , attachments = [] , createdAt} = message;

    const timeAgo = moment(createdAt).fromNow();

    // jisne message bheja aur jo user hai login wo same hai
    // same sender mai - user ki id aur sender ki id same hogi
    const sameSender = sender?._id === user?._id;

return (
    <div
    style={{
        alignSelf:sameSender?"flex-end":"flex-start",
        // backgroundColor:"white",
        backgroundColor:"rgba(0,0,0,0.85)",
        color:"white",
        borderRadius: "10px 10px 0 10px",
        padding :"0.5rem",
        width:"fir-content"
    }}
    >

    {/* user name */}
    { !sameSender && <Typography color={lightBlue} fontWeight={"600"} variant='caption'>
        {sender.name}
    </Typography> }

    {/* message or content */}
    { content && <Typography>{content}</Typography> }

    {/* attachments */}
    {
        attachments.length > 0 && attachments.map((attachment,index)=>{
            const url = attachment.url;
            const file = fileFormat(url)
            return (
                <Box key={index}>
                <a href={url} target='_blank' download style={{color:"white"}}>
                    {RenderAttachment(file,url)}
                </a>
            </Box>
            )
        })
    }


    {/*  message date */}
    <Typography variant='caption' color={"#D3D3D3,"}>{timeAgo}</Typography>

    </div>
)
}

export default memo(MessageComponent)
// jab tak messagecomponent ka prop change nhi hota ye re render nahi hoga