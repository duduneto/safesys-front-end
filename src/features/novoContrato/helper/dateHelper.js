export function formatDate(date){
    
    let data = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return data;
    
}