import React from 'react'
import './category.css'
import {useNavigate} from 'react-router-dom'

function Category(props) {
    const {categories, big_cat, middle_cat} = props
    const navigate = useNavigate()
    console.log(categories)
  return (
    <div className='category'>
        <h2>Популярные категории</h2>
        <div className='category__body'>
            <div className='cat_top'>
            <div className='category_item_1'  onClick={() => navigate(`/category/${big_cat.id}`)}>
                <h1>{big_cat.name}</h1>
                <img src={`http://localhost:3000/public/images/${big_cat.image}`} alt={'category image'}></img>
            </div>
            <div className='category_item_2' onClick={() => navigate(`/category/${middle_cat.id}`)}>
                <h1>{middle_cat.name}</h1>
                <img src={`http://localhost:3000/public/images/${middle_cat.image}`} alt={'category image'}></img>
            </div>
            </div>
            <div className='cat_bottom'>
            {categories.map((category) =>
                <div className={`category_item_3`} id={`${Number(category.id) % 2 == 0 ? '' :'reversed'}`} key={category.name} onClick={() => navigate(`/category/${String(category.id)}`)}>
                    <h1>{category.name}</h1>
                    <img src={`http://localhost:3000/public/images/${category.image}`} alt={'category image'}></img>
                </div>
            )}
            </div>
        </div>
    </div>
  )
}

export default Category