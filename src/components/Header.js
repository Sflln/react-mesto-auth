import logo from '../images/logo-header.svg';

//--- Компонент шапки сайта ---
function Header() {
  return (
    <header className="header">
        <img src={logo} alt="логотип" className="header__logo"/>
    </header>
  )
}

export default Header;