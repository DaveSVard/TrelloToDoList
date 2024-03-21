import React, { useRef, useState } from "react";
import { ButtonsT, TasksT, User, UserRole } from "../../features/type";
import { Draggable } from "react-beautiful-dnd";
import "./toDoTaskExample.scss";
import { useSelector } from "react-redux";
import { closeAllTasksForm, deleteToDo, selectToDo, sendTaskToArchive, takeSingleTask, updateTodo } from "../../features/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom";

interface PropTypes {
  text: TasksT;
  id: number;
  index: number;
  toggleModalWindow: Function;
  setModal: Function;
  modal: { id: number; taskId: number };
}

const schema = Yup.object().shape({
    title: Yup.string()
        .required("Enter task description"),
})


export const ToDoTaskExample: React.FC<PropTypes> = React.memo(({ text, index, toggleModalWindow, id, modal, setModal }): JSX.Element => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}, setError} = useForm<{title:string}>({ resolver: yupResolver(schema) })

    const user:User = JSON.parse(localStorage.user)

    const changeTitle = (data:{title:string}) => {
        if(user.role != UserRole.USER) {
          dispatch(updateTodo({id: text.id, newText: data.title}))

          modal.taskId = 0
          modal.id = 0
          setModal({ ...modal });
        } else {
          setError("title", {message: "You cant do this!"})
        }
    }

    const sendToArchive = () => {

        dispatch(sendTaskToArchive({id: id, task: text}))
        navigate("/archive")
    }

    const buttons:ButtonsT[] = [
        {id: 1, icon: `fa-regular fa-pen-to-square`, name: "Edit Labels"},
        {id: 2, icon: `fa-regular fa-user`, name: "Change Members"},
        {id: 3, icon: `fa-solid fa-arrow-right`, name: "Move"},
        {id: 4, icon: `fa-regular fa-copy`, name: "Copy"},
        {id: 5, icon: `fa-regular fa-clock`, name: "Change Due Date"},
    ]


    const openModal = () => {
      dispatch(closeAllTasksForm());
      dispatch(takeSingleTask(text.id))
      toggleModalWindow(text);
    };


    const [modalPosition, setModalPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
    const itemRef = useRef<HTMLDivElement>(null);

    const openChangeModal = () => {

        calculateModalPosition()
        modal.taskId = text.id;
        modal.id = id;
        setModal({ ...modal });
    }

    const calculateModalPosition = () => {
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setModalPosition({
                top: rect.top + window.pageYOffset - 10,
                left: rect.left + window.pageXOffset - 10
            });
        }
    };




    
    return (
      <div>
        <Draggable draggableId={String(text.id)} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="toDo__list-item"
            >
              <div className="toDo__list-item__info" ref={itemRef}>
                <div className="toDo__list-item__title">
                  <p onClick={() => openModal()}>{text.title}</p>
                  <div className="toDo__list-item__icons">
                    {text.description ? (
                      <i className="fa-solid fa-bars-staggered"></i>
                    ) : (
                      <></>
                    )}
                    {text.comments?.length ? (
                      <p>
                        <i className="fa-regular fa-comment"></i>{" "}
                        {text.comments.length}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <i
                  className="fa-solid fa-pen pensil-hover pointer"
                  onClick={() => openChangeModal()}
                ></i>
              </div>
            </div>
          )}
        </Draggable>
        
        {modal.id == id && modal.taskId == text.id ? (
          <div className="modal__wrapper">
            <button onClick={() => {
                modal.taskId = 0
                modal.id = 0
                setModal({ ...modal });
            }} className="closeBtn"><i className="fa-solid fa-xmark"></i></button>
            <div className="mod" style={{top: modalPosition.top, left: modalPosition.left}}>

                <form onSubmit={handleSubmit(changeTitle)} className="modal__form">
                    <input placeholder="Change task title..." {...register("title")}/>
                    {errors.title && <p className="errors">{errors.title.message}</p>}

                    <div className="toDo__form-accept">
                        <button className="toDo__form-btn p-fz16">Save</button>
                    </div>
                </form>

                <div className="modal__tools">
                    {buttons.map(elm => {
                        return(
                            <div className="modal__tools-item" key={elm.id}>
                                <i className={elm.icon}></i>
                                <button>{elm.name}</button>
                            </div>
                        )
                    })}
                    <div className="modal__tools-item">
                        <i className="fa-solid fa-box-archive"></i>
                        <button onClick={() => sendToArchive()}>Archive</button>
                    </div>

                    <div className="modal__tools-item">
                      <i className="fa-regular fa-trash-can"></i>
                        <button onClick={() => dispatch(deleteToDo({listIndex: id, taskIndex: text.id}))}>Delete</button>
                    </div>

                </div>

            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
