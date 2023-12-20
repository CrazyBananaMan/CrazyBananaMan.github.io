import React, {useState, useEffect} from 'react'
import { getCategoryById } from '../requests/axios_controller';
import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard/ItemCard';

function CategoryItems() {

  const [category, setCategory] = useState([]);
  const [isCats, setIsCats] = useState(false)

  const {id} = useParams()
  console.log(id)
  const getCats = async () => {
    const data = await getCategoryById(id);
    console.log(data)
    setCategory(data);
    setIsCats(true)
    console.log(category)
};

useEffect(() => {
  getCats()
}, [isCats]);

  return (
    <div className='home'>
      <div className='sales_hit'>
        <h2>{category.name}</h2>
        <div className='sales_hit_body'>
        {isCats ? category.products.map((item) =>
          <ItemCard key={item.id} name={`${item.name}`} price={`${item.price} рублей`} image={item.image} id={item.id}></ItemCard>
          ): ''}

        </div>
      </div>
    </div>
  )
}

export default CategoryItems