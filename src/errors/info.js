export const generateProdErrorInfo = (product) => {
    return `One or more properties were invalid or incomplete.
    List of required keys: 
    * title: needs to be String, received ${product.title},
    * description: needs to be String, received ${product.description},
    * price: needs to be Number, received ${product.price},
    * category: needs to be String, received ${product.category},
    * code: needs to be Number, received ${product.code},
    * stock: needs to be Number, received ${product.stock},
    * thumbnail: needs to be Array, received ${product.thumbnail}`
};

export const serverProdsErrorInfo = () => {
    return `Internal server error. Server were not functioning properly. Actions not being completed: 
    * It cannot get products
    * It cannot get products by a specified ID
    * It cannot create products
    * It cannot updated products
    * It cannot delete products`
};