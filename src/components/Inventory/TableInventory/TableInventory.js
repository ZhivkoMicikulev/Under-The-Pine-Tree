import {Table} from 'react-bootstrap';
import ProductInfo  from '../ProductInfo/ProductInfo'
const TableInventory=({
    props
})=>
{


    return (
     
    
   
     
    <Table striped bordered hover variant="dark" size='sm' >
    <thead>
      <tr>
      <th>Група</th>
      <th>Продукт</th>
      <th>Наличност</th>
      <th>Цена</th>
      <th>Премахни/Изтрий</th>
      </tr>
      
    </thead>
    <tbody>
    {props.map(item => <ProductInfo key={item.id} product={item.props} productId={item.id} />)}
  
    </tbody>
  </Table>

  )
}

export default TableInventory;

