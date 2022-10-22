let productData = [];

// Récupération des donnée avec la méthode fetch et async
const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (productData = data));

  console.log(productData);
};

// Fonction pour afficher les produits dynamiquement sur la page d'acceuil
const productsDisplay = async () => {
  await fetchProduct();

  const affichageProduct = document.getElementById("items");

  //Utilisation de map pour afficher les produits et leurs attribuer le meme style
  affichageProduct.innerHTML = productData
    .map(
      (product) =>
        `
          <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, ${product.name}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
       `
    )
    .join(" "); //Enlève les virgules entres les produits
};

productsDisplay();
