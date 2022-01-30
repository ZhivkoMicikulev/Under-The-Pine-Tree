import { readData,writeData,deleteData,readDataBySpecificKey, updateData, readSingleData } from "../config/firebase"; 

export const addProduct=(object)=>writeData(object,'products');

export const getAllProducts=()=> readData("products");

export  const  getProduct=(id)=> readSingleData(`products/${id}`,'product');

export const addGroup=(object)=> writeData(object,'groups/');
 
export const getAllGroups=()=>readData('groups/')

export const removeGroup=(id)=>deleteData(`groups/${id}`);

export const DataFromDBbbyKey=(key,prop,url)=>readDataBySpecificKey(key,prop,url);

export const UpdateDataProducts=(id,object)=>updateData(`products/${id}`,object);















