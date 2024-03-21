import React from "react"
import "./descriptionForm.scss"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addDescription } from "../../features/tasks/tasksSlice"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { User, UserRole } from "../../features/type"


interface PropTypes {
    toDoIndex:number
    taskIndex:number
    updateDescription:Function
}


const schema = Yup.object().shape({
    description: Yup.string()
        .required("Enter task description"),
})

export const DescriptionForm:React.FC<PropTypes> = React.memo(({toDoIndex, taskIndex, updateDescription}):JSX.Element => {
    const {register, handleSubmit, reset, formState: {errors}, setError} = useForm<{description:string}>({ resolver: yupResolver(schema) })
    const dispatch = useDispatch()

    const user:User = JSON.parse(localStorage.user)
    

    const save = (data:{description:string}) => {

        if(data.description) {
            if(user.role != UserRole.ADMIN) {
                setError("description", {message: "You don't have enough rights"})
            } else {
                dispatch(addDescription({toDoIndex: toDoIndex, taskIndex: taskIndex, description: data.description}))
                updateDescription(data.description)
                reset()
            }
        }

    }

    return(
        <form className="descriptionForm" onSubmit={handleSubmit(save)}>
            <textarea placeholder="Add a more detailed description..." {...register("description")}></textarea>
            {errors.description && <p className="errors">{errors.description.message}</p>}
            <div className="toDo__form-accept">
                <button className="toDo__form-btn p-fz16">Save</button>
                <i className="fa-solid fa-xmark pointer"></i>
            </div>
        </form>
    )
})