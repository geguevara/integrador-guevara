const productsData =[
    {
        id: 1,
        nombre: "Tapiz Volar",
        precio: 5790,
        categoria: "tapices",
        imagen: "./assets/img/tapiz-alas.jpg",
    },
    {
        id: 2,
        nombre: "Tapiz Aillú",
        precio: 8990,
        categoria: "tapices",
        imagen: "./assets/img/tapiz-aillu.jpg",
    },
    {
        id: 3,
        nombre: "Trieja Indigo",
        precio: 9980,
        categoria: "tapices",
        imagen: "./assets/img/tapiz-3.jpg",
    },
    {
        id: 4,
        nombre: "Lampara Nepal",
        precio: 18990,
        categoria: "lamparas",
        imagen: "./assets/img/lampara-nepal.jpg",
    },
    {
        id: 5,
        nombre: "Lampara praga",
        precio: 19880,
        categoria: "lamparas",
        imagen: "./assets/img/lampara-praga.jpg",
    },
    {
        id: 6,
        nombre: "Lampara indiana",
        precio: 22380,
        categoria: "lamparas",
        imagen: "./assets/img/lampara-indiana.jpg",
    },
    {
        id: 7,
        nombre: "Espejo Jazmín",
        precio: 8980,
        categoria: "espejos",
        imagen: "./assets/img/espejo-jazmin.jpg",
    },
    {
        id: 8,
        nombre: "Macetero Moana",
        precio: 7590,
        categoria: "maceteros",
        imagen: "./assets/img/macetero-moana.jpg",
    },
    {
        id: 9,
        nombre: "Sujetacortina Roma",
        precio: 6990,
        categoria: "otros",
        imagen: "./assets/img/sujetacortina-roma.jpg",
    },
    {
        id: 10,
        nombre: "Lampara Hawai",
        precio: 18980,
        categoria: "lamparas",
        imagen: "./assets/img/lampara-hawai.jpg",
    },
    {
        id: 11,
        nombre: "Cortina Hawai",
        precio: 27490,
        categoria: "otros",
        imagen: "./assets/img/cortina-hawai.webp",
    },
    {
        id: 12,
        nombre: "Tapiz Akasha",
        precio: 8980,
        categoria: "lamparas",
        imagen: "./assets/img/tapiz-akasha.webp", 
    },
    {
        id: 13,
        nombre: "Maceteros trio",
        precio: 16690,
        categoria: "maceteros",
        imagen: "./assets/img/macetero-trio.jpg",
    },
    {
        id: 14,
        nombre: "Camino de mesa Paris",
        precio: 12890,
        categoria: "otros",
        imagen: "./assets/img/camina-Paris.webp",
    },
    {
        id: 15,
        nombre: "Porta-Ukelele",
        precio: 8980,
        categoria: "otros",
        imagen: "./assets/img/portaUkelele.webp",
    },
    {
        id: 16,
        nombre: "Lavero Boho",
        precio: 990,
        categoria: "otros",
        imagen: "./assets/img/llavero-boho.webp",
    },
    {
        id: 17,
        nombre: "Estante Roma",
        precio: 8980,
        categoria: "otros",
        imagen: "./assets/img/estante-roma-doble.webp",
    },
    {
        id: 18,
        nombre: "Espejo Girasol",
        precio: 13700,
        categoria: "espejos",
        imagen: "./assets/img/espejo-Sol.webp",
    },
    {
        id: 19,
        nombre: "Espejo Cleopatra",
        precio: 8980,
        categoria: "espejos",
        imagen: "./assets/img/espejo-Cleopatra.jpg",
    },
];
const splitProducts = (size) => {
	let sliceProductsList = [];
	for (let i = 0; i < productsData.length; i += size) {
		sliceProductsList.push(productsData.slice(i, i + size));
	}
	return sliceProductsList;
};
/* console.log(splitProducts(6)); */

const appState = {
	dividedProducts: splitProducts(6),
	nextProductsIndex: 1,
	productsLimit: splitProducts(6).length,
    activeFilter: null,
};
