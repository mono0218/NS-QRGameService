import {Navigate} from "react-router-dom";

export async function UserList() {
    const apiKey = sessionStorage.getItem('apiKey');

    if (!apiKey){
        return  <Navigate to="/login" />
    }

    return (
        <></>
    )
}
