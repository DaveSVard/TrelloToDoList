import React from "react";
import { useRoutes } from "react-router-dom";
import { Layout } from "../pages/Layout/layout";
import { SignIn } from "../pages/SignIn/signIn";
import { SignUp } from "../pages/SignUp/signUp";
import { ToDos } from "../pages/ToDos/toDos";
import { Archive } from "../pages/Archive/archive";
import { UsersTasks } from "../pages/UsersTasks/usersTasks";

export const MyRouter:React.FC = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {path: "/", element: <SignIn/>},
                {path: "/signUp", element: <SignUp/>},
                {path: "/toDos", element: <ToDos/>},
                {path: "/archive", element: <Archive/>},
                {path: "/usersTasks", element: <UsersTasks/>}
            ]
        }
    ])
    
    return routes
}