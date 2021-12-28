///////////////////       Récupération des donnés du produit sélectionner     //////////////////////

// Récupération de l'id dans l'url
const urlId = window.location.search;
// console.log(urlId);

// Retire le point d'interogation
const idRecup = new URLSearchParams(urlId);
const id = idRecup.get("id");
// console.log(id);

// Récupération de l'objet par l'Id
let productData = [];

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (productData = data));
};

/////////////////////////                  Affichage Produit               ///////////////////////////////

const displayProductImage = document.querySelector(".item__img");
const displayProductName = document.getElementById("title");
const displayProductPrice = document.getElementById("price");
const displayProductDescription = document.getElementById("description");
const displayProductColors = document.getElementById("colors");
const displayPoductTitle = document.querySelector("title");

const productDisplay = async () => {
  await fetchProduct();

  const textProductImage = `<img src="${productData.imageUrl}" alt="Photographie d'un canapé">`;
  const textProductName = productData.name;
  const textProductPrice = productData.price;
  const textProductDescription = productData.description;
  const textProductTitle = productData.name;

  let option;

  for (let i of productData.colors) {
    option = document.createElement("option");
    option.text = i;
    option.value = i;
    displayProductColors.appendChild(option);
  }

  displayProductImage.innerHTML = textProductImage;
  displayProductName.innerHTML = textProductName;
  displayProductPrice.innerHTML = textProductPrice;
  displayProductDescription.innerHTML = textProductDescription;
  displayPoductTitle.innerHTML = textProductTitle;
  // console.log(textProductName);
};
productDisplay();

////////////////////////         Gestion du panier           //////////////////

const btnPanier = document.querySelector("#addToCart");

btnPanier.addEventListener("click", (e) => {
  e.preventDefault();

  const choixCouleurs = document.getElementById("colors").value;

  const choixQuantite = document.getElementById("quantity").value;

  const productImage = productData.imageUrl;
  const textProductName = productData.name;
  const textProductPrice = productData.price;
  const textProductDescription = productData.description;

  let optionProduit = {
    idProduit: id,
    nomDuProduit: textProductName,
    quantiteProduit: choixQuantite,
    couleurProduit: choixCouleurs,
    imageProduit: productImage,
    descriptionProduit: textProductDescription,
    prixProduit: textProductPrice,
  };

  //        -----      Local Storage        -----          //

  let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

  // fonction ajout produit localStorage
  const ajoutProduitLocalStorage = () => {
    produitLocalStorage.push(optionProduit);
    // transforme en JSON
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
  };

  const popupConfirmation = () => {
    if (
      window.confirm(`Votre produit à bien était ajouté au panier.
Consulter le panier OK ou revenir a l'acceuil ANNULER`)
    ) {
      window.location.href = "cart.html";
    } else {
      window.location.href = "index.html";
    }
  };

  if (optionProduit.couleurProduit == "") {
    alert("Veuillez choisir une couleur");
  } else if (optionProduit.quantiteProduit == 0) {
    alert("Veuillez choisir une quantité");
  } else if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
      (el) => el.idProduit === id && el.couleurProduit === choixCouleurs
    );
    console.log(resultFind);
    //Si le produit commandé est déjà dans le panier
    if (resultFind) {
      let newQuantity =
        parseInt(resultFind.quantiteProduit) + parseInt(choixQuantite);
      resultFind.quantiteProduit = newQuantity;
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      popupConfirmation();
      //Si le produit commandé n'est pas dans le panier
    } else {
      produitLocalStorage.push(optionProduit);
      console.table(produitLocalStorage);
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    }
    //Si le panier est vide
  } else {
    produitLocalStorage = [];
    produitLocalStorage.push(optionProduit);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    popupConfirmation();
  }
});
