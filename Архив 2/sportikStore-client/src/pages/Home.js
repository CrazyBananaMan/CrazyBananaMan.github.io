import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard/ItemCard'
import './home.css'
import Category from '../components/Category/Category'
import { getAllCategories, getAllProducts } from '../requests/axios_controller'

function Home() {

  const [categories, setCategories] = useState([]);
  const [isCats, setIsCats] = useState(false)
  const [products, setProducts] = useState({})
  const [isProd, setIsProd] = useState([])

  const getCats = async () => {
      const data = await getAllCategories();
      console.log(data)
      setCategories(data);
      setIsCats(true)
      console.log(categories)
  };

  const getProducts = async () => {
    const data = await getAllProducts();
    setProducts(data.products)
    setIsProd(true)
  }

  useEffect(() => {
    getCats();
    getProducts();
  }, [isCats, isProd]);
  return (
    <div className='home'>
      <div className='sales_hit'>
        <h2>Хиты продаж</h2>
        <div className='sales_hit_body'>  
        {isProd && products.length > 0  ? products.slice(3, 6).map((item) =>
          <ItemCard key={item.id} name={`${item.name}`} price={item.price} image={item.image} id={item.id}></ItemCard>
          ) : ''}
        </div>
      </div>
      {isCats ? <Category categories={categories.slice(2)} big_cat={categories[0]} middle_cat={categories[1]}/> : <></>}
      <div className='sales_hit'>
        <h2>Популярные товары со скидками</h2>
        <div className='sales_hit_body'>
        {isProd && products.length > 0 ? products.slice(6, 10).map((item) =>
          <ItemCard key={item.id} name={`${item.name}`} price={item.price} image={item.image} id={item.id}></ItemCard>
          ) : ''}
        </div>
      </div>
    </div>
  )
}

export default Home