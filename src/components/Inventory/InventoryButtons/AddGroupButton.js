import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const GroupButton=()=>{
    const navigate=useNavigate();

   const navigateToAddGroup=()=>{
        navigate('/inventory/addGroup')
   }
    return(<Button variant="primary" onClick={navigateToAddGroup}>Добави Група</Button>)
}

export default GroupButton;