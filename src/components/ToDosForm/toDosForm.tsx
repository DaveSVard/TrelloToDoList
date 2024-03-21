import React from "react"
import "./toDosForm.scss"
import { useForm } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addToDosList } from "../../features/tasks/tasksSlice";


const schema = Yup.object().shape({
    name: Yup.string()
        .required("Enter list name")
})

interface PropTypes {
    toDosForm:boolean
    setToDosForm:Function
}

export const ToDosForm:React.FC<PropTypes> = React.memo(({toDosForm, setToDosForm}):JSX.Element => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({ resolver: yupResolver(schema) })
    const dispatch = useDispatch()

    const addList = (obj:any) => {
        console.log(obj);
        dispatch(addToDosList({...obj, id: Date.now(), active: false, tasks: []}))
    }

    return(
        <div className="toDosForm">
            <form onSubmit={handleSubmit(addList)} className="toDosForm__form">
                <input placeholder="Write list title..." {...register("name")}/>
                <div className="toDo__form-accept">
                    <button className="toDo__form-btn">Add Task</button>
                    <i onClick={() => setToDosForm(!toDosForm)} className="fa-solid fa-xmark pointer"></i>
                </div>
            </form>
        </div>
    )
})