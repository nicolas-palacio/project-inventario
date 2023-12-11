const emailInput= document.getElementById("email-input");
const passwordInput= document.getElementById("password-input");
const loginBtn=document.getElementById("login-btn");
const emailNotConfirm = document.getElementById('invalid-credentials');
API_BACKEND_LINK='https://my-movies-list.herokuapp.com';


loginBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    signIn();
   
});

async function signIn() {    
   
    axios.post(API_BACKEND_LINK+"/api/v1/auth/authenticate",{
        email:`${emailInput.value}`,
        password:`${passwordInput.value}`
    }).then((response)=>{
        const tokenAccess = response.data.token;       
        sessionStorage.setItem("tokenAccess",tokenAccess);
        window.location.href="index.html";    
    }).catch((error)=>{
        sessionStorage.setItem("emailNotConfirmed",emailInput.value);
        showInvalidInputMessage(error.response.data.message);
        emailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        
    });
}

const showInvalidInputMessage=(message)=>{
    if(message.includes("403")){       
        emailNotConfirm.innerHTML = `${message.substring(16)}.<div></div> <a id="resend" style="cursor:pointer;" class="">Re-send email.</a>`;
        const resendLink=document.getElementById("resend");
        resendLink.addEventListener('click',(e)=>{
            reSendEmail();
        })
    }else{
        emailNotConfirm.innerHTML = `Incorrect username or password.`;
    }
}

const reSendEmail=async()=>{
    const email=sessionStorage.getItem("emailNotConfirmed",emailInput.value);
    console.log(email);

    axios.post(API_BACKEND_LINK+"/api/v1/auth/email/confirm",{
        email:`${email}`,       
    }).then((response)=>{
        console.log(response)  
        alert("Check your email to confirm the account.")
    }).catch((error)=>{
        console.log(error)       
    });

}