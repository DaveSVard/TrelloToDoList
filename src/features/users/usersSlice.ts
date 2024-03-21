import { createSlice } from "@reduxjs/toolkit";
import { User, UserRole } from "../type";
import { RootState } from "../../app/store";

if(!localStorage.users || JSON.parse(localStorage.users).length == 0) {
    localStorage.setItem("users", JSON.stringify(
        [
            {id: 1, userName: "Ann", email: "Anna@gmail.com", password: "1234", role: UserRole.ADMIN},
            {id: 2, userName: "Tigran", email: "Tigran@gmail.com", password: "4321", role: UserRole.USER},
            {id: 3, userName: "Petros", email: "Petros@gmail.com", password: "7890", role: UserRole.USER},
        ]))
}

const initialState:{users:User[], user:User} = {
    users: localStorage.users ? JSON.parse(localStorage.users) : [],
    user: localStorage.user ? JSON.parse(localStorage.user) : {} as User,
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload)
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        signIn: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(state.user))
        },
        logOut: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {createUser, signIn} = usersSlice.actions
export const selectUser = (state: RootState) => state.users
export default usersSlice.reducer