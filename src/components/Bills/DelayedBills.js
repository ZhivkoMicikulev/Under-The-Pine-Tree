import { useEffect, useState } from 'react';
import {Row} from 'react-bootstrap';
import { readData } from '../../config/firebase';
import DelayedBillCard from './DelayedBillCard';




const DelayedBills=()=>{

const [delayedBills,setDelayedBills]=useState([])

useEffect(()=>{
readData('/delayedBills').then(res=>res.objArr).then(data=>{
    setDelayedBills(data);
})


},[]);



return (
    <section>
        <h1>Неплатени сметки</h1>
    <br />
<div>
<Row>
{delayedBills.map(x=><DelayedBillCard bill={x} key={x.id}/>)}
</Row>

</div>
    </section>

)


}

export default DelayedBills;
