import '../../Style/IconsPerformance.css'

function IconsPerformance(propos){
const {value,src,nom} = propos
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