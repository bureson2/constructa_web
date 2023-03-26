import styles from './style.module.scss'
import logo from './constructa.png'

function Header() {
    return (
        <div id="header">
            <img src={logo} alt={"Constructa"} id="logo"/>
        </div>
    );
}

export default Header;