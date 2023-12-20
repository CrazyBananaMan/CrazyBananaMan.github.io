import React from 'react';
import './header.css'; // Создайте файл Header.css для стилей
import logo from '../../images/logo.svg'
import {useNavigate} from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()

  return (
    <div>
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo"  onClick={() => navigate('/home')}/>
      </div>
      <div className="header-right">
        <h1 className='topHeaderLink' data-text='Аккаунт' onClick={() => navigate('/login')}>аккаунт</h1>
      </div>
    </header>
    <div className='after__header'>
      <h1 className='ah_item' onClick={() => navigate('/catalog')}>Каталог</h1>
      <h1 className='ah_item' onClick={() => navigate('/cart')}>Корзина</h1>
    </div>
    </div>
  );
};

export default Header;