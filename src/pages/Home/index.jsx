import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    TextField,
    Typography,
    useTheme,
    Button
} from '@mui/material';
import { LogoutOutlined, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { changeMode, reset as resetAuth, verifyToken } from '../../features/auth/authSlice';
import { createGoal, getGoals } from '../../features/goals/goalSlice';
import { useEffect } from 'react';
import Goal from '../../components/Goal';


export default function Home() {
    const dispatch = useDispatch()

    const { mode, token } = useSelector( state => state.auth )
    const { goals, isError, isLoading, isSucess, message } = useSelector( state => state.goals )

    const { palette } = useTheme()

    function handleSubmit(e) {
        e.preventDefault()
    
        dispatch(createGoal(e.target[0].value))

        e.target[0].value = ''
    }

    useEffect( () => {
        dispatch(getGoals())

        dispatch(verifyToken(token))
    }, [])
    
    return (

        <Box 
            width="100%" 
            height="100vh" 
            display="flex" 
            sx={{
                overflowX: "hidden"
            }}
        >
            <Box component="header" sx={{
                width: "250px",
                height: "100%",
                padding: "20px",
                backgroundColor: palette.background.alt,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "fixed"
            }}>
                <Typography variant='h1' fontWeight="bold">
                    ToDreams
                </Typography>

                {mode === "light" ? (
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        onClick={ () => dispatch(changeMode()) }
                        display="flex"
                        alignItems="center"
                        gap="15px"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                opacity: "20%"
                            }
                        }}
                    >
                        <LightModeOutlined /> Mode
                    </Typography>
                ) : (
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        onClick={ () => dispatch(changeMode()) }
                        display="flex"
                        alignItems="center"
                        gap="15px"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                opacity: "20%"
                            }
                        }}
                    >
                        <DarkModeOutlined /> Mode
                    </Typography>
                )}

                    <Typography 
                        variant="h4"
                        fontWeight="bold"
                        onClick={ () => dispatch(resetAuth()) }
                        display="flex"
                        alignItems="center"
                        gap="15px"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                opacity: "20%"
                            }
                        }}
                    >
                        <LogoutOutlined /> Log Out
                    </Typography>
            </Box>

            <Box
                width="calc(100% - 250px)" 
                height="fit-content"
                marginLeft="250px"
                display="flex" 
                flexDirection="column"
                alignItems="center"
                padding="30px 0"
                gap="30px"
            >
                <Box
                    component="form"
                    width="80%"
                    height="fit-content"
                    onSubmit={handleSubmit.bind(null)}
                >
                    <TextField
                        label="Write your goals and dreams :)"
                        type="text"
                        sx={{
                            width: "100%"
                        }}
                    />

                    <Button
                        type="submit"
                        sx={{
                            width: "100%",
                            m: "20px 0",
                            p: "10px",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { 
                                color: palette.primary.main
                            }
                        }}
                    >
                        Create
                    </Button>
                </Box>

                <Box
                    width="calc(100vw - 250px)"
                    display="grid"
                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                    gap="20px"
                    padding="0 20px"
                    alignItems="start"
                >
                    {goals && goals.length > 0 && goals.map( (goal) => (
                        <Goal key={goal._id} goal={goal} />
                    ))}
                </Box>
            </Box>
            
            
        </Box>
    )
}