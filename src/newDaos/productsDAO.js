/* import { error } from 'winston'; */
import productModel from '../dao/models/product.model.js'

export default class ProductsDao{

  constructor(){
    this.productsModel = productModel
  }
  
  async getAllProducts(limit, page, sort, query){
    try {
      const products = await this.productsModel.paginate(
        {query},
        {
          limit: limit || 10,
          page: page || 1,
          sort: sort === 'incr' ? { price: 1 } : sort === 'decr' ? { price: -1 } : undefined
        }
      )
      return products;
    } catch (error) {
      Error('Fail to get collection data')
    }
  }

  async getProducts(){
    const prods = await this.productsModel.find();
    if(!prods) return 'Error to get products';
    return prods
  }

  async getProdById(id){
    try {
      const foundProd = this.productsModel.findOne({ _id: id });
      if (!foundProd) {
        return Error('The item does not exist')
    }
      return foundProd

    } catch (error) {
      Error('Fail to get product')
    }
  }

  async createProd(prodData){
    try {
      const newProduct = await this.productsModel.create(prodData);
      return newProduct

    } catch (error) {
      Error('Fail to create product', error.message)
    }
  }

  async updateProduct(pid, obj) {

    try {
        const changedProd = await this.productsModel.updateOne({_id: pid}, obj)
        return changedProd;
    } catch (error) {
        throw new Error(error.message)
    }
  }

  async deleteProduct(id){
    try {
      const prodDeleted = this.productsModel.deleteOne({ _id: id})
    } catch (error) {
      Error('Error to delete product from db')
    }
  }

};
