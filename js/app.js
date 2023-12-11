const productName=document.getElementById('product-name');
const productAmount=document.getElementById('product-amount');

const queryString=window.location.search;
const urlParams= new URLSearchParams(queryString);
const API_URL='https://script.google.com/macros/s/AKfycbwkeoW-eyEjomw1PKpXWCzmApSk7Q_pCIAa1Vl-IcIj4YE8yBTI2bPSpwcAASlYypem-w/exec?action=getInsumos&product=Example2'

const product= urlParams.get('product');
productName.textContent=product;

const getProduct=async ()=>{  
    await axios.get(API_URL)
    .then((res)=>{
        productAmount.textContent='Cantidad: '+res.data;     
           
    }).catch((error=>{
        
        //return error;
    })) 
    
}

getProduct();