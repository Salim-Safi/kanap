// Récupération de l'id dans l'url
const urlOrderId = window.location.search;

// Retire le point d'interogation
const orderIdRecup = new URLSearchParams(urlOrderId);

const orderid = orderIdRecup.get("id");

const displayNumeroCommande = document.getElementById("orderId");

displayNumeroCommande.innerText = orderid;
