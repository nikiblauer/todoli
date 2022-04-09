import React from "react";


function Menu(props) {
    return (
        <nav>
                <ul>
                    {props.children}
                </ul>
        </nav>
    );
}


export default Menu;