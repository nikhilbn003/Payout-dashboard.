const getLocalStorage = (key) =>{
     if(typeof key!=='undefined'){
        return localStorage.getItem(key);
     }
}

const setLocalStorage = (key,value) => {
    if(typeof key!=='undefined'){
    return localStorage.setItem(key,value);
    }
}

const Services =  {
    GetLocalStorage: getLocalStorage,
    SetLocalStorage: setLocalStorage
}

export default Services;