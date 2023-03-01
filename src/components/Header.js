import headerLogo from '../images/logo/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="МЕСТО" />
    </header>
  );
}

export default Header;