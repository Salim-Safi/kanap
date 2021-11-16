///////////////////       Récupération des donnés du produit sélectionner     //////////////////////

// Récupération de l'id dans l'url
const urlId = window.location.search;
// console.log(urlId);

// Retire le point d'interogation
const idRecup = new URLSearchParams(urlId);
const id = idRecup.get("id");
console.log(id);

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
};
productDisplay();

////////////////////////         Gestion du panier           //////////////////

const btnPanier = document.querySelector("#addToCart");

btnPanier.addEventListener("click", (e) => {
  e.preventDefault();

  const choixCouleurs = document.getElementById("colors").value;
  // const choixForm = idForm.value;

  const choixQuantite = document.getElementById("quantity").value;

  let optionProduit = {
    idProduit: id,
    quantiteProduit: choixQuantite,
    couleurProduit: choixCouleurs,
  };

  console.log(optionProduit);
});

//        -----      Local Storage        -----          //
