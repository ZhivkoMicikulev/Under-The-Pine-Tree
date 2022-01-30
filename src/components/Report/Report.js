import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { readDataFromTo } from '../../config/firebase';
import { ConvertToTimeStamp } from '../../services/ReportService';
import {  useState } from 'react';
import ReportTable from './ReportTable';
import { SortByProperty } from '../../services/MultiService';




const Report=()=>{

var [products,setProducts]=useState([]);
var [total,setTotal]=useState(0);
const [show, setShow] = useState(false);
const [alert, setAlert] = useState('');


    const OnShowReport=(e)=>{
        e.preventDefault();
      
      var dateFrom= ConvertToTimeStamp(e.currentTarget.dateFrom.value);
      var dateTo=ConvertToTimeStamp(e.currentTarget.dateTo.value);
      if (dateTo<dateFrom) {
          setShow(true);
          setAlert('Крайната дата не може да бъде преди началната дата!');
          e.currentTarget.dateFrom.value='';
          e.currentTarget.dateTo.value='';
      }
      else{
        readDataFromTo(dateFrom,dateTo,'date','reports')
        .then(res=>res.objArr)
        .then(data=>{
        var sumTotal=0;
        var itemsArr=[];
            data.map(report=>{
               
               sumTotal=(Number(report.props.totalEarns)+Number(sumTotal)).toFixed('2');
 
               if (itemsArr.length==0) {
                 itemsArr=(report.props.items)
                }
                else{
                    report.props.items.forEach(x=>{
                        var item=itemsArr.find(i=>i.name==x.name);
                        if (item) {
                            item.quantity=Number(item.quantity)+Number(x.quantity);
                            item.total=(Number(item.total)+Number(x.total)).toFixed('2');
                        }
                        else{
                            itemsArr.push(x);
                        }
                    })
                 }
                
            })
            setProducts(itemsArr);
            setTotal(sumTotal);
            show?setShow(false):setShow(false);
        })
      }
       
      
    }


  

    return(<section>
        <h1>Отчет</h1>
        <div>
        {show?(<Alert variant="danger" onClose={() => setShow(false)} dismissible>
  <p>{alert}</p>
</Alert>):null}
        <Form  onSubmit={OnShowReport} method="POST">
            <Row>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>От:</Form.Label>
    <Form.Control type="date"  name="dateFrom"/>
  </Form.Group>
                </Col>
    <Col>
    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>До:</Form.Label>  
    <Form.Control type="date"  name="dateTo"  />
  </Form.Group>
    </Col>

 
            </Row>
 
   <Button variant="primary" type="submit">
    Покажи
  </Button>
</Form>
        </div>
        <div>
            <br />
{
    products.length>0?<ReportTable products={products} total={total}/>:(<p>Няма информация за дадените дати!</p>)
}
        </div>
    </section>)
}

export default Report;