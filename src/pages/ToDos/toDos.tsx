import React, { useEffect, useState } from "react"
import "./toDos.scss"
import { useDispatch, useSelector } from "react-redux"
import { toggleForm, selectToDo, dragEventDone } from "../../features/tasks/tasksSlice"
import { ToDoExample } from "../../components/ToDosExample/toDoExample"
import { DragDropContext } from "react-beautiful-dnd"
import { ToDosForm } from "../../components/ToDosForm/toDosForm"

export const ToDos:React.FC = React.memo(():JSX.Element => {
    
    const {tasks} = useSelector(selectToDo)
    const dispatch = useDispatch()
    const [modal, setmModal] = useState<{id:number, taskId:number}>({id:0, taskId:0})

    useEffect(() => {
        dispatch(toggleForm({}))
    }, [])

    const isActive = (id:number, isOpen:boolean) => {
        dispatch(toggleForm({id: id, isOpen: isOpen}))
    }

    const onDragEnd = (result:any) => {
        const {destination, source, draggableId} = result

        if(!destination) {
            return
        }

        dispatch(dragEventDone({
            droppableIdStart: source.droppableId,
            droppableIdEnd: destination.droppableId,
            droppableIndexStart: source.index,
            droppableIndexEnd: destination.index,
            draggableId: draggableId
        }))
    }

    const [toDosForm, setToDosForm] = useState<boolean>(false)
    
    
    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="toDos">
                <div className="container">
                    <div className="toDos__wrapper">

                        <div className="toDos__items">
                            {tasks.map((elm) => {
                                return(
                                    <div>
                                        <ToDoExample   modal={modal}
                                            setmModal={setmModal} key={elm.id} info={elm} isActive={isActive}/>
                                    </div>
                                )
                            })}
                            {toDosForm ? <ToDosForm toDosForm = {toDosForm} setToDosForm = {setToDosForm}/> : <div onClick={() => setToDosForm(!toDosForm)} className="toDos__form">
                                <i  className="fa-solid fa-plus"></i>
                                <p>Add another list</p>
                            </div>}
                        </div>

                        
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
})