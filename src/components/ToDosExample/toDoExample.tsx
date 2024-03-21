import React, { useState } from "react";
import { TasksT, ToDos } from "../../features/type";
import "./toDoExample.scss"

import { Droppable } from "react-beautiful-dnd";
import { ToDoTaskExample } from "../ToDoTaskExample/toDoTaskExample";
import { TaskForm } from "../TaskForm/taskForm";
import { Modal } from "../Modal/modal";
import { ModalAboutTask } from "../ModalAboutTask/modalAboutTask";

interface PropTypes {
    info:ToDos;
    isActive:Function;
    setmModal:Function;
    modal:{id:number, taskId:number}
}

export const ToDoExample:React.FC<PropTypes> = React.memo(({info, isActive, setmModal, modal}):JSX.Element => {
        
    const toggleCreateTaskForm = () => {
       isActive(info.id, info.active)
    }

    const [modalActive, setModalActive] = useState<boolean>(false)
    const [currentTask, setCurrentTask] = useState<TasksT>()

  
    const toggleModalWindow = (obj:TasksT) => {
        setModalActive(true)
        setCurrentTask(obj)
    }
    
    
    return(
        <Droppable droppableId={String(info.id)}>
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="toDo">
                    <div className="toDo__wrapper">
                        
                        <div className="toDo__title">
                            <h3>{info.name}</h3>
                            <i className="fa-solid fa-ellipsis pointer"></i>
                        </div>

                        <div  className="toDo__list">
                            {info.tasks?.map((elm, i) => {
                                return(
                                    <div key={elm.id} >
                                        <ToDoTaskExample 
                                            text={elm} 
                                            index={i} 
                                            modal={modal}
                                            setModal={setmModal}
                                            id={info.id}
                                            toggleModalWindow = {toggleModalWindow} 
                                        />

                                        
                                    </div>
                                )
                            })}
                            <Modal active = {modalActive} setActive = {setModalActive}>
                                {currentTask ? <ModalAboutTask toDoList = {info} currentTask={currentTask} setModalActive={setModalActive}/> : <></>}
                            </Modal>
                        </div>


                        {!info.active ? <div onClick={() => isActive(info.id)} className="createTask">
                            <i  className="fa-solid fa-plus"></i>
                            Add a task
                        </div> : <TaskForm info={info} toggleCreateTaskForm={toggleCreateTaskForm} />}

                    </div>
                    {provided.placeholder}
                    
                </div>
            )}
        </Droppable>
    )
})