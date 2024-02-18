export const RoundedIcon = ({userInitial, backGroundColor = "bg-slate-300", textColor = "text-black"})=>{
    return (
        <div style={{height: "40px", width: "40px"}}
             className={`rounded-full ${backGroundColor} ${textColor} flex items-center justify-center`}>
            <p>{userInitial}</p>
        </div>
    )
}