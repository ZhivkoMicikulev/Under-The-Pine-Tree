import {Card,Button,Col,Stack} from 'react-bootstrap';
import * as reportService from '../../services/ReportService';
import { deleteData} from '../../config/firebase';
import { useNavigate } from 'react-router-dom';




const DelayedBillCard=({
    bill
})=>{

    const navigate=useNavigate();
  
const OnClickPayBill=()=>{
reportService.PaymentKind(bill.props.items,'payNow','');
deleteData(`/delayedBills/${bill.id}`)
navigate('/bills')

}

const OnNavigateToBill=()=>{
    navigate(`/bills/delayedBills/${bill.id}`)
}


    return(
        <Col>
        <Card style={{ width: '15rem' }}>
          <Card.Body>
            <Card.Title>{bill.props.owner}</Card.Title>
            <Card.Text>
       {bill.props.total} лв.
            </Card.Text>
        <Stack direction="horizontal" gap={5}>
        <Button  variant="primary" onClick={OnClickPayBill}>Плати</Button>
            <Button variant="secondary" onClick={OnNavigateToBill} >Добави</Button>
        </Stack>
           
          </Card.Body>
        </Card>
        <br />
        </Col>
    )

}

export default DelayedBillCard