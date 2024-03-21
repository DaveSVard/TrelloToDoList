import React from "react";
import { Navbar } from "../../components/Navbar/navbar";
import { Outlet } from "react-router-dom";

export const Layout:React.FC = () => {
    return(
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}