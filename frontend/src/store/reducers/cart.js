const inititalState = {
    products:[]
}

/* eslint-disable */

const cartReducer = (state=inititalState, action) => {
    if(action.type === 'ADD_PRODUCT'){

        const newProducts = state.products.concat({
            productId: action.payload.id,
            productPrice: action.payload.price,
            productName: action.payload.name,
            productQuantity: action.payload.quantity,
            productPicture: action.payload.picture
        })

        const alreadyAdded = state.products.find(el => el.productId === newProducts[newProducts.length - 1].productId)
        if(alreadyAdded){
            return state
        }
        return {products: newProducts}
    }

    if(action.type === 'INCREMENT') {
        const productsClone = [...state.products]
        const product = productsClone.find(el => el.productId == action.id)
        product.productQuantity = parseInt(product.productQuantity) +1
        return {products: productsClone}
    }
    if(action.type === 'DECREMENT') {
        const productsClone = [...state.products]
        const product = productsClone.find(el => el.productId == action.id)
        if(product.productQuantity == 1){return}
        else {
            product.productQuantity = parseInt(product.productQuantity) -1
        }
        return {products: productsClone}
    }
    if(action.type === 'REMOVE') {
        const productsClone = [...state.products]
        const product = productsClone.find(el => el.productId == action.id)
        const arrIndex = productsClone.findIndex(el => el.productId === product.productId)
        productsClone.splice(arrIndex, 1)
        return {products: productsClone}
    }

    if(action.type === 'CLEAR'){
        return {products: []}
    }

    return state
}

export default cartReducer