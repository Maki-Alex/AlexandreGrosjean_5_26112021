// variable pour localStorage
let storage = JSON.parse(localStorage.getItem("cart"));
let items = [];
items = storage;



// function to save in local

const saveStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// function to get in local

const getStorage = () => {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// function to add in local

const addStorage = (product) => {
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity++
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    saveStorage(cart);
}


// function to remove in local

const removeStorage = (product) => {
    let cart = getStorage();
    cart = cart.filter(p => p.id != product.id);
    saveStorage(cart);
}

// vider localStorage de l'image
localStorage.removeItem("img")

// function for cart

if (storage != null) {

    for (const element of items) {

        // function for card cart     


        const kanapCard = () => {

            let cartCard = document.querySelector('#cart__items');

            let article = document.createElement("article");
            cartCard.appendChild(article);
            article.classList.add("cart__item");
            article.dataset.id = element.id;
            article.dataset.color = element.color;

            let divItemImg = document.createElement("div");
            article.appendChild(divItemImg);
            divItemImg.classList.add("cart__item__img")

            let imgOfKanap = document.createElement("img");
            divItemImg.appendChild(imgOfKanap);
            imgOfKanap.src = element.imgKanap;
            imgOfKanap.alt = "Photographie d'un canapé";

            let divItemContent = document.createElement("div");
            article.appendChild(divItemContent);
            divItemContent.classList.add("cart__item__content");

            let divItemContentDescription = document.createElement("div");
            divItemContent.appendChild(divItemContentDescription);
            divItemContentDescription.classList.add("cart__item__content__description")

            let title = document.createElement("h2");
            divItemContentDescription.appendChild(title);
            title.innerText = element.title;

            let color = document.createElement("p");
            divItemContentDescription.appendChild(color);
            color.innerText = element.color;

            let qtyProduct = document.createElement("p");
            divItemContentDescription.appendChild(qtyProduct);
            qtyProduct.innerText = element.prix * element.quantity + " €";

            let divItemContentSetting = document.createElement("div");
            divItemContent.appendChild(divItemContentSetting);
            divItemContentSetting.classList.add("cart__item__content__settings")

            let divItemContentSettingQuantity = document.createElement("div");
            divItemContentSetting.appendChild(divItemContentSettingQuantity);
            divItemContentSettingQuantity.classList.add("cart__item__content__settings__quantity")

            let qty = document.createElement("p");
            divItemContentSettingQuantity.appendChild(qty);
            qty.innerText = "Qté :";

            let input = document.createElement("input");
            divItemContentSettingQuantity.appendChild(input);
            input.type = "number";
            input.name = "itemQuantity";
            input.min = 1;
            input.max = 100;
            input.value = element.quantity;
            input.classList.add("itemQuantity")
            input.dataset.id = element.id;
            input.dataset.color = element.color;

            let divItemContentSettingDelete = document.createElement("div");
            divItemContent.appendChild(divItemContentSettingDelete);
            divItemContentSettingDelete.classList.add("cart__item__content__settings__delete");

            let deleteItem = document.createElement('p');
            divItemContentSettingDelete.appendChild(deleteItem);
            deleteItem.classList.add("deleteItem");
            deleteItem.innerText = "Supprimer";
            deleteItem.dataset.id = element.id;
            deleteItem.dataset.color = element.color;


        };
        kanapCard();
    };

}

// deletion of localstorage Class

const deleteStorage = document.querySelectorAll('.deleteItem');


if (storage != null) {
    const cardID = () => {

        for (const elements of items) {
            deleteStorage.forEach(element => {
                if (element.dataset.id + element.dataset.color == elements.id + elements.color) {
                    let cart = getStorage();
                    element.onclick = () => {
                        cart = cart.filter(p => p.id + p.color != element.dataset.id + element.dataset.color);
                        saveStorage(cart);
                        window.location.reload();
                    }
                }
            })
        }
    }
    cardID()
}

const qtyValue = document.querySelectorAll("input.itemQuantity");

if (storage != null) {
    const cardQty = () => {

        for (const elements of items) {
            qtyValue.forEach(element => {
                if (element.value + element.dataset.id + element.dataset.color == elements.quantity + elements.id + elements.color) {

                    element.onclick = () => {
                        let cart = getStorage();

                        const changeQuantity = (product, quantity) => {
                            let foundProduct = cart.find(p => p.id + p.color == elements.id + elements.color);
                            if (foundProduct != undefined) {
                                if (element.value > 100) {
                                    element.value = 100;
                                    alert('veuillez choisir entre 1 et 100 articles maximum');
                                } else {
                                    foundProduct.quantity = element.value
                                    if (foundProduct.quantity <= 0) {
                                        removeStorage(foundProduct);
                                        window.location.reload();
                                    } else {
                                        saveStorage(cart);
                                        window.location.reload();
                                    }

                                }
                            }
                        }
                        changeQuantity()
                    }
                }
            })
        }


    }

    cardQty()
}
// queryselector for sum
let totalQuantity = document.querySelector('#totalQuantity');
let totalPrice = document.querySelector('#totalPrice');

// function display total price & quantity

const sumTotal = () => {

    let sumPrice = 0;
    let sumQty = 0;

    if (!storage) {

        totalPrice.innerText = sumPrice;
        totalQuantity.innerText = sumQty;
    } else {
        for (let i = 0; i < items.length; i++) {
            sumPrice = sumPrice + (items[i].prix * items[i].quantity);
            sumQty = sumQty + parseInt(items[i].quantity);
        };

        totalPrice.innerText = sumPrice;
        totalQuantity.innerText = parseInt(sumQty);
    };

};

sumTotal();

//regex & formulaire

let form = document.querySelector(".cart__order__form");

//variable for object
let prenom;
let nom;
let address;
let ville;
let email;

// prenom

const fieldValidation = function (value, htmlSelector, regex) {
    const regexName = regex;
    let errorFirstName = document.querySelector('#' + htmlSelector);

    if (regexName.test(value)) {
        errorFirstName.innerHTML = 'valide';
    } else {
        errorFirstName.innerHTML = "non valide";
    }
}

// listening modification
form.firstName.addEventListener('change', function (e) {
    validFirstName(e.target.value)
})

// validation du input
const validFirstName = function (inputFirstName) {
    fieldValidation(inputFirstName, 'firstNameErrorMsg', /^[#.0-9a-zA-Z\s,-]+$/i);
    prenom = form.firstName.value;
}

// nom

// listening modification
form.lastName.addEventListener('change', function (e) {
    validLastName(e.target.value)
})

// validation du input
const validLastName = function (inputLastName) {
    fieldValidation(inputLastName, 'lastNameErrorMsg', /^[#.0-9a-zA-Z\s,-]+$/i);
    nom = form.lastName.value;
}

// adresse

// listening modification
form.address.addEventListener('change', function (e) {
    validAddress(e.target.value)
})

// validation du input
const validAddress = function (inputAddress) {
    fieldValidation(inputAddress, 'addressErrorMsg', /^[#.0-9a-zA-Z\s,-]+$/i);
    address = form.address.value;
}

// ville

// listening modification
form.city.addEventListener('change', function (e) {
    validCity(e.target.value)
})

// validation du input
const validCity = function (inputCity) {
    fieldValidation(inputCity, 'cityErrorMsg', /^[#.0-9a-zA-Z\s,-]+$/i);
    ville = form.city.value;
}

// mail

// listening modification
form.email.addEventListener('change', function (e) {
    validEmail(e.target.value)
})

// validation du input
const validEmail = function (inputMail) {
    const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    fieldValidation(inputMail, 'emailErrorMsg', regexMail);
    email = form.email.value;
}

//action on submit
const commande = document.querySelector('#order');

const postUrl = "http://localhost:3000/api/products/order";

const confirmationUrl = "./confirmation.html?id=";


if (storage != null) {
    commande.onclick = () => {

        let products = [];

        const makeJson = () => {
            const contact = {
                firstName: prenom,
                lastName: nom,
                address: address,
                city: ville,
                email: email
            }

            for (i = 0; i < items.length; i++) {
                if (products.find((e) => e == items[i].id)) {
                    console.log("not found");
                } else {
                    products.push(items[i].id);
                }
            }


            let jsonData = { contact, products };
            return jsonData;
        }

        makeJson();
        let jsonData = makeJson();



        const getField = (field) => {
            return makeJson()["contact"][field];
        }

        if (getField('firstName', 'lastName', 'address', 'city', 'email') != null) {

            let myInit = {
                method: "POST",
                body: JSON.stringify(jsonData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            let commandFetch = () => {
                fetch(postUrl, myInit)
                    .then((response) => response.json())
                    .then((data) => {
                        localStorage.clear();
                        // localStorage.setItem("orderId", data.orderId);
                        document.location.href = `confirmation.html?id=${data.orderId}`;
                    })
                    .catch((err) => {
                        alert("Problème avec fetch : " + err.message);
                    });
            }
            commandFetch();
        }
    }

}