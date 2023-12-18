const formPage=document.getElementById("form-page");
const productName=document.getElementById('product-name');
const productAmount=document.getElementById('product-amount');
const btnAccept=document.getElementById('btn-accept');
const btnHome=document.getElementById('btn-home');
const enterField=document.getElementById('enter-field');
const locationField=document.getElementById('location-field');
const lvlField=document.getElementById('lvl-field');


const spinner=document.getElementById('spinner-card');


const queryString=window.location.search;
const urlParams= new URLSearchParams(queryString);
const API_URL='https://script.google.com/macros/s/AKfycbxftcLJimg4Ow0TRPFZ67L5v6lAgTTGfjCMYEBTuVMoqRg4NtChybmENYJUv0bROQPk_Q/exec'

const product= urlParams.get('product');

formPage.addEventListener("click",(e)=>{
    e.preventDefault();
});

const getProduct=async ()=>{ 
    spinner.classList.remove("d-none");
    formPage.classList.add("d-none");
    productName.classList.add("d-none");
    productAmount.classList.add("d-none");

    await axios.get(API_URL+"?action=getInsumos&product="+product)
    .then((res)=>{
        spinner.classList.add("d-none");
        formPage.classList.remove("d-none"); 
        productName.classList.remove("d-none");
        productAmount.classList.remove("d-none");
        
        productName.innerHTML=res.data.name;
        productAmount.innerHTML='Cantidad: '+res.data.amount;     
        
    }).catch((error=>{
        
        //return error;
    })) 
    
}

function loadDropDown(){
  let lastLocation='';
  if(sessionStorage.getItem("lastLocation")!=null || sessionStorage.getItem("lastLocation")!=undefined){
    lastLocation=sessionStorage.getItem("lastLocation");
  }

  let lastLvl=1;
  if(sessionStorage.getItem("lastLvl")!=null || sessionStorage.getItem("lastLvl")!=undefined){
    lastLvl=sessionStorage.getItem("lastLvl");
   
  }
  document.getElementById('op-'+lastLvl).selected=true;

  for(var i=65;i<=71;i++){ // ASCII codes from A to G
    var letter=String.fromCharCode(i);    

    for(var j=1;j<=9;j++){     
      var optionElement = document.createElement('option');
      optionElement.value=letter+j 
      optionElement.text=letter+j 
      if(lastLocation==optionElement.value){
        optionElement.selected=true;
      }
      //console.log("HELLO "+optionElement.value);
      locationField.appendChild(optionElement);
    }
    
  }
  
  
}

getProduct();
loadDropDown();

btnHome.addEventListener("click",(e)=>{
    window.location.href='http://localhost:5500/index.html';
});

/*btnOut.addEventListener("click",(e)=>{
    const amountInt=parseInt(outField.value);
    sessionStorage.setItem("lastLocation",locationField.value);
    sessionStorage.setItem("lastLvl",lvlField.value);

    const DATA={amount:`${amountInt}`,location:""+locationField.value+" Nivel "+lvlField.value};
    

    fetch(API_URL+"?action=modInsumo&product="+product, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(DATA),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }).then(function(response){
        window.location=window.location;
      })
});*/

btnAccept.addEventListener("click",(e)=>{
    const amountInt=parseInt(enterField.value);   
    sessionStorage.setItem("lastLocation",locationField.value);
    sessionStorage.setItem("lastLvl",lvlField.value);

    const DATA={amount:`${amountInt}`,location:""+locationField.value+" Nivel "+lvlField.value};
    
    
    fetch(API_URL+"?action=modInsumo&product="+product, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(DATA),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }).then(function(response){
        window.location=window.location;
      })
      

});

