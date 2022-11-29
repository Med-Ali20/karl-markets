const inititalState = {
    productId: '',
    productPrice: '',
    productName: '',
    productQuantity: '',
    productPicture: '',
    currency: 'جنيه',
    isProduct: false
}

const boughtItemReducer = (state = inititalState, action) => {
    switch(action.type) {
        
        case 'SUBMIT_ITEM' : 
            return {
                productId: action.payload.id,
                productPrice: action.payload.price,
                productName: action.payload.name,
                productQuantity: action.payload.quantity,
                productPicture: action.payload.picture,
                currency: action.payload.currency,
                isProduct: true
            }

        default : 
            return state
    }
        
}

export default boughtItemReducer