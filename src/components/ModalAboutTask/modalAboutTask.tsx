import React, { useState } from "react";
import "./modalAboutTask.scss"
import { ButtonsT, TasksT, ToDos } from "../../features/type";
import { DescriptionForm } from "../DescriptionForm/descriptionForm";
import { CommentsForm } from "../CommentsForm/commentsForm";
import { useSelector } from "react-redux";
import { selectToDo } from "../../features/tasks/tasksSlice";

interface PropTypes {
    currentTask:TasksT
    toDoList:ToDos
    setModalActive:Function
}

export const ModalAboutTask:React.FC<PropTypes> = React.memo(({currentTask, setModalActive, toDoList}):JSX.Element => {

    const addToCard:ButtonsT[] = [
        {id: 1, icon: "fa-regular fa-user", name: "Members"},
        {id: 2, icon: "fa-solid fa-tag", name: "Labels"},
        {id: 3, icon: "fa-solid fa-clipboard-list", name: "Checklist"},
        {id: 4, icon: "fa-regular fa-clock", name: "Due Date"},
        {id: 5, icon: "fa-solid fa-paperclip", name: "Attachment"},
        {id: 6, icon: "fa-solid fa-inbox", name: "Cover"},
    ] 

    const actions:ButtonsT[] = [
        {id: 1, icon: `fa-solid fa-arrow-right`, name: "Move"},
        {id: 2, icon: `fa-regular fa-copy`, name: "Copy"},
        {id: 3, icon: `fa-regular fa-window-restore`, name: "Make Template"}
    ]

    const [taskDescription, setTaskDescription] = useState(currentTask.description || '')
   
    const {task} = useSelector(selectToDo)

    console.log("task=>",task);
    // const task = JSON.parse(localStorage.task)
    // console.log(task);
    

    const updateDescription = (newDescription: string) => {
        setTaskDescription(newDescription);
    };

    
    return(
        <div className="modal__window">
            <div className="modal__window-head">
                <div className="modal__window-title">
                    <i className="fa-solid fa-box icon"></i>
                    <div className="modal__window-title__text">
                        <h2 className="h2-1">{currentTask?.title}</h2>
                        <p className="p-fz16">in list <span className="underline">{currentTask.status}</span></p>
                    </div>
                </div>
                <i onClick={() => setModalActive(false)} className="fa-solid fa-xmark pointer"></i>
            </div>

        <div className="modal__window-body__wrapper">

            <div className="modal__window-content">

                <div className="modal__window__description">
                    <div className="modal__window__description-body">
                        <i className="fa-solid fa-bars icon"></i>
                        <div className="modal__window__description-content">
                            <h2 className="h2-1">Description</h2>
                            {taskDescription ?  <p className="p-fz16">{taskDescription}</p> 
                            : <DescriptionForm 
                                taskIndex = {currentTask.id} 
                                updateDescription={updateDescription}
                                toDoIndex = {toDoList.id}/>
                                }
                        </div>
                    </div>
                </div>

                <div className="modal__window__activity">
                    <div className="modal__window__activity-body">
                        
                        <i className="fa-solid fa-comment icon"></i>

                        <div className="modal__window__activity-content">
                            <div className="modal__window__activity-title">
                                <h2 className="h2-1">Activity</h2>
                                <CommentsForm taskIndex = {currentTask.id} toDoIndex = {toDoList.id} />
                            </div>

                            <div className="modal__window__activity-comments">
                                {task.comments?.map((elm:any) => {
                                    return(
                                        <div className="comments__item" key={elm.id}>
                                            <p className="p-fz16 font-bold">{elm.email}</p>
                                            <p className="p-fz16 comment">{elm.text}</p>
                                            <div className="comments__item-tools">
                                                <i className="fa-regular fa-face-smile p-fz14"></i>
                                                <span>-</span>
                                                <button className="underline p-fz14">Edit</button>
                                                <span>-</span>
                                                <button className="underline p-fz14">Delete</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="modal__window-tools">
                <div className="toCard">
                    <h3>ADD TO CARD</h3>
                    <div className="modal__window-tools__icons">
                        {addToCard.map(elm => {
                            return(
                                <div key={elm.id}>
                                    <i className={elm.icon}></i>
                                    <p>{elm.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="powerUps">
                    <h3>POWER-UPS</h3>
                    <div className="modal__window-tools__icons">
                        <div>
                            <p>Get Power-Ups</p>
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <h3>ACTIONS</h3>
                    <div className="modal__window-tools__icons">
                        {actions.map(elm => {
                            return(
                                <div key={elm.id}>
                                    <i className={elm.icon}></i>
                                    <p>{elm.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>

        </div>
    )
})