import { useEffect, useState ,useRef} from 'react';
import {Form,Button,Alert} from 'react-bootstrap';
import GroupOption from './Option/GroupOption';
import * as productService from '../../../services/ProductService'
import * as multiService from '../../../services/MultiService';
import { Typeahead } from 'react-bootstrap-typeahead';


const AddInvoiceForm=()=>{
    
const [groups,setGroups]=useState([]);
const [productsName,setProductsNames]=useState([]);
const [products,setProducts]=useState([]);
const [selected, setSelected] = useState([]);
const [show, setShow] = useState(false);
const [alert, setAlert] = useState('');
const typeahedInput=useRef(null);


    useEffect(()=>{
productService.getAllGroups().then(res=>
  res.objArr
).then(data=>{ setGroups(multiService.SortByProperty(data,'name'))})
      
  
    },[]);
 
    const onAddProductHandler=(e)=>{
e.preventDefault();

const group=e.currentTarget.group;
const productName=e.currentTarget.querySelector('input');
const quantity=e.currentTarget.quantity;

if (productName.value.length<3){
  setAlert('Името на продукта трябва да е поне 3 символа!')
  setShow(true)
  typeahedInput.current.clear();

}
else if (group.value==' ') {
  setAlert('Трябва да бъде избрана група!')
  setShow(true)
group.value=" ";

}
else if (quantity.value<=0) {
  setAlert('Трябва да има поне една бройка!')
  setShow(true)
quantity.value=0;

} 
else {
 
  
  if(multiService.isTheElementExistInDataBase((multiService.ToLowerCase(productName.value)),productsName)){

    const product=products.find(x=>x.props.name==multiService.ToLowerCase(productName.value));

const newQuantity=Number(product.props.quantity)+Number(quantity.value);
product.props.quantity=newQuantity;

productService.UpdateDataProducts(product.id,product.props);
  }
  else{
     var invoice={
      name:multiService.ToLowerCase(productName.value),
      group:group.value,
     quantity: quantity.value
    };
    productService.addProduct(invoice);
  }
  

productName.value='';
quantity.value=0;
group.value=" ";


  show==true?setShow(false):setShow(false);

}





    };

    const OnChangeGroupItems=(e)=>{
const group=e.currentTarget;
productService.DataFromDBbbyKey(group.value,'group','products').then(res=>{
  setProducts(res.objArr);
  setProductsNames(res.nameArr);
});


 
 






    }

return (

<Form onSubmit={onAddProductHandler} method="POST">
    <Form.Group className="mb-3" controlId="formBasicEmail">
    {show?(<Alert variant="danger" onClose={() => setShow(false)} dismissible>
  <p>{alert}</p>
</Alert>):null}
      <Form.Label>Група:</Form.Label>
      <Form.Select aria-label="Default select example" name="group"  onChange={OnChangeGroupItems}>
  <option  disabled value=' ' defaultValue hidden>Група...</option>
{groups.map(x => <GroupOption key={x.id} group={x} />)}
</Form.Select>
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Продукти:</Form.Label>
      <Typeahead
      ref={typeahedInput}
      id="basic-example"
      onChange={setSelected}
      options={productsName}
      placeholder="Име на продукта"
      selected={selected}
      labelKey="name"
    />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Бройки:</Form.Label>
      <Form.Control type="number" placeholder="Бройки..."  name="quantity" />
    </Form.Group>

    

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>)
}

export default AddInvoiceForm;