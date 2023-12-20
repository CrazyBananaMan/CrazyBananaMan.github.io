import React from 'react'
import './footer.css';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate()
  return (
    <div className='footer'>
        <h1 className='footer_item' onClick={() => navigate('/about')}>О нас</h1>
        <h1 className='footer_item' onClick={() => navigate('/about')}>Покупателям</h1>
        <h1 className='footer_item' onClick={() => navigate('/about')}>Контакты</h1>
    </div>
  )
}

export default Footer