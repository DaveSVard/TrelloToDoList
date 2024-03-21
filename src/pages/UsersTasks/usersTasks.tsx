import React, { useEffect, useState } from "react";
import "./usersTasks.scss"
import { TasksT, User } from "../../features/type";
import { useSelector } from "react-redux";
import { selectToDo } from "../../features/tasks/tasksSlice";

export const UsersTasks:React.FC = React.memo(():JSX.Element => {

    const user:User = JSON.parse(localStorage.user)
    const [myTasks, setMyTasks] = useState<TasksT[]>([])
    const {tasks} = useSelector(selectToDo)

    
    useEffect(() => {

        let tasksArray:TasksT[] = []
    
        if(tasks) {
            tasks.map(elm => {
                elm.tasks.map(el => {
                    if(Number(el.assigned_to) == user.id) {
                        tasksArray.push(el)
                    }
                })
            })
        }        

        setMyTasks(tasksArray)

    }, [])


    return(
        <div className="myTasks">
            <div className="container">
                <div className="myTasks__wrapper">
                    <h1 className="myTasks__title">MyTasks</h1>
                    <div className="myTasks__info">
                        {myTasks.map(elm => {
                            return(
                                <div className="myTasks__info-item" key={elm.id}>
                                    <h3 className="font-bold">Title: {elm.title}</h3>
                                    {elm.description && <p>Description: {elm.description}</p>}
                                    <p>Status: {elm.status}</p>
                                    <p>Deadline: {String(elm.deadline).slice(0, 10)}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
})