const movieSelected=sessionStorage.getItem("movieSelectedID");
const cardTitle=document.getElementById("card-movie-title");
const cardImg=document.getElementById("card-movie-img");
const cardDescription=document.getElementById("card-movie-description");
const cardYear=document.getElementById("card-movie-year");
const cardDuration=document.getElementById("card-movie-duration");
const btnAddToList=document.getElementById("btn-add-movie");
const btnRemoveFromList=document.getElementById("btn-remove-movie");

API_BACKEND_LINK='http://localhost:8888/';

const fillCard=(data)=>{  
    cardTitle.innerText=data.original_title;
    cardImg.setAttribute('src',`${imgURL}${data.backdrop_path}`);
    cardDescription.innerText=data.overview;
    cardYear.innerText="Release date: "+data.release_date;
    cardDuration.innerText="Duration: "+data.runtime+" min.";
};


const checkUserWatchedMovie=async()=>{
    const movieData=JSON.parse(sessionStorage.getItem("moviePageData"));

    const tokenAccess=sessionStorage.getItem("tokenAccess");
    await axios.get(API_BACKEND_LINK+'/api/v1/user/list',{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;
        console.log(movieData.id)
        checkMovieList(data,movieData.id);
        
    }).catch((error=>{
        return error;
    })) 

}

const checkMovieList=(array,movieID)=>{
    for (let index = 0; index < array.length; index++) {
        if(array[index].id==movieID){
            console.log("Hello");
            btnAddToList.classList.add("d-none");
            btnRemoveFromList.classList.remove("d-none");
        }        
    }
}


const getMovieData1=async(movieID)=>{
    let data='';
    sessionStorage.setItem("moviePageData",null);

    axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${APIKEY}`)
    .then((response)=>{
        data=response.data;
        sessionStorage.setItem("moviePageData",JSON.stringify(data));
        console.log(JSON.parse(sessionStorage.getItem("moviePageData")));
        fillCard(data); 
        checkUserWatchedMovie();       
    }).catch((error)=>{
        return error;
    })
}

getMovieData1(movieSelected);

btnAddToList.addEventListener("click",(e)=>{
    addMovieToList(sessionStorage.getItem("tokenAccess"));
});

btnRemoveFromList.addEventListener('click',(e)=>{
    removeUserMovie(sessionStorage.getItem("tokenAccess"))
});

const addMovieToList=async(token)=>{
    const movieData=JSON.parse(sessionStorage.getItem("moviePageData"));
    
    if(token==null || token=='null'){
        window.location.href="signIn.html";
    }else{

        axios.post(API_BACKEND_LINK+'/api/v1/user/movie',
        {        
                "id":`${movieData.id}`,
                "name":`${movieData.original_title}`,
                "year":`${movieData.year}`,
                "duration": `${movieData.runtime}`     
        },
        {
            headers:{
                'Authorization':`Bearer ${token}`
            },
    
        });
        location.reload();
    }
}

const removeUserMovie=(token)=>{
    const movieData=JSON.parse(sessionStorage.getItem("moviePageData"));
    axios.delete(API_BACKEND_LINK+'/api/v1/user/movie?id='+movieData.id,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    .then((response)=>{
        data=response.data;
        location.reload();
    }).catch((error)=>{
        return error;
    })
};

