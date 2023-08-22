import cartsService from "../services/cartsService.js";

const cartsServ = new cartsService();

export const getCarts = async(req, res) => {
    
    try {
        const allCarts = await cartsServ.getAllCarts();
        res.status(200).send(allCarts);
    } catch (error) {
        res.status(500).send({Error: error.message})
    }
};

export const getCartById = async(req, res) => {

    try {
        const cartId = req.params.cid;
        const foundCart = await cartsServ.getCartById(cartId);

        foundCart ? res.status(200).send(foundCart) : res.status(404).send('Cart not found');

    } catch (error) {
        res.status(500).send({Error: error.message})
    };
};

export const creatingCart = async(req, res) => {
    try {
        const newCart = await cartsServ.creatingCart();

        !newCart ? res.status(400).send('Fail to create cart') : 
        res.status(200).send({ msg: 'Cart created successfully', newCart });

    } catch (error) {
        res.status(500).send({ Error: error.message });
    };
};

export const addingProdInCart = async(req, res) => {
    try {
        const cId = req.params.cid;
        const pId = req.params.pid;
        const newProdInC = await cartsServ.includeProdInC(cId, pId);

        !newProdInC ? res.status(400).send({ Error: 'Error to add in cart. Verify ID' }) :
                      res.status(200).send({ msg: 'Product added successfully', payload: newProdInC });
    } catch (error) {
        res.status(500).send({ Error: 'Server error to add product in cart', message: error.message })
    }
};

export const updateCart = async(req, res) => {
    try {
        const cartId = req.params.cid;
        const updProds = req.body.products;
        const changedCart = await cartsServ.updateCart(cartId, updProds);

        !changedCart ? res.status(400).send('Bad Request') :
                       res.status(200).send('Cart updated successfully', changedCart);
    } catch (error) {
        res.status(500).send('Server error to update cart' + error.message);
    };
};

export const updateQuantity = async(req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const { quantity } = req.body;
        const updProcess = await cartsServ.updateQuantity(cartId, prodId, quantity);

        !updProcess ? res.status(400).send('Quantity could not be updated') :
                      res.status(200).send('Quantity updated successfully');
    } catch (error) {
        res.status(500).send({ Error: 'Server error to update quantity', message: error.message });
    };
};

export const deleteProdInCart = async(req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const removingProcess = await cartsServ.removingProdInC(cartId, prodId);

        !removingProcess ? res.status(400).send('Product could not be removed') :
                           res.status(200).send('Product removed successfully');
    } catch (error) {
        res.status(500).send('Server error' + error.message)
    };
};

export const cleaningCart = async(req, res) => {
    try {
        const cartId = req.params.cid;
        const emptyCart = await cartsServ.cleaningCart(cartId);

        !emptyCart ? res.status(400).send('Cart could not be clear out') :
                     res.status(200).send('Cart cleaned successfully');
    } catch (error) {
        res.status(500).send('Server error to clean cart' + error.message);
    };
};

export const deleteCart = async(req, res) => {
    try {
        const cartId = req.params.cid;
        const removal = await cartsServ.deletingCart(cartId);

        !removal ? res.status(400).send('Cart could not be removed') :
                   res.status(200).send('Cart removed successfully');
    } catch (error) {
        res.status(500).send('Server error' + error.message);
    };
};

export const purchase = async(req, res) => {
    const cId = req.params.cid;
    try {
        const purchaseCartResult = await cartsServ.checkoutCart(cId, req.user.email);
        res.status(201).send({ status: 1, msg: 'Cart successfully purchased', purchaseCartResult: purchaseCartResult });
    } catch (error) {
        res.status(500).json({ status: 0, error: error.message });
    }
};