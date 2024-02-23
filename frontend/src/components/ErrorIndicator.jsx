export function ErrorIndicator({color, text}){
    return(
        <p className={`text-sm ${color} text-center`}>{text}</p>
    )
}