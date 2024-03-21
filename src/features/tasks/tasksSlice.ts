import { createSlice } from "@reduxjs/toolkit";
import { TaskStatus, TasksT, ToDos } from "../type";
import { RootState } from "../../app/store";

if(!localStorage.tasks || JSON.parse(localStorage.tasks).length == 0) {
    localStorage.setItem("tasks", JSON.stringify([
        {
            id: 1,
            name: "ToDo",
            active: false,
            tasks: [
                {id: 1, title: "Task1", status: TaskStatus.TODO, deadline: new Date(), comments: [
                    {id: 1, email: "Anna@gmail.com", text: "Comment1"}
                ]},
                {id: 2, title: "Task2", status: TaskStatus.TODO, deadline: new Date(), comments: []},
            ]
        },
        {
            id: 2,
            name: "Doing",
            active: false,
            tasks: [
                {id: 3, title: "Task3", status: TaskStatus.DOING, deadline: new Date(), comments: []},
                {id: 4, title: "Task4", status: TaskStatus.DOING, deadline: new Date(), comments: []},
            ]
        },
        {
            id: 3,
            name: "Done",
            active: false,
            tasks: [
                {id: 5, title: "Task5", description: "toDo", status: TaskStatus.DONE, deadline: new Date(), comments: []},
                {id: 6, title: "Task6", description: "do it", status: TaskStatus.DONE, deadline: new Date(), comments: []}
            ]
        }
    ]))
}


const initialState:{tasks:ToDos[], task:TasksT, archive:ToDos[]} = {
    tasks: localStorage.tasks ? JSON.parse(localStorage.tasks) : [],
    task: {} as TasksT,
    archive: localStorage.archive ? JSON.parse(localStorage.archive) : [
        {id: 1, name: "ToDo", tasks: [
            // {id: 2, title: "Task2", status: TaskStatus.TODO, deadline: new Date(), comments: []},
        ]},
        {id: 2, name: "Doing", tasks: [
            // {id: 3, title: "Task3", status: TaskStatus.DOING, deadline: new Date(), comments: []}
        ]},
        {id: 3, name: "Done", tasks: [
            // {id: 6, title: "Task6", description: "do it", status: TaskStatus.DONE, deadline: new Date(), comments: []},
        ]}
    ]
}

export const toDoSlice = createSlice({
    name: "toDo",
    initialState, 
    reducers: {
        addToDosList: (state, action) => {
            state.tasks.push(action.payload)
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        addToDo: (state, action) => {
            const {id, data} = action.payload
            state.tasks.find(elm => {
                if(elm.id == id) {
                    elm.tasks.push(data)
                }
            })
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        deleteToDo: (state, action) => {
            const {listIndex, taskIndex} = action.payload

            state.tasks.map(elm => {
                if(elm.id == listIndex) {
                    elm.tasks = elm.tasks.filter(el => el.id != taskIndex)
                }
            })

            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        updateTodo: (state, action) => {
            const { id, newText } = action.payload;
            
            state.tasks.map(elm => {
                elm.tasks.map(tasks => {
                    if(tasks.id == id) {
                        tasks.title = newText
                    }
                })
            })

            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        addDescription: (state, action) => {
            const { toDoIndex, taskIndex, description } = action.payload

            const toDo = state.tasks.find(elm => elm.id == toDoIndex)
            const task = toDo?.tasks.find(elm => elm.id == taskIndex)

            if(task) task.description = description

            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        addComment: (state, action) => {
            const { toDoIndex, taskIndex, comment } = action.payload

            const toDo = state.tasks.find(elm => elm.id == toDoIndex)
            const task = toDo?.tasks.find(elm => elm.id == taskIndex)

            if(task) {
                task.comments?.push(comment)
            }
            
            localStorage.setItem("task", JSON.stringify(state.task))
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        takeSingleTask: (state, action) => {
            const id = action.payload
            console.log(id);

            
            state.tasks.map(elm => {
                elm.tasks.map(el => {
                    if(el.id == id) {
                        state.task = el
                    }
                })
            })

            localStorage.setItem("task", JSON.stringify(state.task))
        },
        sendTaskToArchive: (state, action) => {
            const {id, task} = action.payload


            state.archive.find(elm => {
                if(elm.id == id) {
                    elm.tasks.push(task)
                }
            })

            state.tasks.find(elm => {
                if(elm.id == id) {
                    elm.tasks = elm.tasks.filter(el => el.id != task.id)
                }
            })

            localStorage.setItem("archive", JSON.stringify(state.archive))
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        sendTaskBackFromArchive: (state, action) => {
            const {listId, task} = action.payload

            state.tasks.find(elm => {
                if(elm.id == listId) {
                    elm.tasks.push(task)
                }
            })

            state.archive.find(elm => {
                if(elm.id == listId) {
                    elm.tasks = elm.tasks.filter(el => el.id != task.id)
                }
            })

            localStorage.setItem("archive", JSON.stringify(state.archive))
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        toggleForm: (state, action) => {
            const {id, isOpen} = action.payload
            state.tasks.map(elm => {
                if(elm.active == true) elm.active = false
                if(elm.id == id) elm.active = !elm.active
                if(isOpen == true && elm.id == id) elm.active = false
            })
        },
        closeAllTasksForm: (state) => {
            state.tasks.map(elm => {
                if(elm.active == true) elm.active = false
            })
        },
        dragEventDone: (state, action) => {
            const {droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId} = action.payload

            if(droppableIdStart == droppableIdEnd) {
                const list = state.tasks.find(elm => elm.id == +droppableIdStart) 
                const card = list?.tasks.splice(droppableIndexStart, 1)

                if(card) {
                    list?.tasks.splice(droppableIndexEnd, 0, ...card)
                }
            }

            if(droppableIdStart != droppableIdEnd) {
                const listStart = state.tasks.find(elm => elm.id == +droppableIdStart) 
                const card = listStart?.tasks.splice(droppableIndexStart, 1)

                const listEnd = state.tasks.find(elm => elm.id == +droppableIdEnd)
                if(card) {
                    listEnd?.tasks.splice(droppableIndexEnd, 0, ...card)
                }
            }

            localStorage.setItem("tasks", JSON.stringify(state.tasks))          
        }
        
    }
})

export const {
    addToDosList,
    addToDo,
    deleteToDo,
    toggleForm, 
    closeAllTasksForm, 
    dragEventDone, 
    addDescription, 
    addComment, 
    sendTaskToArchive, 
    updateTodo, 
    takeSingleTask,
    sendTaskBackFromArchive
} = toDoSlice.actions
export const selectToDo = (state: RootState) => state.toDo
export default toDoSlice.reducer