
import {Form,Button,Alert,Table} from 'react-bootstrap';
import {  useState,useRef, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as productService from '../../services/ProductService';
import * as multiService from '../../services/MultiService';
import * as reportService from '../../services/ReportService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteData,readData, readSingleData } from '../../config/firebase';


const DelayedBillView=(

)=>{

const billId=useParams().delayedBillId;
const navigate=useNavigate();

    const [productsName,setProductsNames]=useState([]);
const [products,setProducts]=useState([]);
const [total,setTotal]=useState();
const [refresh,setRefresh]=useState(true);

    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState('');
    const typeahedInput=useRef(null);   
const [productsInBill,setProductsInBill]=useState([]);
    const [owner,setOwner]=useState('');

    useEffect(()=>{
        productService.getAllProducts()
        .then(res=>{
            setProducts(res.objArr);
            setProductsNames(multiService.SortByProperty(res.nameArr,'none'));

            readSingleData(`/delayedBills/${billId}`)
            .then(res=>{
                setProductsInBill(res.items);
                setOwner(res.owner);
                var sumTotal=0;
                res.items.map(x=>sumTotal=(Number(x.totalPrice)+Number(sumTotal)).toFixed('2'))
                setTotal(sumTotal);
            })
        });
        },[])

        function OnSubmitRegisterProductInBill(e){
            e.preventDefault();
            
             var quantity=e.currentTarget.quantity;
             var productName =e.currentTarget.querySelector('.rbt-input');
            
            
             if (Number(quantity.value)<=0) {
                 setAlert('Количеството трябва да е поне 1 брой!')
                 setShow(true);
                 quantity.value=0;
             }
            
             else if (productName.defaultValue==''||!multiService.isTheElementExistInDataBase(productName.defaultValue,productsName)) {
                setAlert('Невалиден продукт!')
                setShow(true);
              typeahedInput.current.clear();
            
                console.log(productName);
             }
             else{
                var product=productsInBill.find(x=>(x.name==productName.defaultValue));
               
            
                if (product) {
            
                product.quantity=Number(product.quantity)+Number(quantity.value);
                product.totalPrice=(Number(product.price)*Number(product.quantity)).toFixed('2');
                setTotal((Number(total)+(Number(product.price)*Number(quantity.value))).toFixed('2'));
            
                quantity.value=0;
                typeahedInput.current.clear();
            
            
                }
                else{
                 
                    product=products.find((x)=>x.props.name==productName.defaultValue);  
                   var productToAdd={
                       id:product.id,
                name:product.props.name,
                quantity:Number(quantity.value),
                price:product.props.price,
                totalPrice:(Number(product.props.price)*Number(quantity.value)).toFixed(2)
                    }
                
                    productsInBill.push(productToAdd);
                    typeahedInput.current.clear();
                    quantity.value=0;
               total?setTotal((Number(total)+Number(productToAdd.totalPrice)).toFixed('2')):setTotal(Number(productToAdd.totalPrice).toFixed('2'))
              
            
                }
                refresh?setRefresh(false):setRefresh(true);
               
             
            
             }
            
            
            }

            const OnClickPayNow=()=>{
                reportService.PaymentKind(productsInBill,'payNow','');
deleteData(`/delayedBills/${billId}`)
navigate('/bills')
                  }

                  const OnClickDelayedPayment=()=>{
                  
                      reportService.PaymentKind(productsInBill,'delayed',owner,billId);
                      
navigate('/bills')
                  
                      
                    
                
                  }
                  const OnClickRemoveFromBill=(e)=>{
                    e.preventDefault();
                    var id=e.currentTarget.id;
                    var productToRemove=productsInBill.find(x=>x.id==id);
                var newTotal=(total-Number(productToRemove.totalPrice)).toFixed('2');
                   
                  var index=productsInBill.indexOf(productToRemove);
               
                   productsInBill.splice(index,1);
                 setTotal(newTotal);
                 refresh?setRefresh(false):setRefresh(true);
                
                  
                  }
                
    return(
        <section>
        <h1>Сметката на {owner}</h1>
        <div>
          <div>
    
          </div>
        <div>
  {show?(<Alert variant="danger" onClose={() => setShow(false)} dismissible>
  <p>{alert}</p>
</Alert>):null}
    
        <Form method="POST" size='sm' onSubmit={OnSubmitRegisterProductInBill} >
    <Form.Group size='sm' className="mb-3">
  
      <Form.Label>Продукт:</Form.Label>
      <Typeahead
      size='sm'
      ref={typeahedInput}
      id="basic-example"
 
      options={productsName}
      placeholder="Име на продукта"
    
    />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Бройка:</Form.Label>
      <Form.Control size='sm' type="number" placeholder="Бройка..."  name="quantity" />
    </Form.Group>

    

    <Button size='sm' variant="primary" type="submit">
     Добави
    </Button>
  </Form>
        </div>
        <br />
        <div>
            {productsInBill.length!=0?
                <Table striped bordered hover variant="dark" size="sm">
  <thead>
    <tr>
      
      <th>Продукт</th>
      <th>Брой</th>
      <th>Ед.Цена</th>
      <th>Цена</th>
      <th>Премахни</th>

    </tr>
  </thead>
  <tbody>
 {productsInBill.map(item=>(  <tr key={item.id} >
  <td>{multiService.FirstLetterToUpperCase(item.name)}</td>
  <td>{item.quantity}</td>
  <td>{item.price}</td>
  <td>{item.totalPrice}</td>
  <td> <Button size='sm' variant="primary" type='button' variant='danger' id={item.id} onClick={OnClickRemoveFromBill}>
 Премахни
</Button></td>

</tr>))}  
<tr>
    <td>Общо: {total}лв.</td>
    <td>  <Button size='md' variant="primary" onClick={OnClickPayNow} >
     Плати
    </Button></td>
    <td><Button size='md' variant="secondary" onClick={OnClickDelayedPayment} >
     Висяща сметка
    </Button></td>

</tr>
  </tbody>
 
</Table>
    
            :<p>Няма добавени продукти!</p> 

            }
           
        </div>
        
        </div>
    </section>
  
)
    
}

export default DelayedBillView;