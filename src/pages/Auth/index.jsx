import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import Form from '../../components/AuthForm';



function Auth() {
    const { palette } = useTheme()

    const { isLogged } = useSelector( state => state.auth )

    const navigate = useNavigate()

    useEffect( () => {
        if (isLogged) {
            navigate('/home')
        }
    }, [isLogged, navigate])

    return (
        <Box width="100%" height="100vh">
            <Box component="header" sx={{
                width: "100%",
                height: "120px",
                padding: "20px",
                backgroundColor: palette.background.alt,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography variant='h1' fontWeight="bold" sx={{
                    "&:hover": {
                        cursor: "pointer",
                        opacity: "20%"
                    }
                }}>
                    ToDreams
                </Typography>
            </Box>
            
            <Form />
        </Box>
    )
}



export default Auth;