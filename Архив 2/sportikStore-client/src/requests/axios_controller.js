import axios from 'axios'

export const getAllProducts = async () => {
    return await axios.get('http://127.0.0.1:3000/products/').then((response) => {
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log(error)
    })

}

export const getProductById = async (id) => {
    return await axios.get(`http://127.0.0.1:3000/products/${id}`).then((response) => {
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log(error)
    })

}


export const getAllCategories = async () => {
    return await axios.get('http://127.0.0.1:3000/categories').then((response) => {
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log(error)
    })

}

export const getCategoryById = async (id) => {
    return await axios.get(`http://127.0.0.1:3000/categories/${id}`).then((response) => {
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log(error)
    })
}

export const getUser = async (id) => {
    return await axios.get(`http://127.0.0.1:3000/users/${id}`).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    })
}

export const addProductBasket = async (productId, basketId) => {
    return await axios.post(`http://127.0.0.1:3000/basket/${basketId}/add-product/${productId}`).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    })
}

export const removeProductBasket = async (productId, basketId) => {
    return await axios.delete(`http://127.0.0.1:3000/basket/${basketId}/remove-product/${productId}`).then((response) => {
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log(error)
    })
}

export const getBasket = async (id) => {
    return await axios.get(`http://127.0.0.1:3000/basket/${id}`).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    })
}

export const register = async (email, password) => {
    return await axios.post(`http://127.0.0.1:3000/auth/register/`, {
        email: email,
        password: password
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    })
}

export const login = async (email, password) => {
    return await axios.post(`http://127.0.0.1:3000/auth/login/`, {
        email: email,
        password: password
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    })
}

