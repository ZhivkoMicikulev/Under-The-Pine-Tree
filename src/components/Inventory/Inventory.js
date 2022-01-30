import * as productService from '../../services/ProductService';
import { useEffect, useState } from 'react';
import GroupButton from './InventoryButtons/AddGroupButton';
import AddProductButton from './InventoryButtons/AddProductButton';
import TableInventory from './TableInventory/TableInventory';
import * as multiService from '../../services/MultiService';
import {Form} from 'react-bootstrap';
const Inventory=({

})=>{

  const [products,setProducts]=useState([]);



   useEffect(()=>{
  
     productService.getAllProducts().then(res=>{setProducts(res.objArr)});
    

    
  },[]);

  const [sortType,setSortType]=useState('name');

const OnSortChange=(e)=>{

  setSortType(e.currentTarget.value);
}
    return( 
    <section>
    <h1>Инвентар</h1>
    <br />
<GroupButton/>
<br />
<br />
<AddProductButton/>
<br />

<br />
    {products.length > 0
                ? (
                  <div>
                      <Form.Select onChange={OnSortChange}>
     <option   value=' ' defaultValue hidden>Сортирай по...</option>
     <option   value='name'  >Име на продукт</option>
     <option   value='group'  >Група</option>
     <option   value='priceAsc'  > Цена възходящ ред</option>
     <option   value='priceDesc'  > Цена низходящ ред</option>
     <option   value='quantityAsc'  > Количество възходящ ред</option>
     <option   value='quantityDesc'  > Количество низходящ ред</option>
     </Form.Select>
     <br />
     <br />
     
     <TableInventory key='1' props={multiService.SortByProperty(products,sortType)}/>

                  </div>
                ) 
                : <p>Няма продукти в инвентара</p>
            }

    </section>
   

    )
  
}
export default Inventory;
