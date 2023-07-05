import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/auth/authSlice';
import {
    Box,
    Typography,
    useTheme,
    Button,
    TextField
} from '@mui/material'
import { Formik } from 'formik';
import * as yup from 'yup';


const registerSchema = yup.object().shape({
    firstName: yup.string().min(2, 'name too short.').max(40, 'name too long.').required('required'),
    lastName: yup.string().min(2, 'last name too short.').max(40, 'last name too long.').required('required'),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})

const initialValuesRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const initialValuesLogin = {
    email: '',
    password: ''
}

function AuthForm() {
    const [ pageType, setPageType ] = useState('login')

    const { isLogged, isError, message } = useSelector( state => state.auth )

    const { palette } = useTheme()

    const dispatch = useDispatch()

    function onSubmitForm(userData) {
        pageType === "login" ? (
            dispatch(loginUser(userData))
        ) : (
            dispatch(registerUser(userData))
        )
    }

    return (
        <Formik
            onSubmit={onSubmitForm}
            initialValues={pageType === "login" ? initialValuesLogin : initialValuesRegister}
            validationSchema={pageType === "login" ? loginSchema : registerSchema}
        >
            { ({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <Box 
                    width="100%" 
                    height="calc(100vh - 120px)"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        backgroundColor={palette.background.alt}
                        borderRadius="20px"
                        sx={{
                            width: "80%",
                            height: "fit-content",
                            padding: "40px",
                            display: "grid",
                            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                            justifyContent: "center",
                            gap: "15px"
                        }}
                    >
                        {pageType === "login" && (
                            <>
                                <TextField 
                                    label="E-mail"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{
                                        gridColumn: "span 4",
                                        height: "fit-content"
                                    }}
                                />
                                <TextField 
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{
                                        gridColumn: "span 4",
                                        height: "fit-content"
                                    }}
                                />
                            </>
                        )}

                        {pageType === "register" && (
                            <>
                                <TextField 
                                    label="First Name"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{
                                        gridColumn: "span 2",
                                        height: "fit-content"
                                    }}
                                />
                                <TextField 
                                    label="Last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{
                                        gridColumn: "span 2",
                                        height: "fit-content"
                                    }}
                                />
                                <TextField 
                                    label="E-mail"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{
                                        gridColumn: "span 4",
                                        height: "fit-content"
                                    }}
                                />
                                <TextField 
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{
                                        gridColumn: "span 4",
                                        height: "fit-content"
                                    }}
                                />
                            </>
                        )}
                        <Box sx={{
                            gridColumn: "span 4",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Button
                                type="submit"
                                sx={{
                                    width: "50%",
                                    m: "20px 0",
                                    p: "20px",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { 
                                        color: palette.primary.main
                                    }
                                }}
                                onSubmit={handleSubmit}
                            >
                                {pageType === "login" ? "LOGIN" : "REGISTER"}
                            </Button>

                            <Typography
                                onClick={ () => {
                                    setPageType(pageType === "login" ? "register" : "login")
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light
                                    },
                                    mb: "20px"
                                }}
                            >
                                {pageType === "login" ? (
                                    "Don't have an account? Sign Up here."
                                ) : (
                                    "Already have an account? Login here."
                                ) }
                            </Typography>

                            <Typography
                                color={palette.primary.error}
                                fontSize="0.8rem"
                            >
                                {isError && message && `${message}`}
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            ) }
        </Formik>
    )
}


export default AuthForm;