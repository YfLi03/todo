export function getDateID(_date){
    return String((_date.getFullYear()%100)*10000+(_date.getMonth()+1)*100+_date.getDate());
}