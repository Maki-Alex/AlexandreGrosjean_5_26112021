// lien server 3000
const host = "http://localhost:3000/api/products/";

// constante pour recuperation id dans url
const params = (new URL(document.location)).searchParams;
const id = params.get("id");

// creation constante pour function
const hostProduct = host + id;

// fetch pour tableau .json
let canapeFetch = () => {
    fetch(hostProduct)
        .then((response) => response.json())
        .then((data) => {

            // img via params & hostProduct

            let imgOfKanap = document.createElement("img");
            let img = document.querySelector(".item__img");
            img.appendChild(imgOfKanap)
            imgOfKanap.src = data.imageUrl;
            imgOfKanap.alt = data.altTxt;
            localStorage.setItem("img", data.imageUrl);


            // titre via params & hostProduct
            let title = document.querySelector("#title");
            title.innerText = data.name;

            // prix via params & hostProduct
            let price = document.querySelector("#price");
            price.innerText = data.price;

            // description via params & hostProduct
            let description = document.querySelector("#description");
            description.innerText = data.description;

            // couleur via params & hostProduct
            let couleur = document.querySelector("#colors");
            for (i = 0; i < data.colors.length; i++) {

                let couleurOfKanap = document.createElement("option");
                couleur.append(couleurOfKanap);
                couleurOfKanap.value = data.colors[i];
                couleurOfKanap.innerText = data.colors[i];

            }
        }
        )
};

canapeFetch();

// quantity limit 

let qtyLimit = document.querySelector('#quantity');

qtyLimit.addEventListener("change", function () {
    
    if (qtyLimit.value > 100) {
        qtyLimit.value = 100;
        alert('veuillez choisir entre 1 et 100 articles maximum');
    }
    
})

// local storage

let card = [];

addToCart.onclick = () => {



    //variable for qty & colors
    let qty = document.querySelector('#quantity');
    let color = document.querySelector('#colors');


    //object for cart
    const cart = {
        id: id,
        title: title.innerText,
        quantity: parseInt(qty.value),
        color: color.value,
        prix: parseFloat(price.innerText),
        imgKanap: localStorage.getItem("img")
    }

    //variable & condition for array
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (!storage) {
        card.push(cart);
        localStorage.setItem("cart", JSON.stringify(card));
    } else {
        let item = storage.filter(element => {
            return (element.id == id && element.color == color.value)
        });
        if (item.length > 0) {
            item[0].quantity += parseInt(qty.value);
            item[0].prix += parseInt(qty.value) * parseFloat(price.innerText);
            let pos = storage.findIndex((element) => (element.id == id && element.color == color.value));
            card[pos] = item[0];
            localStorage.setItem("cart", JSON.stringify(card));
        } else {
            storage.push(cart);
            localStorage.setItem("cart", JSON.stringify(storage));
        }
    };


    window.location.reload();
};