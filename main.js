const cardContainer = document.querySelector(".card-container"); 
const btnMas = document.querySelector(".btn-mas"); 
const barsBtnMenu = document.querySelector("#menu-label"); 
const barsMenu = document.querySelector(".navbar-ul"); 
const barsCart = document.querySelector("#cart-label"); 
const cartMenu= document.querySelector(".cart");
const cartContainer = document.querySelector(".cart-container");
const totalCart = document.querySelector(".total");
const buyBtn= document.querySelector(".btn-buy");
const removeBtn= document.querySelector(".btn-delete");
const categoriesContainer= document.querySelector(".categories");
const categoryList= document.querySelectorAll(".category");
const overlay = document.querySelector(".overlay")
const viewModal = document.querySelector(".add-modal")
const slider= document.querySelector(".slider")
const slides= document.querySelector(".slides")
const prevBtn= document.querySelector(".prev")
const nextBtn= document.querySelector(".next")


let cart = JSON.parse(localStorage.getItem("cart")) || []

const saveLocalStorage = () =>{
	localStorage.setItem("cart", JSON.stringify(cart))
}
//productos
const createCardProduct =(product) =>{
	const {id,nombre, precio, imagen} = product;
	return`
		<div class="card">
            <img src=${imagen} alt=${nombre} >
			<p>${nombre}</p>
            <span>$${precio}</span>
            <button class= "btn-add"
			data-id="${id}"
			data-imagen="${imagen}"
			data-precio="${precio}"
			data-nombre="${nombre}">comprar</button>
         </div>
	`;
};

const renderMapProduct = (index=0) =>{
	const productRendering = appState.dividedProducts[index];
	cardContainer.innerHTML += productRendering
		.map(createCardProduct)
		.join("");
}

const renderFilterProduct= category =>{
	const productList= productsData.filter(product => product.category===category)
	cardContainer.innerHTML = productList.map(createCardProduct).join('')
}

const renderProduct = (index=0, category = null ) =>{
		if(!category){
			renderMapProduct(index)
		}else{
			renderFilterProduct(category)
		}
}	

const lastIndexProducts =() =>{
	return appState.nextProductsIndex === appState.productsLimit
	
}

const showMoreProducts = () =>{
	renderProduct(appState.nextProductsIndex);
	appState.nextProductsIndex++;
	if(lastIndexProducts()){
		btnMas.classList.add('hidden')
	}
}

const toggleMenu =() =>{
	barsMenu.classList.toggle('open-menu');
	if (cartMenu.classList.contains('open-cart')) {
		cartMenu.classList.remove("open-cart");
		return;
	}
    overlay.classList.toggle('toggle-overlay')
};

const toggleCart =() =>{
	cartMenu.classList.toggle('open-cart');
	if(barsMenu.classList.contains('open-menu')){
		barsMenu.classList.remove('open-menu');
		return;
	}
	overlay.classList.toggle('toggle-overlay')
}


//filter

const stateBtnActive=activeCategory=>{
	const categories= [...categoryList];
	categories.forEach(categoryList =>{
		if(categoryList.dataset.category!==activeCategory){
			categoryList.classList.remove('active');
		}else{
			categoryList.classList.add('active')
		}
	})
	
}

const stateShowMore =(activeCategory) =>{
	if(!activeCategory){
		btnMas.classList.remove('hidden')
	}else{
		btnMas.classList.add('hidden')
	}
}
const changeFilter = activeCategory =>{
	stateBtnActive(activeCategory);
	stateShowMore(activeCategory);
}
const applyCategory=(e) =>{
	if(!e.target.classList.contains('category')) return; 
	const selectedCategory = e.target.dataset.category;
	if(!selectedCategory){
		cardContainer.innerHTML='';
		renderProduct()
	}else{
		renderProduct(0, selectedCategory);
		appState.nextProductsIndex=1;
	}
	changeFilter(selectedCategory);
}
//funciones del overlay

const closeClick = (e) => {
	if (!e.target.classList.contains("navbar-li")) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	overlay.classList.remove("toggle-overlay");
};
const closeOverlay =()=>{
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("toggle-overlay");
}
const closeScoll = () =>{
	if (
		!barsMenu.classList.contains("open-menu") &&
		!cartMenu.classList.contains("open-cart")
	)return;
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("toggle-overlay");
}
//slider

const slideWidth= slides.clientWidth;
//console.log(slideWidth)

let slideIndex= 0;
const moveSlide =()=>{
    slides.style.transform = `translateX(${-slideWidth * slideIndex}px)`;
};

const nextSlide =() =>{
    if(slideIndex=== slides.children.length -1){
        slideIndex=0;
    }else{
        slideIndex++;
    }
    moveSlide()
}

const prevSlide= ()=>{
 if(slideIndex===0){
    slideIndex= slides.children.length -1
 }else{
    slideIndex--
 }
 moveSlide();
}
setInterval(function(){
    nextSlide();
}, 4200);
//carrito

const renderCartProduct =(producto) =>{
	const {nombre, imagen, precio, id, cantidad} =producto;
	return `
		<div class="cart-product">
			<div class="product-info">
				<h3 class="product-title">${nombre}</h3>
				<span class="product-price">$${precio}</span>
			</div>
		<div class="product-handler">
			<span class="quantity-handler down" data-id="${id}">-</span>
			<span class="product-quantity">${cantidad}</span>
			<span class="quantity-handler up" data-id="${id}">+</span>
		</div>
		<img
			src=${imagen}
			alt="${nombre}"
		/>
		</div>
	`;

}
const renderCart =() =>{
	if (!cart.length){
		cartContainer.innerHTML= `<p>No hay productos seleccionados.<p>`
		return;
	}
	cartContainer.innerHTML= cart.map(renderCartProduct).join('');
}

const calculatorTotal =()=>{
	return cart.reduce((acc, currentValue)=>{
		return acc + Number(currentValue.precio)*Number(currentValue.cantidad)
	}, 0);
}

const changeTotal =() =>{
	totalCart.innerHTML= `$${calculatorTotal()}`
}
const isProductCart = (itemId) => {
	return cart.find((p) => {
		return p.id === itemId;
	});
};
const createCartProduct =(product) =>{
	cart =[... cart, {...product, cantidad:1}];
}
const showModal =(message)=>{
	viewModal.classList.add('active-modal');
	viewModal.textContent= message;
	setTimeout(()=>{
		viewModal.classList.remove('active-modal');
	}, 1000)
}
const addQuantityProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, cantidad: cartProduct.cantidad + 1 }
			: cartProduct;
	});
};

const stateCart =() =>{
	saveLocalStorage();
	renderCart();
	changeTotal();
	blockedBtn(buyBtn);
	blockedBtn(removeBtn);
} 
const blockedBtn =(button) =>{
	if(!cart.length){
		button.classList.add('off-btn')
		return;
	}
	button.classList.remove('off-btn')
}
const addProduct =(e) =>{
	if(!e.target.classList.contains('btn-add')) return;
	const {id, nombre, precio, imagen}= e.target.dataset;
	const product = {id, nombre, precio, imagen};
	if(isProductCart(product.id)){
		addQuantityProduct(product);
		showModal('Se agrego otro item al carrito')
	}else{
		createCartProduct(product);
		showModal('El producto se ha agregado al carrito.')
	}
    stateCart();
}
const completeBuy =()=>{
	alertCartbtn(
	"¿Desea finalizar su compra?",
	"Gracias por confiar en India Deco!"
	)
}
const deleteCart =() =>{
	alertCartbtn(
		"¿Desea eliminar todos los productos?",
		"Productos eliminados de su carrito" 
	)
}
const resetCart =()=>{
	cart =[];
	stateCart();
}
const alertCartbtn =(question, answer) =>{
	if(!cart.length) return;
	if(window.confirm(question)){
		resetCart();
		alert(answer);
	}
}
const removeProdCart = (prodExistente) =>{
	cart= cart.filter(product => product.id !==prodExistente.id);
	stateCart();
}
const minimumSustractProd =(isProduct) =>{
	cart =cart.map((product)=>{
		return product.id === isProduct.id
		? {...product, cantidad:Number(product.cantidad) -1}
		:product
	});
}
		
const handleSubtractProd =(id) =>{
	const isProduct = cart.find((product) => product.id === id);
	if(isProduct.cantidad===1){ 
		if(window.confirm("¿Desea eliminar todos los productos?")) {
			removeProdCart(isProduct);
		}
		return;
	}
	minimumSustractProd(isProduct);

}
const handleAddProd =(id) =>{
	const isProduct = cart.find(product => product.id ===id);
	addQuantityProduct(isProduct)
}
const handleCounter =(e) =>{
	if(e.target.classList.contains('down')){
		handleSubtractProd(e.target.dataset.id);
	}else if(e.target.classList.contains('up')){
		handleAddProd(e.target.dataset.id)
	}
	stateCart()
}
const init = () =>{
    renderProduct();
	btnMas.addEventListener("click", showMoreProducts);
	barsBtnMenu.addEventListener("click", toggleMenu);
	barsCart.addEventListener("click", toggleCart);
	barsMenu.addEventListener("click", closeClick);
	overlay.addEventListener("click", closeOverlay);
	window.addEventListener('scroll', closeScoll);
	document.addEventListener('DOMContentLoaded', renderCart);
	document.addEventListener('DOMContentLoaded', changeTotal);
	cardContainer.addEventListener('click',addProduct);
	categoriesContainer.addEventListener("click", applyCategory);
	nextBtn.addEventListener("click", nextSlide);
	prevBtn.addEventListener("click",prevSlide);
	buyBtn.addEventListener('click', completeBuy);
	removeBtn.addEventListener('click',deleteCart)
	cartContainer.addEventListener('click', handleCounter)
	blockedBtn(buyBtn);
	blockedBtn(removeBtn);
}
init()