const formPage=document.getElementById("form-page");
const formCard=document.getElementById('form-card')
const QRscanner=document.getElementById("QR-scanner");

const btnScanQR = document.getElementById("btn-scan-qr");
const html5Qrcode = new Html5Qrcode('reader');

const btnShowTable=document.getElementById('btn-excel');
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
const API_URL='https://script.google.com/macros/s/AKfycbygmwWjawfPrICA0-_NO705TAYxKFJR33dEuoiCNtguquUPeblF8eR1im4zREUbQxDIjw/exec'

const product= urlParams.get('product');

btnShowTable.addEventListener('click',(e)=>{
  window.open('https://docs.google.com/spreadsheets/d/1w3Fwv90ujmzOewlWA-dy8oXrL1yiceNDgd5PjV2gKHA/edit#gid=0','blank');
});

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
  if(localStorage.getItem("lastLocation")!=null || localStorage.getItem("lastLocation")!=undefined){
    lastLocation=localStorage.getItem("lastLocation");
  }

  let lastLvl=1;
  if(localStorage.getItem("lastLvl")!=null || localStorage.getItem("lastLvl")!=undefined){
    lastLvl=localStorage.getItem("lastLvl");
   
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
loadDropDown();
getProduct();

btnHome.addEventListener("click",(e)=>{
    window.location.href='https://project-inventario.vercel.app/index.html';
    //window.location.href='http://localhost:5500/index.html';
});

/*btnOut.addEventListener("click",(e)=>{
    const amountInt=parseInt(outField.value);
    localStorage.setItem("lastLocation",locationField.value);
    localStorage.setItem("lastLvl",lvlField.value);

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


        const qrCodeSuccessCallback = (decodedText, decodedResult)=>{
            if(decodedText){
                document.getElementById('show').style.display = 'block';
                document.getElementById('result').textContent = decodedText;
                html5Qrcode.stop();
                window.location.href='https://project-inventario.vercel.app/product-page.html?action=getInsumos&product='+decodedText;
                //window.location.href='http://localhost:5500/product-page.html?action=getInsumos&product='+decodedText;
            }
        }
        const config = {fps:10, qrbox:{width:250, height:250}}
        

const encenderCamara = () => {
    btnScanQR.hidden = true;
    html5Qrcode.start({facingMode:"environment"}, config,qrCodeSuccessCallback ); 
};

const encenderCamara2 = () => {
  console.log("HEEEEEEEEY")
  btnScanQR.hidden = true;
  html5Qrcode.start({facingMode:"environment"}, config,qrCodeSuccessCallback ); 
};

const cerrarCamara = () => {   
    html5Qrcode.stop();
    btnScanQR.hidden = false;
  };


btnAccept.addEventListener("click",(e)=>{
    const amountInt=parseInt(enterField.value);   
    localStorage.setItem("lastLocation",locationField.value);
    localStorage.setItem("lastLvl",lvlField.value);

    const DATA={amount:`${amountInt}`,location:""+locationField.value+" Nivel "+lvlField.value};
    
    
    fetch(API_URL+"?action=modInsumo&product="+product, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(DATA),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }).then(function(response){
        formCard.classList.add("d-none");
        QRscanner.classList.remove("d-none");
        encenderCamara2();
        //window.location=window.location;
      })
      

});
