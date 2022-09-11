const inititalState = {
    productId: '',
    productPrice: '',
    productName: '',
    productQuantity: '',
    productPicture: '',
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
                isProduct: true
            }

        default : 
            return state
    }
        
}

export default boughtItemReducer