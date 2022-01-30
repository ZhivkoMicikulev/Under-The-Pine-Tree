import * as multiService from "../../../services/MultiService";
import {FormControl,Button,InputGroup} from 'react-bootstrap';
import { UpdateDataProducts } from "../../../services/ProductService";
import { useNavigate } from "react-router-dom";


const ProductInfo=(
    {
        productId,
        product
    }
)=>
{
const navigate=useNavigate();

  function SetNewPriceToProduct(e){  
const inputValue=e.currentTarget.parentElement.parentElement.querySelector('input').value


const price=Number(inputValue);
product.price=price;
UpdateDataProducts(productId,product);

  }

  function NavigateToModalMSG(){
navigate(`/inventory/removeProduct/${productId}`);
  }
    return(
        <tr  size="sm" >
        <td>{multiService.FirstLetterToUpperCase(product.group) }</td>
        <td>{multiService.FirstLetterToUpperCase(product.name)}</td>
        <td>{product.quantity}</td>
        <td id={productId}>{
            <InputGroup className="mb-1" size="sm">
            

    <FormControl
      placeholder={product.price?product.price:'0,0'}
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    name='price'
    type="number"
    />
    <Button  onClick={SetNewPriceToProduct}>
      Обнови
    </Button>
  </InputGroup>}</td>
  <td><Button variant="danger" onClick={NavigateToModalMSG}>Премахни
    </Button></td>

      </tr>
    )
}

export default ProductInfo;