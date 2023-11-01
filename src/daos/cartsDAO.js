import cartModel from '../models/cart.model.js';

export default class CartsDao{

    constructor(){
        this.cartsModel = cartModel;
    }

    async getAllCarts(){

        try {
            const allCarts = await this.cartsModel.find();
            return allCarts; 
        } catch (error) {
            Error('Cannot get carts data')
        }
    }

    async getCartId(id) {
      try {
        const cartId = await this.cartsModel.findById(id);
        if (!cartId) {
          return "Cart not found";
        }
        return cartId;
      } catch (error) {
        throw new Error (error.message)
      }
    };

    async getProdsInCart() {
      try {
        const carts = await this.cartsModel.find().populate("products.productId");
        return carts;
      } catch (error) {
          throw new Error("Could not get carts" + error);
      }
    };

    async createCart(){

        try {
            const newCart = this.cartsModel.create({ products: [] });
            return newCart

        } catch (error) {
            Error('Fail to create a new cart')
        }
    };

    async addProdToCart(cartID, prodID) {
        try {
          const cart = await this.cartsModel.findById(cartID);
          if (!cart) {
            Error("Cart not found");
          }
    
          const relatedProdIndex = cart.products.findIndex((prod) => prod.productId === prodID);
          if (relatedProdIndex !== -1) {
            cart.products[relatedProdIndex].quantity++;
          } else {
            const newProduct = { productId: prodID, quantity: 1 };
            cart.products.push(newProduct);
          }
    
          await cart.save();
          return cart;
        } catch (error) {
          Error("Fail to add product in cart: " + error);
        }
      }

    async updateCart(cartId, updatedProds) {
        try {
          const cart = await this.cartsModel.findById(cartId);
      
          if (!cart) {
            throw new Error("Cart not found");
          }
      
          cart.products = updatedProds;
      
          await cart.save();
          return cart;
        } catch (error) {
          throw new Error("Could not update cart: " + error.message);
        }
    }
      
    async updQuantity(cId, prodId, alteredQuantity) {
        const cart = await this.cartsModel.findById(cId);
      
        if (!cart) {
          throw new Error("Cart not found");
        }
      
        const product = cart.products.find((prod) => prod.id === prodId);
      
        if (product) {
          product.quantity = alteredQuantity;
          await cart.save();
        } else {
          throw new Error("Product not found");
        }
    }

    async removeProdInCart(cId, prodId) { 
        try {
          const cart = await this.cartsModel.findById(cId);
          console.log(cart)
      
          if (!cart) {
            Error('Cart not found');
          };
        
          const prodIndex = cart.products.findIndex(prod => prod.productId === prodId);
          if (prodIndex === -1) {
            Error('Product not found');
          }
        
          cart.products.splice(prodIndex, 1)
          await cart.save()
        
          return cart
        } catch (error) {
          throw new Error("Could not delete")
        }
    
    }

    async cleanCart(cId) {
        try {
          const cart = await this.cartsModel.findById({_id: cId})
    
          if(cart) {
            cart.products = []
            await cart.save()
            return cart
          }else {
            throw new Error("Cart not found")
          }
        } catch (error) {
          throw new Error("Could not empty cart")
        }
    }

    async deleteCart(id){
        try {
            const removedCart = this.cartsModel.deleteOne({ _id: id})
            return removedCart
          } catch (error) {
            Error('Error to remove cart from db')
          }
    };
};
