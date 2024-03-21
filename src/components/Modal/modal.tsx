import React from "react"
import "./modal.scss"

interface PropTypes {
    active:boolean;
    setActive:Function;
    children:any;
}

export const Modal:React.FC<PropTypes> = React.memo(({active, setActive, children}):JSX.Element => {
    return(
        <div className={active ? "modal active" : "modal"} onClick={() => {setActive(false)}}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}> 
                {children}
            </div>
        </div>
    )
})