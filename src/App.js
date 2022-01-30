

import {auth,authChange} from './config/firebase';

import {Container} from 'react-bootstrap';

import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import ModalMsg from './components/Inventory/ProductInfo/Modal';
import Bills from './components/Bills/Bills';
import Logout from './components/Logout/logout';
import Inventory from './components/Inventory/Inventory';
import Report from  './components/Report/Report'
import AddInvoiceForm from './components/Inventory/AddInvoice/AddInvoice';
import AddGroupForm from './components/Inventory/AddGroup/AddGroupForm';
import { Route, Routes,Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import DelayedBills from './components/Bills/DelayedBills';
import DelayedBillView from './components/Bills/DelayedBillView';
import { ConvertToTimeStamp } from './services/ReportService';


function App() {

  const [products,setProducts]=useState([]);
  const [ids,setIds]=useState([]);
  const [total,setTotal]=useState(0);

  const [user,setUser]=useState(null)
  useEffect(()=>{

   authChange(auth, (authUser) => {
      if (authUser) {
     setUser(authUser)
    
      } else {
       setUser(null)

      }

      

      
  })
  
  
  },[]);

  return (

    <div id="container">
      
      <Header username={user?user.email:null} isAuthenticated={Boolean(user)}/>
    
    <main id="site-content">
    <Container fluid="sm">
       {user? (
     <Routes>

       <Route  path="/bills"  element={<Bills/>} />
       <Route exact  path="/"  element={<Bills/>} />

  <Route  path="/report"  element={<Report/>} />
  <Route exact path="/invetory/addInvoice"   element={<AddInvoiceForm/>} />
  <Route exact path="/inventory/addGroup"   element={<AddGroupForm/>} />
  <Route exact path="/inventory/removeProduct/:productId"   element={<ModalMsg/>} />
  <Route exact path="/bills/delayedBills"   element={<DelayedBills/>} />
  <Route exact path="/bills/delayedBills/:delayedBillId"   element={<DelayedBillView/>} />
  <Route exact  path="/inventory"  element={<Inventory/>} />
  <Route  path="/logout"   element={<Logout/>} />
</Routes> 
  ):
  (
<Routes> 
  <Route  path="/login"  element={<Login/>} />
</Routes> 
)
       }
 



</Container>
    </main>
    
  
   
    </div>

 
  );
}


export default App;
