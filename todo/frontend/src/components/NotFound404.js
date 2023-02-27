import {useLocation} from "react-router-dom";
import React from "react";

const NotFound404 = () => {
    let {pathname} = useLocation();
    return(
        <div>
            <h1>Страница {pathname} не найдена</h1>
        </div>
    )
}

export default NotFound404
