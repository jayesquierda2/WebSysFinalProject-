const inventory = [
    { id: 1, name: "Uno", price: 10, img: "🎴" },
    { id: 2, name: "Coup", price: 15, img: "🃏" },
    { id: 3, name: "Monopoly Deal", price: 12, img: "💰" }
];

let myCart = [];

function refreshPage() {
    const shelf = document.getElementById('product-grid');
    const basket = document.getElementById('cart-list');
    
    shelf.style.display = "flex";
    shelf.style.flexWrap = "wrap";
    shelf.style.gap = "25px";
    shelf.style.padding = "20px";
    shelf.style.justifyContent = "center";
    
    shelf.innerHTML = '';
    basket.innerHTML = '';

    inventory.forEach(p => {
        const added = myCart.find(i => i.id === p.id);
        const btnBg = added ? "#ccc" : "#00b894";
        const btnText = added ? "Already in Cart" : "Add to Cart";
        const btnPointer = added ? "default" : "pointer";

        shelf.innerHTML += `
            <div class="card" style="background: white; padding: 25px; border-radius: 20px; text-align: center; width: 180px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 10px;">
                <div style="font-size: 90px; margin-bottom: 20px; display: block;">${p.img}</div>
                <h4 style="margin: 10px 0; font-size: 1.2rem;">${p.name}</h4>
                <p style="color: #666; margin-bottom: 15px;">$${p.price}</p>
                <button onclick="addItem(${p.id})" ${added ? 'disabled' : ''} style="width: 100%; padding: 12px; border-radius: 8px; border: none; background: ${btnBg}; color: white; font-weight: bold; cursor: ${btnPointer};">
                    ${btnText}
                </button>
            </div>`;
    });

    if (myCart.length === 0) {
        basket.innerHTML = '<p style="padding: 20px; color: #999;">Your cart is currently empty.</p>';
    } else {
        myCart.forEach(item => {
            const subtotal = item.price * item.qty;
            basket.innerHTML += `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 15px 0; margin: 0 10px;">
                    <div style="line-height: 1.6;">
                        <strong style="font-size: 1.1rem;">${item.name}</strong><br>
                        <span style="color: #555;">$${item.price} × ${item.qty} = <strong>$${subtotal}</strong></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <button onclick="changeQty(${item.id}, -1)" style="width: 30px; height: 30px;">-</button>
                        <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.qty}</span>
                        <button onclick="changeQty(${item.id}, 1)" style="width: 30px; height: 30px;">+</button>
                        <button onclick="removeItem(${item.id})" style="color: #ff4757; background: none; border: 1px solid #ff4757; border-radius: 4px; padding: 4px 8px; margin-left: 10px;">Remove</button>
                    </div>
                </div>`;
        });
    }

    const totalItems = myCart.reduce((a, i) => a + i.qty, 0);
    const totalPrice = myCart.reduce((a, i) => a + (i.price * i.qty), 0);
    
    document.getElementById('cart-count').innerText = totalItems;
    document.getElementById('total-price').innerText = totalPrice;
}

window.addItem = (id) => {
    const product = inventory.find(p => p.id === id);
    myCart.push({ ...product, qty: 1 });
    refreshPage();
};

window.changeQty = (id, n) => {
    const item = myCart.find(x => x.id === id);
    if (item) {
        item.qty += n;
        if (item.qty <= 0) removeItem(id);
        else refreshPage();
    }
};

window.removeItem = (id) => {
    myCart = myCart.filter(i => i.id !== id);
    refreshPage();
};

window.emptyEverything = () => {
    myCart = [];
    refreshPage();
};

window.checkout = () => {
    if (myCart.length === 0) alert("Cart is empty!");
    else alert("Order Summary\nTotal Items: " + document.getElementById('cart-count').innerText + "\nTotal Price: $" + document.getElementById('total-price').innerText);
};

refreshPage();
