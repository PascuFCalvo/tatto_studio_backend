export const validation = (value:string, length:number) =>{
   if (!(value && value.length >0 && value.length <= length)){
      console.log ( value ,"is not a valid format, cannot be void and length must be < than :", length);
      return false;
      
   }else {console.log("Todo ok,", value)}
   return true;
   
   
}
