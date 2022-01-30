import { signOut } from "firebase/auth";
import { Navigate, Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {auth} from '../../config/firebase'

const Logout=()=>{

    signOut(auth);
  return <Navigate to="/"/>
}

export default Logout;