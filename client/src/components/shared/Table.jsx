import React from 'react'
import {Container, Paper, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"

const Table = ({rows , columns , heading , rowHeight = 52}) => {
return (
    // conatiner mai margin top mene di hai , kuch dikkat aaye toh hata dena
    <Container sx={{height:"80vh"}} style={{marginTop:"5rem"}}>
        <Paper elevation={3}
        sx={{
            padding:"1rem 4rem",
            borderRadius:"2rem",
            margin:"auto",
            width:"100%",
            overflow:"hidden",
            height:"100%",
            boxShadow:"none"
        }}
        >

            <Typography 
            textAlign={"center"} 
            variant='h4' 
            sx={{
                margin:'2rem',
                textTransform:'uppercase'
            }}
            >
                {heading} 
            </Typography>

            <DataGrid 
            rows={rows} 
            columns={columns} 
            rowHeight={rowHeight}
            style={{
                height:"80%"
            }}
            sx={{
                border:"none",
                ".table-header":{
                    bgcolor:"#3C3633",
                    color:"white"
                },

            }}
            
            />
        </Paper>
    </Container>
)
}

export default Table