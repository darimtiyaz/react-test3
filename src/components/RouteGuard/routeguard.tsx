import React, {useState, useEffect} from 'react';
import { Route, redirect, Navigate, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import useAuth from '../../hooks/useAuth';
 
const RouteGuard = (props:any) => {
    const navigate = useNavigate()
    const [userlogin, setuserlogin] = useState<boolean>(false)
    const {Component} = props;
    const {flag}:any = useAuth();
    console.log('guard routes',flag);
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!flag && !token) {
            setuserlogin(()=>false)
            navigate("/login", { replace: true })
        } else if (flag || token){
            setuserlogin(()=>true)
        }
    }, [flag, token])

   console.log('tokenn', token)
 console.log('flag',flag)
   return (
        <div>
          {userlogin &&  <Component />}
        </div>
   );
};
 
export default RouteGuard;