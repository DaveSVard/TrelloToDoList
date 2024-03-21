import React, { useState } from "react"
import "./commentsForm.scss"
import { useForm } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch } from "react-redux";
import { addComment, takeSingleTask } from "../../features/tasks/tasksSlice";


interface PropTypes {
    toDoIndex:number
    taskIndex:number
}

const schema = Yup.object().shape({
    email: Yup.string()
        .required("Enter your email"),
    text: Yup.string()
        .required("Enter your comment")
})

export const CommentsForm:React.FC<PropTypes> = React.memo(({toDoIndex, taskIndex}):JSX.Element => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<{email: string, text:string}>({ resolver: yupResolver(schema) })
    const dispatch = useDispatch()

    const save = (data:{email: string, text:string}) => {

        let id = Date.now()
        dispatch(addComment({toDoIndex: toDoIndex, taskIndex: taskIndex, comment: {...data, id: id}}))
        dispatch(takeSingleTask(taskIndex))

        reset()
    }



    const [formBtn, setFormBtn] = useState<boolean>(false)


    return(
        <form onSubmit={handleSubmit(save)} className="commentForm">
            <input onClick={() => setFormBtn(!formBtn)} placeholder="Write a comment..." {...register("text")}/>

            {formBtn ? <div className="commentForm__ghost">
                <input placeholder="Write your email" {...register("email")}/>
                <div className="commentForm__bottom">
                    <button className="commentForm__btn">Save</button>
                    <div className="toolsIcons">
                        <i className="fa-solid fa-paperclip"></i>
                        <i className="fa-solid fa-at"></i>
                        <i className="fa-regular fa-face-smile"></i>
                        <i className="fa-solid fa-box"></i>
                    </div>
                </div>
            </div> : <></>}
        </form>
    )
})