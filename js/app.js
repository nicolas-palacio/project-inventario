const formPage=document.getElementById("form-page");
const productName=document.getElementById('product-name');
const productAmount=document.getElementById('product-amount');
const btnEnter=document.getElementById('btn-enter');
const btnOut=document.getElementById('btn-out');
const enterField=document.getElementById('enter-field');

const queryString=window.location.search;
const urlParams= new URLSearchParams(queryString);
const API_URL='https://script.google.com/macros/s/AKfycbwXia3R4oo0tB-GF5lNdeD0Kj1cw4atLsCubKG38lf06rDAC-Ox0XDlYZuZsNdeQkQ6XQ/exec'

const product= urlParams.get('product');
productName.textContent=product;

formPage.addEventListener("click",(e)=>{
    e.preventDefault();
});

const getProduct=async ()=>{  
    await axios.get(API_URL+"?action=getInsumos&product="+product)
    .then((res)=>{
        productAmount.textContent='Cantidad: '+res.data;     
           
    }).catch((error=>{
        
        //return error;
    })) 
    
}
getProduct();

btnEnter.addEventListener("click",(e)=>{
    const amountInt=parseInt(enterField.value);

    const DATA={amount:`${amountInt}`,option:"add"};
    console.log(JSON.stringify(DATA)+"  hiii");

    fetch(API_URL+"?action=modInsumo&product="+product, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(DATA),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      })

    /*axios.post(API_URL+"?action=modInsumo&product="+product,{
        amount:`${enterField}`,
        option:"add"
    }).then((response)=>{        
        console.log("HIIII");
    }).catch((error)=>{
        
    });*/
});

