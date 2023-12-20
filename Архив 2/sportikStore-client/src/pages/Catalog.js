import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard/ItemCard'
import './home.css'
import Category from '../components/Category/Category'
import { getAllCategories } from '../requests/axios_controller'
function Catalog() {
  const [categories, setCategories] = useState([]);
  const [isCats, setIsCats] = useState(false)

  const getCats = async () => {
      const data = await getAllCategories();
      console.log(data)
      setCategories(data);
      setIsCats(true)
      console.log(categories)
  };

  useEffect(() => {
    getCats()
  }, [isCats]);

  return (
  <div className='home'>
      {isCats ? <Category categories={categories.slice(2)} big_cat={categories[0]} middle_cat={categories[1]}/> : <></>}
  </div>
  )
}

export default Catalog