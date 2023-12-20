import React, { useEffect, useState } from 'react'
import './cart.css'
import { getBasket, removeProductBasket } from '../requests/axios_controller'

function Cart() {

  const [products, setProducts] = useState([])
  const [isBasket, setIsBasket] = useState(false)
  const [price, setPrice] = useState(0)
  const [reload, setReload] = useState(false)

  const getBasketProducts = async () => {
    const data = await getBasket(2)
    console.log(data)
    setProducts(data.products)
    setIsBasket(true)
  }

  const reloadPage = async (id) => {
    await removeProductBasket(id, 2)
    setReload(true)
  }

  useEffect(() => {
    getBasketProducts() 
    if(reload) {
      setReload(false)
    }


  }, [isBasket, reload])

  useEffect(() => {
    if (products.length > 0) {
      const total = products.reduce((acc, product) => acc + product.price, 0);
      setPrice(total);
    } else {
      setPrice(0);
    }
  }, [products]);


  return (
    <div className='cart'>
      <div className='cart_top'>
        <h1>Корзина</h1>
        {isBasket ?  <>
        <h1>{price} рублей</h1>
        <h1>Оплатить</h1>
        </>: ''}

      </div>
      <div className='cart_bottom'>
        {isBasket && products.length > 0 ? <>
        {products.map((product) =>
        <div className='cart_item'>
        <img alt='image' src={`http://127.0.0.1:3000/public/images/${product.image}`}></img>
        <h1 className='delete' onClick={() => reloadPage(product.id)}>Удалить</h1>
        <div className='cart_item_text'>
          <h1>{product.name}</h1>

          <h1>{product.price} рублей</h1>
        </div>
      </div>
        )}
        </> : <h1>Похоже в корзине ничего нет</h1>}

      </div>
    </div>
  )
}

export default Cart