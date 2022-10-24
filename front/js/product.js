///////////////////       Récupération des donnés du produit sélectionner     //////////////////////

// Récupération de l'id dans l'url
const urlId = window.location.search;

// Retire le point d'interogation
const idRecup = new URLSearchParams(urlId);
const id = idRecup.get("id");

// Récupération de l'objet par l'Id
let productData = [];

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (productData = data));
};

/////////////////////////                  Affichage Produit               ///////////////////////////////

// recupération des emplpacement dans le html
const displayProductImage = document.querySelector(".item__img");
const displayProductName = document.getElementById("title");
const displayProductPrice = document.getElementById("price");
const displayProductDescription = document.getElementById("description");
const displayProductColors = document.getElementById("colors");
const displayPoductTitle = document.querySelector("title");

// fonction qui affiche les informations du produit
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
};
productDisplay();

////////////////////////         Gestion du panier           //////////////////

const btnPanier = document.querySelector("#addToCart");

// fonction au click qui récupère les valeurs sélectionner par l'utilisateur pour l'envoyer a la page panier
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

  // pop up de confirmation
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

  // vérification que l'utilisateur a bien sélectionner une couleur et une quantité
  if (optionProduit.couleurProduit == "") {
    alert("Veuillez choisir une couleur");
  } else if (optionProduit.quantiteProduit == 0) {
    alert("Veuillez choisir une quantité");
  } else if (produitLocalStorage) {
    // Si le panier a deja des produit
    const resultFind = produitLocalStorage.find(
      (el) => el.idProduit === id && el.couleurProduit === choixCouleurs
    );
    if (resultFind) {
      //Si le produit commandé est déjà dans le panier alors on incrémente la quantité dans le localstorage
      let newQuantity =
        parseInt(resultFind.quantiteProduit) + parseInt(choixQuantite);
      resultFind.quantiteProduit = newQuantity;
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      popupConfirmation();
    } else {
      // sinon on ajoute le produit dans le localstorage
      produitLocalStorage.push(optionProduit);
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      popupConfirmation();
    }
  } else {
    //Si le panier est vide
    produitLocalStorage = [];
    produitLocalStorage.push(optionProduit);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    popupConfirmation();
  }
});
