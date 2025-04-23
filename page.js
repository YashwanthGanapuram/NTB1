window.onload = function () {
    sessionStorage.clear();
};

function cartMe(name, price, imgsrc) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, imgsrc });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function checkPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    if(total > 0){
        window.location.href = "payment.html";
    }else{
        alert("Please add items to the cart before proceeding to payment.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    if (path.includes("cartMe.html")) {
        const cartContainer = document.getElementById("cartMEitem");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);


        const payment = document.getElementById("payment");
        if (payment) {
            payment.textContent = `Pay INR${total}/-`;
        }

        cart.forEach(item => {
            const coldiv = document.createElement('div');
            coldiv.classList.add('col-12', 'col-md-6', 'col-lg-3');

            const carddiv = document.createElement('div');
            carddiv.classList.add('shadow', 'menu-item-card', 'p-3', 'mb-3', 'bg-white');
            coldiv.appendChild(carddiv);

            const img = document.createElement('img');
            img.src = item.imgsrc;
            img.classList.add('menu-item-image', 'w-100');
            carddiv.appendChild(img);

            const h1 = document.createElement('h1');
            h1.textContent = item.name;
            h1.classList.add('menu-card-title', 'text-dark');
            carddiv.appendChild(h1);

            const div = document.createElement('div');
            div.classList.add('d-flex', 'flex-row', 'justify-content-between');
            carddiv.appendChild(div);

            const priceh1 = document.createElement('h1');
            priceh1.classList.add('menu-item-link');
            priceh1.textContent = `Price: INR${item.price}/-`;
            div.appendChild(priceh1);

            cartContainer.appendChild(coldiv);
        });
    }

    if (path.includes("home.html")) {
        const userDetails = JSON.parse(localStorage.getItem("PersonalDetails"));
        const cartName = document.getElementById("cartName");
        const tableId = document.getElementById("TableId");

        if (cartName) {
            cartName.textContent = userDetails ? `Welcome ${userDetails.name}` : `Welcome Guest`;
        }

        if (tableId && userDetails) {
            if (!userDetails.tableNo) {
                userDetails.tableNo = Math.floor(Math.random() * 20) + 1;
                localStorage.setItem("PersonalDetails", JSON.stringify(userDetails));
            }

            tableId.textContent = `Enjoy your delicious food `;
        }
    }

    if (path.includes("payment.html")) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
        const paymentBtn = document.getElementById("payments");
        if (paymentBtn) {
            // Get the total from the order summary, which includes the reservation fee and any discounts
            const totalElement = document.getElementById("total");
            let total = parseFloat(totalElement.textContent);
    
            // Update the payment button text to reflect the final total
            paymentBtn.innerHTML = <i class="fas fa-shopping-cart"></i> 'Pay ₹${total.toFixed(2)} And Get Order';
    
            paymentBtn.addEventListener("click", () => {
                alert("Payment successful! Your order is being prepared 🍽");
                localStorage.removeItem("cart");
                window.location.href = "home.html";
            });
        }
    }
});
