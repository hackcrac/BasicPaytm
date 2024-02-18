export const Balance = ({amount})=>{
    return(
        <div className={"flex items-center justify-items-start m-4"}>
            <h2 className={"font-bold text-xl mr-4"}>Your Balance</h2>
            <p className={"font-semibold text-xl"}>{`Rs. ${transformAmount(amount)}`}</p>
        </div>
    )
}

function transformAmount(amount){
    const strAmount = amount.toString();
    let result = "";
    let count = 1;
    for(let i=strAmount.length-1; i>=0; i--){
        if((count)%3===0){
            result += `${strAmount[i]},`;
        }
        else{
            result += strAmount[i];
        }
        ++count;
    }
    return result.split("").reverse().join("");
}