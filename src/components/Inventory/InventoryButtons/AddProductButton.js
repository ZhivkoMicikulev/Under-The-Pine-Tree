import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const AddProductButton=()=>{
  const navigate=useNavigate();
  
  function MoveTo(){
navigate("/invetory/addInvoice")
  }

    return(<div className="d-grid gap-2">
    <Button variant="primary" size="lg" onClick={MoveTo}>
     Добави продукти
    </Button>
    
  </div>)
}

export default AddProductButton;