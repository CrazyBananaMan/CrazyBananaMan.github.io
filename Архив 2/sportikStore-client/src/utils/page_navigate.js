import About from '../pages/About'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import CategoryItems from '../pages/CategoryItems'
import Home from '../pages/Home'
import Item from '../pages/Item'
import Login from '../pages/Login'

export const page_navigate = [
    {
        path: '/Home',
        component: <Home/>
    },
    {
        path: '/Cart',
        component: <Cart/>
    },
    {
        path: '/Catalog',
        component: <Catalog/>
    },
    {
        path: '/Login',
        component: <Login/>
    },
    {
        path: '/Item/:id',
        component: <Item/>
    },
    {
        path: '/about',
        component: <About/>
    },
    {
        path: '/category/:id',
        component: <CategoryItems/>
    },
]