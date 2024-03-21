import React, { useEffect, useState } from "react"
import "./archive.scss"
import { ToDos } from "../../features/type"
import { useSelector } from "react-redux"
import { selectToDo, sendTaskBackFromArchive } from "../../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"

export const Archive:React.FC = React.memo(():JSX.Element => {

    const {archive} = useSelector(selectToDo)
    const dispatch = useDispatch()
    
    console.log(archive);
    
    

    return(
        <div className="archive">
            <div className="container">
                <div className="archive__wrapper">
                    <div className="archive__info">
                        {archive.map(el => {
                            return(
                                <ul className="archive__info-list" key={el.id}>
                                    <li>    
                                        <h2 className="archive__title">{el.name}</h2>
                                        {el?.tasks?.map(elm => {
                                            return(
                                                <ul className="archive__info-inner__list" key={elm.id}>
                                                    <li><h2 className="info__title">Title: {elm.title}</h2></li>
                                                    <li><p>Description: {elm.description}</p></li>
                                                    <p>{elm.status}</p>
                                                    {elm.assigned_to ? <li>Assigned to: <p>{elm.assigned_to.email}</p></li> : <></>}
                                                    <li><p>Deadline: {String(elm.deadline)}</p></li>
                                                    <button onClick={() => dispatch(sendTaskBackFromArchive({listId: el.id, task: elm}))} className="archiveBtn">Send back</button>
                                                </ul>
                                            )
                                        })}
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
})