export type User = {
    id:number;
    userName:string;
    email:string;
    password:string;
    role:UserRole;
    toDos:TasksT[];
}

export type ToDos = {
    id:number;
    name:string;
    active?:boolean;
    tasks:TasksT[]
}

export type TasksT = {
    id:number;
    title:string;
    description?:string;
    comments?:{id:number, email:string, text:string}[]
    assigned_to?:User;   
    status:TaskStatus;
    deadline:Date;
}

export enum TaskStatus {
    TODO = "ToDo",
    DOING = "Doing",
    DONE = "Done"
}

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export type ButtonsT = {
    id:number;
    icon:string;
    name:string
}