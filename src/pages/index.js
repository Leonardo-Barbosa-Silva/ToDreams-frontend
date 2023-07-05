import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import Auth from "./Auth/index";
import Home from "./Home/index";


function IndexRoutes() {
    const { isLoading, isLogged } = useSelector( state => state.auth )

    const { palette } = useTheme()

    return (
        <Router>
            {isLoading ? (
                <Box sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Box
                        sx={{
                            width: "100px",
                            height: "100px",
                            border: `5px solid ${palette.primary.light}`,
                            borderTopColor: palette.primary.dark,
                            borderRadius: "50px",
                            animation: "spin 1s linear infinite",
                            "@keyframes spin": {
                                to: {
                                  transform: "rotate(360deg)"
                                }
                            }
                        }}
                    />
                </Box>
            ) : (
                <Routes>
                    <Route path="/" element={<Navigate to="/home"/>} />
                    <Route path="/home" element={isLogged ? <Home/> : <Navigate to="/auth"/>} />
                    <Route path="/auth" element={isLogged ? <Navigate to="/home"/> : <Auth />} />
                </Routes>
            )}
        </Router>
    )
}

export default IndexRoutes;