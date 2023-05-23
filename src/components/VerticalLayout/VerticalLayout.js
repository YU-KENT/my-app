import'../../Style/VerticalLayout.css'
import icon1 from'../../assets/icon1.png'
import icon2 from'../../assets/icon2.png'
import icon3 from'../../assets/icon3.png'
import icon4 from'../../assets/icon4.png'

function VerticalLayout() {
  return (
        
        <div className='vertical-navbar' >
          
          <div id='layout-icon1'>
            <img src={icon1} alt='icon'></img>
          </div>
          <div id='layout-icon2' >
            <img src={icon2} alt='icon'></img>
          </div>
          <div id='layout-icon3'>
            <img src={icon3} alt='icon'></img>
          </div>
          <div id='layout-icon4'>
            <img src={icon4} alt='icon'></img>
          </div>
          <div className='layout-P'> Copiryght, SportSee 2020 </div>
      </div>
        
      ) 
    } 
        

export default VerticalLayout