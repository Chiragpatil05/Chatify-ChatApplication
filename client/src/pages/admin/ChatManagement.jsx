import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import AvatarCard from "../../components/shared/AvatarCard";
import Table from '../../components/shared/Table';
import { dashboardData } from '../../constants/sampleData';
import { transformImage } from '../../lib/features';

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
        field: "avatar",
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 150,
        renderCell:(params) => <AvatarCard avatar={params.row.avatar}/>
    
    },
    {
        // column 3 
        field: "name",
        headerName: "Name",
        headerClassName : "table-header",
        width: 300
    },
    {
        // column 4 
        field: "totalMembers",
        headerName: "Total Members",
        headerClassName : "table-header",
        width: 120
    },
    {
         // column 5 
        field: "members",
        headerName: "Members",
        headerClassName : "table-header",
        width: 400,
        renderCell:(params)=><AvatarCard max={100} avatar={params.row.members}/>
    },
    {
         // column 4 
        field: "totalMessages",
        headerName: "Total Messages",
        headerClassName : "table-header",
        width: 200
    },
    {
        // column 4 
        field: "creator",
        headerName: "Created By",
        headerClassName : "table-header",
        width: 250,
        renderCell:(params) => (
            <Stack direction="row" alignItems="center" spacing={"1rem"}>
                <Avatar alt={params.row.creator.name} src={params.row.creator.avatar}/>
                <span> {params.row.creator.name} </span>
            </Stack>
        ) 
    },
];

const ChatManagement = () => {

    const [rows , setRows] = useState([]);

    useEffect(() => {
        setRows(dashboardData.chats.map((chat) => ({
            ...chat,
            id: chat._id,
            avatar: chat.avatar.map((ava) => transformImage(ava,50)),
            members: chat.members.map((member) => transformImage(member.avatar , 50)),
            creator:{
                name: chat.creator.name,
                avatar: transformImage(chat.creator.avatar , 50)
            }
        })))
    } , [])

return (
    <AdminLayout>

        <Table 
        heading={"All Chats"} 
        rows={rows}
        columns={columns}
        />

    </AdminLayout>
)
}


export default ChatManagement