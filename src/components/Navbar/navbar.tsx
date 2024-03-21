import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss"
import { useSelector } from "react-redux";
import { selectUser } from "../../features/users/usersSlice";

export const Navbar:React.FC = React.memo(():JSX.Element => {

    const {user} = useSelector(selectUser)
    const navigate = useNavigate()
    const logOut = () => {

        localStorage.removeItem("user")
        navigate("/")
    }

    const nav:any = useRef(null)

    const mobileNav = () => {
        nav.current.classList.toggle("nav__top-row--mobile")
        document.body.classList.toggle("no-scroll")
    }

    return(
        <nav className="nav">
            <div className="container">
                <div className="nav__wrapper">

                    {user.userName ? 

                    <div className="nav__row" ref={nav}>
                        <ul className="nav__row-list__left">
                            <h1 className="nav-title">Examle</h1>
                            <div className="nav__row-list__items">

                                <div className="nav__row-list__item">
                                    <i className="fa-regular fa-star"></i>
                                </div>
                                
                                <span className="line"></span>

                                <div className="nav__row-list__item">
                                    <p>Personal</p>
                                </div>

                                <span className="line"></span>

                                <div className="nav__row-list__item">
                                    <i className="fa-solid fa-lock"></i>
                                    <p>Private</p>
                                </div>

                                <span className="line"></span>
                                
                                <div className="nav__row-list__item">
                                    <p>Invite</p>
                                </div>

                            </div>
                        </ul>

                        <ul className="nav__row-list__right">
                            <div className="nav__row-list__items">

                                <div className="nav__row-list__item butler">
                                    <i className="fa-solid fa-bell-concierge"></i>
                                    <p>Butler</p>
                                </div>

                                <div onClick={() => mobileNav()} className="nav__row-list__item ghostMenuParent">
                                    <i className="fa-solid fa-bars"></i>
                                    <p>Show Menu</p>

                                    <div className="ghostMenu">
                                        <li className=""><NavLink to={"/toDos"}>ToDos</NavLink></li>
                                        <li className=""><NavLink to={"/archive"}>Archive</NavLink></li>
                                        {user.role == "user" ? <li><NavLink to={"/usersTasks"}>My Tasks</NavLink></li> : <></>}
                                        <button><i onClick={() => logOut()} className="fa-solid fa-right-from-bracket"></i>Log out</button>
                                    </div> 
                                </div>


                            </div>
                        </ul>
                    </div>
                    : 
                    <ul className="nav__list">
                        <li className="nav__list-item"><NavLink to={"/"}>SignIn</NavLink></li>
                        <li className="nav__list-item"><NavLink to={"/signUp"}>SignUp</NavLink></li>
                    </ul>}



                </div>
            </div>
        </nav>
    )
})