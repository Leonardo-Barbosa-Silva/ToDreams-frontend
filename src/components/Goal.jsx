import { Box, Button, Typography, useTheme } from "@mui/material"; 
import { DeleteOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function Goal({ goal }) {
    const dispatch = useDispatch()

    const { palette } = useTheme()

    return (
        <Box
            minHeight="100px"
            gridColumn="span 2"
            backgroundColor={palette.background.alt}
            display="flex"
            justifyContent="space-between"
            borderRadius="10px"
            sx={{
                wordBreak: "break-word",
                "&:hover": {
                    cursor: "pointer"
                }
            }}
        >
            <Typography
                padding="15px"
                variant="h5"
                fontWeight="400"
            >
                {goal.text}
            </Typography>

            <Button
                onClick={() => dispatch(deleteGoal(goal._id))}
            >
                <DeleteOutlined sx={{
                    fontSize: "30px",
                    borderRadius: "10px"
                }}/>
            </Button>
        </Box>
    )
}

export default Goal;