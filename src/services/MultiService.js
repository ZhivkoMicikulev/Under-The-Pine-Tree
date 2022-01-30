



export const ToLowerCase=(name)=>{
  return name.toLowerCase();
}

export const FirstLetterToUpperCase=(word)=>{
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const isTheElementExistInDataBase=(element,db)=>{
  return db.includes(element);
}
    
export const SortByProperty=(arr,property)=>{
var sortedArray=[];
  if(property=='name'){
   sortedArray= arr.sort(function(a, b){
      if(a.props.name.toLowerCase() < b.props.name.toLowerCase()) { return -1; }
      if(a.props.name.toLowerCase()  > b.props.name.toLowerCase() ) { return 1; }
      return 0;
    })
  }
    else if (property=='group') {
      sortedArray= arr.sort(function(a, b){
        if(a.props.group.toLowerCase() < b.props.group.toLowerCase()) { return -1; }
        if(a.props.group.toLowerCase()  > b.props.group.toLowerCase() ) { return 1; }
        return 0;
      })
    }
    else if (property=='none') {
      sortedArray= arr.sort(function(a, b){
        if(a.toLowerCase() < b.toLowerCase()) { return -1; }
        if(a.toLowerCase()  > b.toLowerCase() ) { return 1; }
        return 0;
      })
    }
    else if (property=='priceAsc') {
      sortedArray= arr.sort(function(a, b){
        if(a.props.price < b.props.price) { return -1; }
        if(a.props.price > b.props.price ) { return 1; }
        return 0;
      })
    }else if (property=='priceDesc') {
      sortedArray= arr.sort(function(a, b){
        if(b.props.price < a.props.price) { return -1; }
        if(b.props.price  > a.props.price ) { return 1; }
        return 0;
      })
    }else if (property=='quantityAsc') {
      sortedArray= arr.sort(function(a, b){
        if(a.props.quantity < b.props.quantity) { return -1; }
        if(a.props.quantity > b.props.quantity ) { return 1; }
        return 0;
      })
    }
    else if (property=='quantityDesc') {
      sortedArray= arr.sort(function(a, b){
        if(b.props.quantity < a.props.quantity) { return -1; }
        if(b.props.quantity > a.props.quantity ) { return 1; }
        return 0;
      })
    }
     
     


  return sortedArray;

  }





