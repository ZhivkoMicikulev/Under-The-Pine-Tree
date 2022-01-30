import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase,ref, push,onValue,remove,query, equalTo,update,orderByChild,get,child, startAt, endAt} from "firebase/database";


const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);



export const auth=getAuth();;
export const authChange=onAuthStateChanged;


const ConvertToArray=(jsonObject)=>{
   
  const arrays={
    objArr:[],
    nameArr:[]
  }
  
  if (jsonObject) {
    Object.keys(jsonObject).forEach(x=>{
      arrays.objArr.push({
      id:x,
      props:jsonObject[x],
      });
      
      arrays.nameArr.push(jsonObject[x].name)
       });


  }
    
  return arrays;   
        }

export function writeData(object,url) {
  push(ref(db, url),object);
}

 export async  function readData(url){


   const res = await get(query((ref(db, url))));
   const arr = ConvertToArray(res.val());
   return arr;
 
}


export async  function readSingleData(url,type){

  var result={};
  const res = await get(query((ref(db, url))));
  if (type=='product') {
    result={
      name: res.val().name,
      price: res.val().price,
      group: res.val().group,
      quantity: res.val().quantity
    };
  }
  else{
    result=res.val();
  }
  
  return result;
   

   
  }
  



export function deleteData(url){
 remove(ref(db,url));
}

export async function readDataBySpecificKey(key,prop,url){
 
  var que=query((ref(db,url)),orderByChild(prop),equalTo(key))



  const res = await get(que);
   const arr = ConvertToArray(res.val());
   return arr;
 
 
}

export async function readDataFromTo(key1,key2,prop,url){
 
  var que=query((ref(db,url)),orderByChild(prop),startAt(key1),endAt(key2))



  const res = await get(que);
   const arr = ConvertToArray(res.val());
   return arr;
 
 
}

export function updateData(url,object){

update(ref(db,url),object);
}



