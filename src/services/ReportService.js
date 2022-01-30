

import { deleteData, readDataBySpecificKey, readSingleData, updateData, writeData } from "../config/firebase";


export const ConvertToTimeStamp=(date)=>{
    var dateArr=date.split('-');
    var timestamp = (new Date( dateArr[0], dateArr[1] - 1, dateArr[2])).getTime();

    return timestamp
}


export const PaymentKind=(products,type,owner,billId)=>{

    var today=new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

   
   
    
    if (type=='payNow') {
       
        readDataBySpecificKey(date,'date','reports/').then(res=>res.objArr[0]).then(
            data=>{  
            var report=data;
            if (report) {
                products.map(item=>{
                 var   product=report.props.items.find(x=>x.name==item.name);
               
                    if (product) {
                        product.quantity=Number(product.quantity)+Number(item.quantity);
                        product.total=Number(product.total)+Number(item.totalPrice);
                    }
                    else{
                     report.props.items.push({
                         name:item.name,
                    quantity:item.quantity,
                total:item.totalPrice});
                    }
                  
                    report.props.totalEarns=(Number(report.props.totalEarns)+Number(item.totalPrice)).toFixed('2');

                })
                updateData(`reports/${report.id}`,report.props);
             }
             else{
                 report={
                     date:ConvertToTimeStamp(date),
                     totalEarns:0,
                     items:[]
                 };
         
                 products.map(x=>{
                  report.items.push({
                      name:x.name,
                 quantity:x.quantity,
             total:x.totalPrice});
         report.totalEarns=Number(report.totalEarns)+Number(x.totalPrice);
                 })
                writeData(report,'reports');
             }
      
   
   
   
   
            })

            products.map(item=>{
                readSingleData(`products/${item.id}`).then(res=>{
                   res.quantity=Number(res.quantity)-Number(item.quantity);
                   updateData(`products/${item.id}`,res);
                })

               
            })
             
    
    
   
        }
        else{

       

            var delayBill={
               date:ConvertToTimeStamp(date),
               owner,
                items:[],
                total:0
            }

            products.map(item=>{
                delayBill.total=(Number(delayBill.total)+Number(item.totalPrice)).toFixed('2');
                delayBill.items.push(item);
            })  
          
            if (billId) {
               
                updateData(`/delayedBills/${billId}`,delayBill)
            }
            else{
                writeData(delayBill,'delayedBills')

            }
        }



}

export const MakeYearReport=(products,year,total,reportsIds)=>{
   
    var yearReport={
year,
products,
total
    };

    writeData(yearReport,'yearReports');
    reportsIds.map(x=>deleteData(`reports/${x}`));
}