import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useForm, Controller } from "react-hook-form";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from '../../hooks/useAuth';
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import {
    Box,
    Grid,
    TextField,
    Button,
    FormControl,
    FormLabel,
    Typography
} from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const schema = yup
  .object().shape({
    text: yup.string().required(),
  })
  .required();
  const schema1 = yup
  .object().shape({
    nestedText: yup.string().required(),
  })
  .required();
interface FormData {
    _id: number;
    text: string;
    nestedText: string;
  }
  const defaultValues = {
    text: "",
    nestedText: "",
  };


const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [ids, setIds] = useState<number>(0);
    const navigate = useNavigate();
    const {loginData, todoData, setTodoData, nestedData, setNestedData}:any = useAuth();
    const token =  localStorage.getItem("token");
    const tokenData:any =  localStorage.getItem("localData");
    const userData: any = JSON.parse(tokenData);
    console.log('loginData', loginData);
   
    const schemas = () => {
      if(open===true){
        return yupResolver(schema1)
      }else {
        return yupResolver(schema)
      }
    }
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
        resolver: schemas(),
      });
    
      const onSubmit: any = async(data: FormData) => {
        let len = todoData.length;
        data._id = len +1;
        console.log('length', len);
        setTodoData([...todoData, data]);
        console.log('dataaaaaa', data)
        reset();
      }
      console.log('onSubmit', todoData);
     const logOut: any = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('localData');
      navigate('/login');
     }
     const onSubmit1:any = (data:FormData) => {
      data._id=ids;
      setNestedData([...nestedData, data]);
      console.log('dataaaaaa nested', data)
      reset();
      setOpen(false);
     }
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="right"><b>Email: </b>{loginData?.email ?? userData?.email}</TableCell>
            <TableCell align="right"><b>Password: </b>{loginData?.password ?? userData?.password}</TableCell>
          <Button onClick={()=> logOut()} variant="contained" sx={{ ml:110, mt:2 }}>
         Logout
       </Button>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
    </TableContainer>
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
           mt:2,
          width: 700,
          maxWidth: "100%",
         }}
       > 
       <Typography
       variant="h5"
       component="h5"
       sx={{mb:2}}
     >
       Add Todos
     </Typography>
         <Grid container spacing={2}>
         <Grid item xs={6}>
             <FormControl component="fieldset">
               <Controller
                 name={"text"}
                 control={control}
                 rules={{
                   required: true,
                 }}
                 render={({ field: { onChange, value } }) => (
                   <TextField
                   variant="filled"
                     fullWidth
                     sx={{
                       width: 290
                   }}
                     onChange={onChange}
                     value={value}
                     label={"Text"}
                     error={Boolean(errors.text)}
                     helperText={errors.text?.message}
                   />
                 )}
               />
             </FormControl>
           </Grid>
           <Grid item xs={6} sx={{mt:1}}>
         <Button type="submit" variant="contained" sx={{mr:1,ml:1}}>
           Submit
         </Button>
           <Button onClick={() => reset()} variant="outlined">
           Reset
         </Button>
         </Grid>    
         </Grid>
       <Typography
       variant="h5"
       component="h5"
       sx={{mb:2, mt:2}}
     >
       My Todos
     </Typography>
       </Box>
     </form>
   </Box>
   <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 465, ml:50 }} aria-label="customized table">
        <TableBody>
           {todoData?.map((item:any, index:any) => {
         return   <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row">
              <CheckCircleOutlineIcon/>{item?.text}
              
              
            {nestedData && nestedData.map((nest:any, i:any)=>{
               if(item._id===nest._id){
            return  <TableCell component="th" scope="row" key={i}>
                      {nest?.nestedText}
                      </TableCell> }
            })}  
              </StyledTableCell><Button ><AddIcon style={{marginTop:'10px'}} onClick={()=>(setOpen(true), setIds(item?._id))} /></Button>
            </StyledTableRow>}
)}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
     sx={{
       width: 300,
       maxWidth: "100%",
       flexGrow: 1,
       mt: 5,
      }}
   >
     <form onSubmit={handleSubmit(onSubmit1)}>
       <Box
         sx={{
           ml:2,
           mt:2,
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
       My Nested Todos
     </Typography>
         <Grid container spacing={2}>
         <Grid item xs={12}>
             <FormControl component="fieldset">
               <Controller
                 name={"nestedText"}
                 control={control}
                 rules={{
                   required: true,
                 }}
                 render={({ field: { onChange, value } }) => (
                   <TextField
                   variant="filled"
                     fullWidth
                     sx={{
                       width: 400
                   }}
                     onChange={onChange}
                     value={value}
                     label={"Nested Text"}
                     error={Boolean(errors.nestedText)}
                     helperText={errors.nestedText?.message}
                   />
                 )}
               />
             </FormControl>
           </Grid>
           
           
         </Grid>
       </Box>
       <Box sx={{  mb:2, ml:2,
           mt:2,
           width: 400,
           maxWidth: "100%", }}>
         <Button onClick={() => reset()} variant="outlined">
           Reset
         </Button>
         <Button type="submit" variant="contained" sx={{ ml: 2 }}>
           Submit
         </Button>
       </Box>
     </form>
   </Box>
        </Box>
      </Modal>
   </>
  );
}
export default Dashboard;