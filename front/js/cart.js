let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

// --------     Affichage produit panier     ------------

const produitAffichage = document.getElementById("cart__items");

console.log(produitLocalStorage);

// Si panier vide

if (produitLocalStorage === null) {
  const panierVide = `
    <div>
    <h2>Il n'y a pas de produit dans votre panier... 😞 </h2>
    </div>
    `;

  produitAffichage.innerHTML = panierVide;
} else {
  const productsDisplay = async () => {
    const produitAffichage = document.getElementById("cart__items");

    //Utilisation de map pour afficher les produits et leurs attribuer le meme style
    produitAffichage.innerHTML = produitLocalStorage
      .map(
        (product) =>
          `
          <article class="cart__item" data-id="${product.idProduit}">
          <div class="cart__item__img">
            <img src="${product.imageProduit}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${product.nomDuProduit}</h2>
              <p>${product.prixProduit}€</p>
              <p>${product.couleurProduit}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantiteProduit}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
         `
      )
      .join(" "); //Enlève les virgules entres les produits
  };

  productsDisplay();
}

// ----------- Supprimer produit -------------

let deleteItem = document.querySelectorAll(".deleteItem");

for (let i = 0; i < deleteItem.length; i++) {
  deleteItem[i].addEventListener("click", (event) => {
    event.preventDefault();

    let idDelete = produitLocalStorage[i].idProduit;
    let colorDelete = produitLocalStorage[i].couleurProduit;
    console.log(idDelete);

    produitLocalStorage = produitLocalStorage.filter(
      (el) => el.idProduit !== idDelete || el.couleurProduit !== colorDelete
    );
    console.log(produitLocalStorage);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

    alert("Ce produit a été supprimer du panier");
    location.reload();
  });
}

// -------- Changer quantité ---------------

function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let j = 0; j < qttModif.length; j++) {
    qttModif[j].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = produitLocalStorage[j].quantiteProduit;
      let qttModifValue = qttModif[j].valueAsNumber;

      const resultFind = produitLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.quantiteProduit = qttModifValue;
      produitLocalStorage[j].quantiteProduit = resultFind.quantiteProduit;

      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

      // refresh rapide
      location.reload();
    });
  }
}
modifyQtt();

// -------- Prix total -------------

function getTotals() {
  // Récupération du total des quantités
  var elemsQtt = document.getElementsByClassName("itemQuantity");
  var myLength = elemsQtt.length,
    totalQtt = 0;

  for (var k = 0; k < myLength; ++k) {
    totalQtt += elemsQtt[k].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Récupération du prix total
  totalPrice = 0;

  for (var k = 0; k < myLength; ++k) {
    totalPrice +=
      elemsQtt[k].valueAsNumber * produitLocalStorage[k].prixProduit;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();

//----------Récuperation des données du formulaire----------

let form = document.querySelector(".cart__order__form");

// Ecouter la modification de l'email
form.email.addEventListener("change", function () {
  validEmail(this);
});
// Ecouter la modification du prenom
form.firstName.addEventListener("change", function () {
  validFirstName(this);
});
// Ecouter la modification du nom
form.lastName.addEventListener("change", function () {
  validName(this);
});
// Ecouter la modification de l'adresse
form.address.addEventListener("change", function () {
  validAddress(this);
});
// Ecouter la modification de la ville
form.city.addEventListener("change", function () {
  validCity(this);
});

// ------ Validation Email -------

const validEmail = function (inputEmail) {
  // creation de la regex ppour validation email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  // récupération de la balise p
  let emailMsg = document.querySelector("#emailErrorMsg");

  // test du regex
  if (emailRegExp.test(inputEmail.value)) {
    emailMsg.innerHTML = "Email Valide";
    emailMsg.setAttribute("style", "color:lightgreen");
    return true;
  } else {
    emailMsg.innerHTML = "Email Non Valide";
    emailMsg.setAttribute("style", "color:red");
    return false;
  }
};

// ------ Validation Prénom -------

const validFirstName = function (inputPrenom) {
  // creation de la regex pour validation prenom
  let prenomRegExp = new RegExp("^[A-Za-z_ /è/é/ç]{2,20}$", "g");

  // récupération de la balise p
  let prenomMsg = document.querySelector("#firstNameErrorMsg");

  // test du regex
  if (prenomRegExp.test(inputPrenom.value)) {
    prenomMsg.innerHTML = "Prenom Valide";
    prenomMsg.setAttribute("style", "color:lightgreen");
    return true;
  } else {
    prenomMsg.innerHTML = "Prenom Non Valide";
    prenomMsg.setAttribute("style", "color:red");
    return false;
  }
};

// ------ Validation Nom -------

const validName = function (inputNom) {
  // creation de la regex pour validation nom
  let nomRegExp = new RegExp("^[A-Za-z_ /è/é/ç]{2,20}$", "g");

  // récupération de la balise p
  let nomMsg = document.querySelector("#lastNameErrorMsg");

  // test du regex
  if (nomRegExp.test(inputNom.value)) {
    nomMsg.innerHTML = "Nom Valide";
    nomMsg.setAttribute("style", "color:lightgreen");
    return true;
  } else {
    nomMsg.innerHTML = "Nom Non Valide";
    nomMsg.setAttribute("style", "color:red");
    return false;
  }
};

// ------ Validation Ville -------

const validCity = function (inputCity) {
  // creation de la regex pour validation de la ville
  let cityRegExp = new RegExp("^[A-Za-z_ /è/é/ç]{2,20}$", "g");

  // récupération de la balise city
  let cityMsg = document.querySelector("#cityErrorMsg");

  // test du regex
  if (cityRegExp.test(inputCity.value)) {
    cityMsg.innerHTML = "Ville Valide";
    cityMsg.setAttribute("style", "color:lightgreen");
    return true;
  } else {
    cityMsg.innerHTML = "Ville Non Valide";
    cityMsg.setAttribute("style", "color:red");
    return false;
  }
};

// ------ Validation adresse -------

const validAddress = function (inputAddress) {
  // creation de la regex pour validation de la ville
  let addressRegExp = new RegExp("^[A-Za-z0-9_ ,]{2,50}$", "g");

  // récupération de la balise city
  let addressMsg = document.querySelector("#addressErrorMsg");

  // test du regex
  if (addressRegExp.test(inputAddress.value)) {
    addressMsg.innerHTML = "Addresse Valide";
    addressMsg.setAttribute("style", "color:lightgreen");
    return true;
  } else {
    addressMsg.innerHTML = "Adresse Non Valide";
    addressMsg.setAttribute("style", "color:red");
    return false;
  }
};

// Ecouter la soumission du formulaire

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  const products = [];

  for (let l = 0; l < produitLocalStorage.length; l++) {
    let productId = produitLocalStorage[l].idProduit;
    products.push(productId);
  }

  if (
    validEmail(form.email) &&
    validFirstName(form.firstName) &&
    validName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    produitLocalStorage.length > 0
  ) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        contact: contact,
        products: products,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.orderId);
        window.location = "confirmation.html?id=" + data.orderId;
        localStorage.removeItem("produit");
      });
  } else {
    alert("Veuillez ajoutez des produits dans votre panier pour continuer");
  }
});
