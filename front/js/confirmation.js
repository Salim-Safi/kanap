// Récupération du numero de commande dans l'url
const urlOrderId = window.location.search;

const orderIdRecup = new URLSearchParams(urlOrderId);

const orderid = orderIdRecup.get("id");

// injection du numero de commande dans le html
const displayNumeroCommande = document.getElementById("orderId");

displayNumeroCommande.innerText = orderid;
