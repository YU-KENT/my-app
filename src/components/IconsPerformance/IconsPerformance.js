import '../../Style/IconsPerformance.css'

function IconsPerformance(data){
const {value,src,nom} = data
return(
<div className="icons_bg">
  <div className='icons_icon' id={nom}>
    <img src={src}  alt='icons'></img>
  </div>
  <div className='icons_performance'>
     <p>{value}</p>
     <span>{nom}</span>
  </div>
</div>
)
}

export default IconsPerformance