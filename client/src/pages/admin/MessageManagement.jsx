import React, { useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table';
import { useState } from 'react';
import { dashboardData } from '../../constants/sampleData';
import { fileFormat, transformImage } from '../../lib/features';
import moment from 'moment';
import { Avatar, Box, Stack } from '@mui/material';
import RenderAttachment from "../../components/shared/RenderAttachment"

// columns ka format esa hoga
const columns = [
    {   // column 1
        field: "id", // this is as a refrence
        headerName: "ID", // aur column name mai dikhegi
        headerClassName: "table-header",
        width: 200
    },
    {
        // column 2
        field: "attachments",
        headerName: "Attachments",
        headerClassName: "table-header",
        width: 200,
        renderCell:(params) => {

            const {attachments} = params.row;
            
            return attachments?.length > 0 ? attachments.map((attachment)=>{
                const url = attachment.url;
                const file = fileFormat(url);
                return <Box>
                    <a href={attachment.url} download target='_black' style={{color:"black"}}>
                        {RenderAttachment(file,url)}
                    </a>
                </Box>
                return <Avatar src={attachment.url} alt={attachment.name}/>
            })
            :
            "No attachments" 

        }
    },
    {
        // column 3 
        field: "content",
        headerName: "Content",
        headerClassName : "table-header",
        width: 400
    },
    {
        // column 4 
        field: "sender",
        headerName: "Sent By",
        headerClassName : "table-header",
        width: 200,
        renderCell:(params) => (
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                <Avatar src={params.row.sender.avatar} alt={params.row.sender.name}/>
                <span> {params.row.sender.name} </span>
            </Stack>
        )
    },
    {
         // column 5 
        field: "chat",
        headerName: "Chat",
        headerClassName : "table-header",
        width: 220
    },
    {
         // column 4 
        field: "groupChat",
        headerName: "Group Chat",
        headerClassName : "table-header",
        width: 100
    },
    {
        field: "createdAt",
        headerName: "Time",
        headerClassName : "table-header",
        width: 250
    }
];

const MessageManagement = () => {

    const [rows , setRows] = useState([]);

    useEffect(()=>{
        setRows(dashboardData.messages.map((message)=> (
            {
                ...message ,
                id: message._id,
                sender:{
                    name: message.sender.name,
                    avatar: transformImage(message.sender.avatar,50)
                },
                createdAt:moment(message.createdAt).format("MMMM D YYYY, h:mm:ss a")
            }
        )))
    } , [])

return (
    <AdminLayout>
        <Table 
        heading={"All messages"} 
        rows={rows}
        columns={columns}
        rowHeight={200}
        />
    </AdminLayout>
)
}

export default MessageManagement