const storage = localStorage;
const session = sessionStorage;

//Exportando função que salva dados no localstorage
export function save (key,value){
    storage.setItem(key,JSON.stringify(value));
}

export function saveSession(value){
    session.setItem('usuarioLogado', JSON.stringify(value));
}

export function removeLog(){
    session.removeItem('usuarioLogado')
}

export function GetUserLog(){
    try{
        return JSON.parse(session.getItem('usuarioLogado')) || {}
    }catch{
        return {}
    }
}

//Exportando função que tem como unica função
//Retorna um array de produtos que esta no localStorage ou um array vazio
export function getProducts(key, fallback = []){
    try{
        return JSON.parse(storage.getItem(key)) || fallback
    }catch{
        return fallback
    }
}

//Exportando função que tem com função retornar os dados do usuario
//caso não exista usuario cadastrado, a função retorna um objeto vazio
export function getUser(key, fallback = {}){
    try{
        return JSON.parse(storage.getItem(key)) || fallback
    }
    catch{
        return fallback
    }
}

