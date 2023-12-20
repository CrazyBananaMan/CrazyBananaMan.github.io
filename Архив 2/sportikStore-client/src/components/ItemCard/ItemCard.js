import React from 'react'
import './item_card.css'
import { useNavigate } from 'react-router-dom'

function ItemCard({image, price, name, id}) {

  const navigate = useNavigate()

  return (
    <div className='item__card' onClick={() => navigate(`/item/${id}`)}>
        <img src={`http://localhost:3000/public/images/${image}`} alt={'item image'} className='ic__image'></img>
        <h3 className='ic__price'>{`${price} рублей`}</h3>
        <h3 className='ic__name'>{name}</h3>
    </div>
  )
}

export default ItemCard