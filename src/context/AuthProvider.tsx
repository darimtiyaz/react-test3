import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }:any) => {
    const [auth, setAuth] = useState({});
    const [dataValues, setDataValues] = useState([]);
    const [regData, setRegData] = useState([]);
    const [loginData, setLoginData] = useState([]);
    const [todoData, setTodoData] = useState([]);
    const [flag, setFlag] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [nestedData, setNestedData] = useState<any>([])

    return (
        <AuthContext.Provider value={{ auth, setAuth, dataValues, setDataValues, regData, setRegData, loginData, setLoginData, todoData, setTodoData, flag, setFlag, open, setOpen, nestedData, setNestedData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
