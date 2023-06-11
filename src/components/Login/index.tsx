import React, {useCallback, useEffect} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm, Controller } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from "yup";
import {useNavigate, useLocation} from "react-router-dom"
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  Typography
} from "@mui/material";
import { setAuthToken } from "./setAuthToken";

interface FormData {
  email: string;
  password: string;
}
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .required(),
    password: yup.string().required("password is required"),
  })
  .required();
const defaultValues = {
  email: "",
  password: "",
};
const Login = () => {
const navigate = useNavigate()
const location = useLocation();
const from = location.state?.from?.pathname || "/";
const { setAuth }:any = useAuth();
const { dataValues, setDataValues, loginData, setLoginData, regData, flag, setFlag, open, setOpen }:any = useAuth();
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
   useEffect(()=>{

   },[loginData])
  const onSubmit: any = async(data: FormData) => {
    const loginPayload: any = {
      email: data.email,
      password: data.password
    }
   try{
    const response = await axios.post("/login", loginPayload);
    console.log('response',response);
    if(response.status===200){
      alert("User successfully logged in")
    setOpen(true);
    setLoginData(loginPayload);
    const token  =  response.data.token;
    //set JWT token to local
      localStorage.setItem("token", token);
      localStorage.setItem("localData", JSON.stringify(loginPayload));
      setAuthToken(token);
    }} catch(error:any) {
      console.log(error);
      alert("Invalid data")
      return error;
    }
  } 
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const token =  localStorage.getItem("token");
  const hasJWT:any = () => {
  console.log("token: " + token);
  if(token){
    setFlag(true);
    navigate("/")
  }
   
}

useEffect(()=>{
  hasJWT()
},[flag, token]);
  return ( 
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            flexGrow: 1,
            mt: 5,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                ml:50,
                mt:25,
               width: 500,
                maxWidth: "100%",
               // ml: 5,
              }}
            > 
            <Typography
            variant="h5"
            component="h5"
            sx={{mb:2}}
          >
            Login Form
          </Typography>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Controller
                      name={"email"}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                        variant="filled"
                          fullWidth
                          sx={{
                            width: 600
                        }}
                          onChange={onChange}
                          value={value}
                          label={"Email"}
                          error={Boolean(errors.email)}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Controller
                      name={"password"}
                      control={control}
                      rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                            type={showPassword ? 'text' : 'password'}
                           InputProps={{
                            endAdornment:
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }}
                          variant="filled"
                          sx={{
                            width: 600
                        }}
                          fullWidth
                          onChange={onChange}
                          value={value}
                          label={"Password"}
                          error={Boolean(errors.password)}
                          helperText={errors.password?.message}
                          />
                        
                      )}
                    />
                  </FormControl>
                </Grid>   
                
              </Grid>
            </Box>
            <Box sx={{  ml:50,
                mt:2,
               width: 500,
                maxWidth: "100%", }}>
              <Button onClick={() => reset()} variant="outlined">
                Reset
              </Button>
              <Button type="submit" variant="contained" sx={{ ml: 40 }}>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      
   
  );
};

export default Login;
