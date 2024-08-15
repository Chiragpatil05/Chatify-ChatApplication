import { Container, Paper, Typography , TextField , Button, Stack, Avatar, IconButton} from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {useFileHandler, useInputValidation} from "6pp";
import { usernameValidator } from '../utils/validators';
import { useStrongPassword } from '6pp';


const Login = () => {

    const[isLogin , setIsLogin] = useState(true);

    // const form_value = useInputValidator(initialValue , validator)
    // form -> value={form_value.value} onChange={form_value.ChangeHandler}
    const name = useInputValidation("");
    const username = useInputValidation("",usernameValidator);
    const bio = useInputValidation("");
    // const password = useInputValidation("");
    const password = useStrongPassword();
    const avatar = useFileHandler("single");

    const toggleLogin = () => {
        setIsLogin(prev => !prev);
        // setIsLogin(!isLogin)
    }

    const handleLogin = (e) => {
        e.prevntDefault();
    }

    const handleSignup = (e) => {
        e.prevntDefault();
    }

return (  
    <div style={{ 
        backgroundImage: "linear-gradient(161deg, rgba(121, 121, 121, 0.02) 0%, rgba(121, 121, 121, 0.02) 16.667%,rgba(193, 193, 193, 0.02) 16.667%, rgba(193, 193, 193, 0.02) 33.334%,rgba(177, 177, 177, 0.02) 33.334%, rgba(177, 177, 177, 0.02) 50.001000000000005%,rgba(5, 5, 5, 0.02) 50.001%, rgba(5, 5, 5, 0.02) 66.668%,rgba(229, 229, 229, 0.02) 66.668%, rgba(229, 229, 229, 0.02) 83.33500000000001%,rgba(211, 211, 211, 0.02) 83.335%, rgba(211, 211, 211, 0.02) 100.002%),linear-gradient(45deg, rgba(223, 223, 223, 0.02) 0%, rgba(223, 223, 223, 0.02) 14.286%,rgba(70, 70, 70, 0.02) 14.286%, rgba(70, 70, 70, 0.02) 28.572%,rgba(109, 109, 109, 0.02) 28.572%, rgba(109, 109, 109, 0.02) 42.858%,rgba(19, 19, 19, 0.02) 42.858%, rgba(19, 19, 19, 0.02) 57.144%,rgba(180, 180, 180, 0.02) 57.144%, rgba(180, 180, 180, 0.02) 71.42999999999999%,rgba(63, 63, 63, 0.02) 71.43%, rgba(63, 63, 63, 0.02) 85.71600000000001%,rgba(87, 87, 87, 0.02) 85.716%, rgba(87, 87, 87, 0.02) 100.002%),linear-gradient(337deg, rgba(142, 142, 142, 0.02) 0%, rgba(142, 142, 142, 0.02) 20%,rgba(164, 164, 164, 0.02) 20%, rgba(164, 164, 164, 0.02) 40%,rgba(203, 203, 203, 0.02) 40%, rgba(203, 203, 203, 0.02) 60%,rgba(228, 228, 228, 0.02) 60%, rgba(228, 228, 228, 0.02) 80%,rgba(54, 54, 54, 0.02) 80%, rgba(54, 54, 54, 0.02) 100%),linear-gradient(314deg, rgba(187, 187, 187, 0.02) 0%, rgba(187, 187, 187, 0.02) 12.5%,rgba(170, 170, 170, 0.02) 12.5%, rgba(170, 170, 170, 0.02) 25%,rgba(214, 214, 214, 0.02) 25%, rgba(214, 214, 214, 0.02) 37.5%,rgba(187, 187, 187, 0.02) 37.5%, rgba(187, 187, 187, 0.02) 50%,rgba(190, 190, 190, 0.02) 50%, rgba(190, 190, 190, 0.02) 62.5%,rgba(6, 6, 6, 0.02) 62.5%, rgba(6, 6, 6, 0.02) 75%,rgba(206, 206, 206, 0.02) 75%, rgba(206, 206, 206, 0.02) 87.5%,rgba(171, 171, 171, 0.02) 87.5%, rgba(171, 171, 171, 0.02) 100%),linear-gradient(300deg, rgba(243, 243, 243, 0.01) 0%, rgba(243, 243, 243, 0.01) 12.5%,rgba(209, 209, 209, 0.01) 12.5%, rgba(209, 209, 209, 0.01) 25%,rgba(179, 179, 179, 0.01) 25%, rgba(179, 179, 179, 0.01) 37.5%,rgba(3, 3, 3, 0.01) 37.5%, rgba(3, 3, 3, 0.01) 50%,rgba(211, 211, 211, 0.01) 50%, rgba(211, 211, 211, 0.01) 62.5%,rgba(151, 151, 151, 0.01) 62.5%, rgba(151, 151, 151, 0.01) 75%,rgba(16, 16, 16, 0.01) 75%, rgba(16, 16, 16, 0.01) 87.5%,rgba(242, 242, 242, 0.01) 87.5%, rgba(242, 242, 242, 0.01) 100%),linear-gradient(6deg, rgba(31, 31, 31, 0.02) 0%, rgba(31, 31, 31, 0.02) 20%,rgba(193, 193, 193, 0.02) 20%, rgba(193, 193, 193, 0.02) 40%,rgba(139, 139, 139, 0.02) 40%, rgba(139, 139, 139, 0.02) 60%,rgba(14, 14, 14, 0.02) 60%, rgba(14, 14, 14, 0.02) 80%,rgba(122, 122, 122, 0.02) 80%, rgba(122, 122, 122, 0.02) 100%),linear-gradient(279deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 14.286%,rgba(160, 160, 160, 0.02) 14.286%, rgba(160, 160, 160, 0.02) 28.572%,rgba(23, 23, 23, 0.02) 28.572%, rgba(23, 23, 23, 0.02) 42.858%,rgba(60, 60, 60, 0.02) 42.858%, rgba(60, 60, 60, 0.02) 57.144%,rgba(149, 149, 149, 0.02) 57.144%, rgba(149, 149, 149, 0.02) 71.42999999999999%,rgba(4, 4, 4, 0.02) 71.43%, rgba(4, 4, 4, 0.02) 85.71600000000001%,rgba(50, 50, 50, 0.02) 85.716%, rgba(50, 50, 50, 0.02) 100.002%),linear-gradient(109deg, rgba(124, 124, 124, 0.03) 0%, rgba(124, 124, 124, 0.03) 12.5%,rgba(61, 61, 61, 0.03) 12.5%, rgba(61, 61, 61, 0.03) 25%,rgba(187, 187, 187, 0.03) 25%, rgba(187, 187, 187, 0.03) 37.5%,rgba(207, 207, 207, 0.03) 37.5%, rgba(207, 207, 207, 0.03) 50%,rgba(206, 206, 206, 0.03) 50%, rgba(206, 206, 206, 0.03) 62.5%,rgba(118, 118, 118, 0.03) 62.5%, rgba(118, 118, 118, 0.03) 75%,rgba(89, 89, 89, 0.03) 75%, rgba(89, 89, 89, 0.03) 87.5%,rgba(96, 96, 96, 0.03) 87.5%, rgba(96, 96, 96, 0.03) 100%),linear-gradient(329deg, rgba(35, 35, 35, 0.02) 0%, rgba(35, 35, 35, 0.02) 20%,rgba(246, 246, 246, 0.02) 20%, rgba(246, 246, 246, 0.02) 40%,rgba(118, 118, 118, 0.02) 40%, rgba(118, 118, 118, 0.02) 60%,rgba(245, 245, 245, 0.02) 60%, rgba(245, 245, 245, 0.02) 80%,rgba(140, 140, 140, 0.02) 80%, rgba(140, 140, 140, 0.02) 100%),linear-gradient(90deg, hsl(314,0%,31%),hsl(314,0%,31%))"
    }}>
        <Container component={"main"} maxWidth="xs" sx={{height:"100vh" , display:"flex" , justifyContent:"center" , alignItems:"center"}}>
        <Paper 
            elevation={6} 
            square={false}
            sx={{
                padding:2,
                display:'flex',
                flexDirection:'column',
                alignItems:"center",
                background: "background: linear-gradient(113.5deg, rgb(234, 234, 234) 22.3%, rgb(201, 234, 211) 56.6%, rgb(255, 180, 189) 90.9%);"
            }}
        >

        {isLogin ?
            <>
                <Typography variant='h5' sx={{fontFamily:"monospace"}}>Login</Typography>
                <form onSubmit={handleLogin} style={{width:"100%" , marginTop:"1rem"}}>
                    <TextField value={username.value} onChange={username.changeHandler} required fullWidth margin='normal' id="filled-basic" label="Username" variant="filled" style={{fontFamily:"monospace"}}/>
                    <TextField value={password.value} onChange={password.changeHandler} required fullWidth margin='normal' id="filled-basic" label="Password" type='password' variant="filled"/>
                    <Button variant="contained"  type='submit' color='primary' endIcon={<LoginIcon/>} fullWidth sx={{marginTop:'1rem'}}>Login </Button>
                    <Typography textAlign={"center"} margin={"1rem"} fontFamily={"monospace"} >OR</Typography>
                    <Button onClick={toggleLogin} variant="text"  type='submit' color='primary' fullWidth  endIcon={<HowToRegIcon/>}>Sign up instead </Button>
                </form>
            </>
        
        : 
        
        <>  
            <Typography variant='h5' sx={{fontFamily:"monospace"}}>Sign Up</Typography>
            <form onSubmit={handleSignup} style={{width:"100%" , marginTop:"rem"}}>
                <Stack position={"relative"} margin={"auto"} width={"10rem"}>
                    <Avatar src={avatar.preview} sx={{height:"8rem" , width:"8rem" , objectFit:"contain"}} />
                    <IconButton sx={{position:"absolute" , color:"white" ,bottom:"0" , right:"2" , bgcolor:"rgba(0,0,0,0.5)" , ":hover":{bgcolor:"rgba(,0,0,0.7)"}}}
                    component="label">
                        <>
                            <AddAPhotoIcon/>
                            <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                        </> 
                    </IconButton>
                </Stack>
                {
                        avatar.error && (
                            <Typography  color="error" variant='caption' m={"1rem auto"} width={"fit-content"} display={"block"} >
                                {avatar.error}
                            </Typography>
                        )
                    }
                <TextField value={name.value} onChange={name.changeHandler} required fullWidth margin='normal' id="filled-basic" label="Name" variant="filled" style={{fontFamily:"monospace"}}/>
                <TextField value={username.value} onChange={username.changeHandler} required fullWidth margin='normal' id="filled-basic" label="Username" variant="filled" style={{fontFamily:"monospace"}}/>
                {
                    username.error && (
                        <Typography color="error" variant='caption'>
                            {username.error}
                        </Typography>
                    )
                }
                <TextField value={bio.value} onChange={bio.changeHandler} required fullWidth margin='normal' id="filled-basic" label="Bio" variant="filled" style={{fontFamily:"monospace"}}/>
                <TextField value={password.value} onChange={password.changeHandler} required fullWidth margin='normal' id="filled-basic" label="Password" type='password' variant="filled"/>
                {
                    password.error && (
                        <Typography color="error" variant='caption'>
                            {password.error}
                        </Typography>
                    )
                }
                <Button variant="contained"  type='submit' color='primary' endIcon={<LoginIcon/>} fullWidth sx={{marginTop:'1rem'}}>Sign Up </Button>
                <Typography textAlign={"center"} margin={"1rem"} fontFamily={"monospace"} >OR</Typography>
                <Button onClick={toggleLogin} variant="text"  type='submit' color='primary' fullWidth  endIcon={<HowToRegIcon/>}> Login in instead </Button>
            </form>
        </>
        }

        </Paper>
    </Container>
    </div>
)
}

export default Login