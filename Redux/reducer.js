const initialState= {
    users:[],
    Items:[],
    isLoaded:false
}
export const mainReducer=(state=initialState,action)=>{
switch (action.type) {
    case "addUser":{
    return {...state,users:[...state.users,action.payload]}
    }
    case "addItems":{
        return {
            ...state,
            Items:[...state.Items,action.payload]
        }
    }
    case "editItems":{
       const newArr=[...state.Items];
       newArr[action.payload.index]={
           url:action.payload.url,
           title:action.payload.title,
           des:action.payload.des,
           likes:action.payload.likes
       }
       return {...state,Items:newArr}
    }
    case "deleteItem":{
        return {...state,Items:state.Items.filter((item)=>{
         if(item.url!=action.payload.item.url||item.title!=action.payload.item.title||item.des!=action.payload.item.des||item.likes!=action.payload.item.likes)
         {
             return true;
         }
         return false
        })}
    }
    case "isLoaded":{
        return {...state,isLoaded:!state.isLoaded}
    }
     default:
            return state
}
}