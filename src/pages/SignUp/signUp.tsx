import React from "react";
import "./signUp.scss"
import { useForm } from "react-hook-form";
import { User, UserRole } from "../../features/type";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { createUser } from "../../features/users/usersSlice";



const schema = Yup.object().shape({
    userName: Yup.string()
        .required("Enter your username!"),
    email: Yup.string()
        .required("Enter your email"),
    password: Yup.string()
        .required("Enter your password")
})

export const SignUp:React.FC = React.memo(():JSX.Element => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({ resolver: yupResolver(schema) })
    const dispatch = useDispatch()

    const onSubmit = (data:any) => {
        dispatch(createUser({...data, id: Date.now(), role: UserRole.USER}))
        reset()
    }

    return(
        <div className="signUp">
            <div className="container">
                <div className="signUp__wrapper">
                    <div className="signUp__title">
                        <h3>SignUp</h3> 
                    </div>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder="Enter your username" {...register("userName")} />
                        {errors.userName && <p className="errors">{errors.userName.message}</p>}
                        <input placeholder="Enter your email" {...register("email")}/>
                        {errors.email && <p className="errors">{errors.email.message}</p>}
                        <input placeholder="Enter your password" {...register("password")}/>
                        {errors.password && <p className="errors">{errors.password.message}</p>}
                        <button className="btn-1">Create account</button>
                    </form>
                </div>
            </div>  
        </div>
    )
})