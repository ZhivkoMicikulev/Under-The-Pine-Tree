import {Form,Button,Table, Alert} from 'react-bootstrap';
import * as productService from '../../../services/ProductService';
import GroupTableRow from './GroupTableRow/GroupTableRow';
import { useEffect, useRef, useState } from 'react';
import * as multiService from '../../../services/MultiService';
import { Typeahead } from 'react-bootstrap-typeahead';

const AddGroupForm=()=>{
const [groups,setGroups]=useState([]);
const [groupNames,setGroupsNames]=useState([]);
const [selected, setSelected] = useState([]);
const [show, setShow] = useState(false);
const [alert, setAlert] = useState('');

const [flag,setFlag]=useState(true);
const typeahedInput=useRef(null);
 



  useEffect(()=>{
    const names=[];
    productService.getAllGroups().then(res=>{
      setGroups(multiService.SortByProperty(res.objArr,'name'));
        setGroupsNames(res.nameArr);
    })

  

  
        },[flag])


    const OnAddGroupHandler=(e)=>{
     e.preventDefault();

        const groupName=e.currentTarget.querySelector('input');
        


        if (groupName.value.length>3){
          if (multiService.isTheElementExistInDataBase((multiService.ToLowerCase(groupName.value)),groupNames))
          {
            setShow(true);
            setAlert('Групата вече съществува!')
          }
          else{
            const group={
              name:multiService.ToLowerCase(groupName.value)
            };
            productService.addGroup(group);
            flag==true?setFlag(false):setFlag(true);
            show==true?setShow(false):setShow(false);

  
          }
      
        }
        else
        {
setShow(true);
setAlert('Името на групата трябва да има поне 3 букви!');
        }
typeahedInput.current.clear();

   
    }

    const  onDeleteHandler=(e)=>{
      e.preventDefault();
      const id=e.currentTarget.name;
  productService.removeGroup(id)
  flag==true?setFlag(false):setFlag(true);
  

}  
  

return(
<section><br />
<br />
<Form onSubmit={OnAddGroupHandler}  method="POST">
<Button variant="primary" type="submit" >
      Запиши
    </Button>
    <br />
    <br />

    <Form.Group className="mb-3" >
    
      {show?(<Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <p>{alert}</p>
      </Alert>):null}
      <Typeahead
      ref={typeahedInput}
      id="basic-example"
      onChange={setSelected}
      options={groupNames}
      placeholder="Име на групата"
      selected={selected}
      labelKey="name"
    />

    </Form.Group>

    
  </Form> <br /><br />
  <Table striped bordered hover variant="dark" size='sm'>
  <thead>
    <tr>
      <th>Група</th>  
    </tr>
  </thead>
  <tbody>
{


groups.length>0?
groups.map(x=> <tr><GroupTableRow group={x} key={x.id}/> 
     <td>
            <Button variant='danger' key={x.id} onClick={onDeleteHandler} name={x.id}>Изтрий</Button></td>
</tr>
  )
  :(<p className="no-pets">Няма добавени групи!</p>)}
  </tbody>
</Table>

  </section>)




};

export default AddGroupForm;