import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToDos, User, UserRole } from "../../features/type";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectUser } from "../../features/users/usersSlice";
import { addToDo } from "../../features/tasks/tasksSlice";

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import "./taskForm.scss"

import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

interface PropTypes {
    info:ToDos;
    toggleCreateTaskForm:Function;
}

const schema = Yup.object().shape({
    title: Yup.string()
        .required("Enter task title"),
    // description: Yup.string()
    //     .required("Enter task description"),
    assigned_to: Yup.string()
        .required("Select user for this task")  
})

export const TaskForm:React.FC<PropTypes> = React.memo(({info, toggleCreateTaskForm}):JSX.Element => {
    const {register, handleSubmit, reset, formState: {errors}, setError} = useForm({ resolver: yupResolver(schema) })
    const {users} = useSelector(selectUser)
    const dispatch = useDispatch()

    const [selected, setSelected] = useState<Date>()

    const user:User = JSON.parse(localStorage.user)
    
    const addTask = (obj:any) => {
        if(!selected) {
            setError("assigned_to", {message: "Choose date"})
        }

        

        if(Date.now() < Number(selected)) {
            if(user.role != UserRole.ADMIN) {
                setError("assigned_to", {message: "You don't have enough rights"})
            } else {
                dispatch(addToDo({id: info.id, data: {...obj, id: Date.now(), deadline: selected, assigned_to: +obj.assigned_to , status: info.tasks[0].status}}))
                reset()
            }
        } else {
            setError("assigned_to", {message: "Choose correct date"})
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(addTask)} className="toDo__form">
                <input placeholder="Enter a title for this task..." {...register("title")} />
                {errors.title && <p className="errors">{errors.title.message}</p>}
                {/* <textarea placeholder="Enter a description for this task..." {...register("description")} />
                {errors.description && <p className="errors">{errors.description.message}</p>} */}
                <select {...register("assigned_to")}>
                    <option value="" hidden>Choose user</option>
                    {users.filter(elm => elm.role == UserRole.USER).map(elm => {
                        return(
                            <option key={elm.id} value={elm.id}>{elm.userName}</option>
                        )
                    })}
                </select>
                {errors.assigned_to && <p className="errors">{errors.assigned_to.message}</p>}
                <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                className="datePicker"
                />
                
                <div className="toDo__form-accept">
                    <button className="toDo__form-btn">Add Task</button>
                    <i onClick={() => toggleCreateTaskForm()} className="fa-solid fa-xmark pointer"></i>
                </div>
            </form>
        </div>
    )
})

// useForm<{title:string, description:string, assigned_to:User}>({ resolver: yupResolver(schema) }) // harc type??