
import {Table} from 'react-bootstrap';
import ReportTableRow from './ReportTableRow';


const ReportTable=(
    {products,
    total}
)=>{

    return(
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Продукт</th>
      <th>Продадени бройки</th>
      <th>Сума</th>
    </tr>
  </thead>
  <tbody>
   {products.map(x=><ReportTableRow product={x} key={x.name}/>)}
   <tr>
       <td>
         Оборот:  {total} лв.
       </td>
   </tr>
  </tbody>
</Table>
    )
}

export default ReportTable;