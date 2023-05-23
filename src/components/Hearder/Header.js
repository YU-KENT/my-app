import Logo from '../../assets/logo.png'
import '../../Style/Header.css'
import { Link } from "react-router-dom"

export default function Header(){
return(
    <header>
        <div className='header'>
           <div className='logo_bg'>
           <img src={Logo} alt="logo"></img> <span>SportSee</span>
           </div>
           <nav className='navbar'>
            <Link to='/'>Accueil</Link>
            <Link to='/'>profil</Link>
            <Link to='/'>Réglage</Link>
            <Link to='/'>Communauté</Link>
           </nav>
    
        </div>
    </header>
)

}