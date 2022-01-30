
import { useEffect, useState } from 'react';
import {Button,Modal,Form} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as multiService from '../../../services/MultiService';
import * as ProductService from '../../../services/ProductService';


 const ModalMsg=(

)=>{
    const productId=useParams().productId;
    var [product,setProduct]=useState({});
   

    useEffect(()=>{
        ProductService.getProduct(productId)
        .then(res=>{
           const newName=multiService.FirstLetterToUpperCase(res.name)
        res.name=newName
    return res;}).then(data=>{setProduct(data)})
      
    },[])
    
     const navigate=useNavigate();

    
  function OnSumbitRemove(e){
    e.preventDefault();
var formData=new FormData(e.currentTarget);
var quantityToRemove=formData.get('quantity');
var newQuantity=product.quantity-quantityToRemove
product.quantity=newQuantity;
ProductService.UpdateDataProducts(productId,product);
navigate('/inventory')
   };
      
      function NavigateToInventory(e){
        e.preventDefault();
        navigate('/inventory');
      }
    
         
        
  
 
    return(
        
    <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>   
        <Modal.Body>
          <p>Количество: {product.quantity}</p>
          <Form method='POST' onSubmit={OnSumbitRemove}>
  <Form.Group className="mb-3" >
    <Form.Label>Количество за премахване</Form.Label>
    <Form.Control type="number" placeholder="количество..."  name='quantity'/>
    
  </Form.Group>
  <Button variant="secondary" type="submit">
    Премахни
  </Button>
</Form>
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="primary" onClick={NavigateToInventory}>Отмени</Button>
        </Modal.Footer>
      </Modal.Dialog>)
}

export default ModalMsg