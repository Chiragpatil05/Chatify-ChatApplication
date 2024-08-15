import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material';
import { dashboardData } from '../../constants/sampleData';
import {transformImage} from '../../lib/features'

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
        renderCell:(params) => (
            <Avatar src={params.row.avatar} alt={params.row.name}/>
        )
    },
    {
        // column 3 
        field: "name",
        headerName: "Name",
        headerClassName : "table-header",
        width: 200
    },
    {
        // column 4 
        field: "username",
        headerName: "Username",
        headerClassName : "table-header",
        width: 200
    },
    {
         // column 5 
        field: "friends",
        headerName: "Friends",
        headerClassName : "table-header",
        width: 150
    },
    {
         // column 4 
        field: "groups",
        headerName: "Groups",
        headerClassName : "table-header",
        width: 200
    },
];

const UserManagement = () => {

    const [rows , setRows] = useState([]);

    // console.log(dashboardData)

    useEffect(()=>{
        setRows(dashboardData.users.map((user)=> (
            {...user, 
                id: user._id , 
                avatar: transformImage(user.avatar,50)
            }
        )))
    } , []);

return (
    <AdminLayout>

        <Table 
        heading={"All Users"} 
        rows={rows}
        columns={columns}
        />

    </AdminLayout>
)
}

export default UserManagement