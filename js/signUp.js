const formCard=document.getElementById("form-card");
const form=document.getElementById("form-sign-up");
const username=document.getElementById("username");
const userEmail=document.getElementById("user-email");
const userCountry=document.getElementById("user-country");
const userPassword=document.getElementById("user-password");
const userPasswordRep=document.getElementById("user-password-rep");
const spinner=document.getElementById("spinner-card");
const successDiv=document.getElementById("signup-successful");
const successMessage=document.getElementById("success-message");

let firstOptionRemoved=false;

const API_DB_LINK='https://my-movies-list.herokuapp.com'

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    validateInputs();
    signUp();
})

const loadCountryList=async ()=>{
    //const response = await fetch("https://raw.githubusercontent.com/nicolas-palacio/my-movies-list/main/js/countries.json");
    //const countries = await response.json();

    let opt = document.createElement("option");
    opt.value = 'Your country'; 
    opt.innerHTML = 'Your country';
    userCountry.append(opt);

    countries.map( (country, i) => {
        let opt = document.createElement("option");       
        opt.value = country.name; 
        opt.innerHTML = country.name;
        userCountry.append(opt);
    });

}

userCountry.addEventListener('click',(e)=>{
    if(userCountry.value!='Your country' && !firstOptionRemoved){
        userCountry.remove(0);
        firstOptionRemoved=true;
    }
})

async function signUp() {
    if(userCountry.value=='Your country'){
        userCountry.value='';
    }else{
        formCard.classList.add("d-none");
        successDiv.classList.remove("d-none");
        spinner.classList.remove("d-none"); 
        
    }

   
    let res = await axios.post(API_DB_LINK+"/api/v1/auth/register",{
        username: `${username.value}`,
        email: `${userEmail.value}`,
        country:`${userCountry.value}`,
        password: `${userPassword.value}`,
        passwordConfirm: `${userPasswordRep.value}`
    }).then((response)=>{
        let data = response.data;       
        successDiv.classList.remove("d-none");
        spinner.classList.add("d-none"); 
        successMessage.classList.remove("d-none")       
    }).catch((error)=>{
        console.log(error.response.data.message.substring(28));
        showInvalidInputMessage(error.response.data.message.substring(28));
        successDiv.classList.add("d-none");
        spinner.classList.add("d-none");
        formCard.classList.remove("d-none");
    });
}

loadCountryList();

const validateInputs=()=>{
    if(username.value==''){
        username.classList.remove('is-valid');
        username.classList.add('is-invalid');
    }

    if(userEmail.value==''){
        userEmail.classList.remove('is-valid');
        userEmail.classList.add('is-invalid');
    }

    if(userCountry.value=='Your country'){
        userCountry.classList.add('is-invalid');
    }

    if(userPassword.value==''){
        userPassword.classList.remove('is-valid');
        userPassword.classList.add('is-invalid');
    }

    if(userPasswordRep.value==''){
        userPasswordRep.classList.add('is-invalid');
    }


}

const showInvalidInputMessage=(message)=>{

    usernameMessage(message);
    emailMessage(message);
    passwordMessage(message);
    passwordConfirmMessage(message);


    validateInputs();
}



function passwordConfirmMessage(message) {
    if (message.includes("passwords")) {
        userPasswordRep.classList.add('is-invalid');
        const passlInvalidMessage = document.getElementById('invalid-rep-password');
        passlInvalidMessage.innerHTML = `${message}`;
    } else {
        userPasswordRep.classList.add('is-valid');
        userPasswordRep.classList.remove('is-invalid');
    }
}

function passwordMessage(message) {
    if (message.includes("Minimum length is 8 characters") || userPassword.value.length < 8) {
        userPassword.classList.add('is-invalid');
        const passlInvalidMessage = document.getElementById('invalid-password');
        passlInvalidMessage.innerHTML = "Minimum length is 8 characters";
    }else{
        userPassword.classList.add('is-valid');
        userPassword.classList.remove('is-invalid');

    }
}

function emailMessage(message) {
    if (message.includes("email")) {
        userEmail.classList.add('is-invalid');
        const emailInvalidMessage = document.getElementById('invalid-email');
        emailInvalidMessage.innerHTML = `${message}`;

    } else {
        userEmail.classList.add('is-valid');
        userEmail.classList.remove('is-invalid');
    }
}

function usernameMessage(message) {
    if (message.includes("Username") || message.includes("username")) {
        username.classList.add('is-invalid');
        const usernameInvalidMessage = document.getElementById('invalid-username');
        usernameInvalidMessage.innerHTML = `${message}`;
    } else {
        username.classList.remove('is-invalid');
        username.classList.add('is-valid');
    }
}
