import React from "react";
import "./signIn.scss"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signIn } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
    email: Yup.string()
        .required("Enter your email"),
    password: Yup.string()
        .required("Enter your password")  
})

export const SignIn:React.FC = React.memo(():JSX.Element => {

    const {register, handleSubmit, formState: {errors}} = useForm<{email:string, password:string}>({ resolver: yupResolver(schema) })

    const {users} = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onSubmit = (data:{email:string, password:string}) => {
        
        let user = users.find(elm => {
            if(elm.email == data.email && elm.password == data.password) {
                return elm
            }
        })
            
        if(data.email && data.password) {
            dispatch(signIn(user))
            navigate("/toDos")
        }
    }

    return(
        <div className="signIn">
            <div className="container">
                <div className="signIn__wrapper">
                    <div className="signIn__title">
                        <h3>SignIn</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <input placeholder="Enter your email" {...register("email")}/>
                        {errors.email && <p className="errors">{errors.email.message}</p>}
                        <input placeholder="Enter your password" {...register("password")}/>
                        {errors.password && <p className="errors">{errors.password.message}</p>}
                        <button className="btn-1">Go!</button>
                    </form>
                </div>
            </div>
        </div>
    )
})