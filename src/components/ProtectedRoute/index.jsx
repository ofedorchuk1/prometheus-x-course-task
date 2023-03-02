import {Navigate} from "react-router-dom";

export default function ProtectedRoute({isAuth, content}){
    return isAuth ? content : <Navigate to='/signin' replace/>
}