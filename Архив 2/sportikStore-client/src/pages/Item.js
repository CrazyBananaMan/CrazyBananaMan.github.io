import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addProductBasket, getProductById } from '../requests/axios_controller'
import './item.css'

function Item() {

  const {id} = useParams()

  const [product, setProduct] = useState({})
  const [isProduct, setIsProduct] = useState(false)

  const getProducts = async () => {
    const data = await getProductById(id)
    console.log(data)
    setProduct(data.product)
    setIsProduct(true)
  }

  const addProduct = async () => {
    addProductBasket(id, 2)
    alert('Добавлено в корзину')
  }

  useEffect(() => {
    getProducts()
  }, [isProduct])

  return (
    <div className='item'>
      {isProduct ? <>
        <div className='item__left'>
        <img src={`http://127.0.0.1:3000/public/images/${product.image}`}></img>
        <h2>Описание</h2>
        <p>{product.description}</p>
      </div>
      <div className='item__right'>
        <h1>{product.name}</h1>
        <h3>На складе - {product.remainingQuantity} шт</h3>
        <h1>{product.price} рублей</h1>
        <button onClick={() => addProduct(id, 2)}>Купить</button>
      </div>
      </> : ''}

    </div>
  )
}

export default Item