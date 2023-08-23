const addListeners = () => {
    const addToCartButtons = document.querySelectorAll('.addtocartbtn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

const addToCart = async (event) => {
    const productId = event.target.dataset.id;
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
        const createCartFetch = await fetch('/api/carts', {
          method: 'POST'
        });

        const result = await createCartFetch.json();
        if (result.status === 1) {
            cartId = result.cartId;
            localStorage.setItem('cartId', cartId);
          } else {
            console.error('Fail to create a new cart');
          };
    }

    const addProductFetch = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await addProductFetch.json();
    if (result.status === 1) {
        alert(`Product added successfully`);
    } else {
        alert('Error to add in cart');
    }
}

addListeners();