const cardContainer = document.querySelector(".card-container"); 
const btnMas = document.querySelector(".btn-mas"); 
const barsBtnMenu = document.querySelector("#menu-label"); 
const barsMenu = document.querySelector(".navbar-ul"); 
const barsCart = document.querySelector("#cart-label"); 
const cartMenu= document.querySelector(".cart");
const categoriesContainer= document.querySelector(".categories");
const categoryElements= document.querySelectorAll(".category");
//slider
const slider= document.querySelector(".slider")
const slides= document.querySelector(".slides")
const prevBtn= document.querySelector(".prev")
const nextBtn= document.querySelector(".next")


let cart = JSON.parse(localStorage.getItem("cart"))|| []

const saveLocalStorage = cartList =>{
	localStorage.setItem("cart", JSON.stringify(cartList))
}

const createCardProduct =(product) =>{
	const {id,nombre, precio, imagen} = product;
	return`
		<div class="card">
             <img src=${imagen} alt=${nombre} >
            <span>$${precio}</span>
            <p>${nombre}</p>
            <button class= "btn-add"
			data-id="${id}"
			data-img="${imagen}"
			data-precio="${precio}"
			data-nombre="${nombre}">comprar</button>
         </div>
	`;
};

const renderMapProduct = (index=0 ) =>{
	const productRendering = appState.dividedProducts[index];
	cardContainer.innerHTML += productRendering
		.map(createCardProduct)
		.join("");
}

const renderProduct = (index=0) =>{
		renderMapProduct(index)
	
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
	/* overlay.classList.toggle("show-overlay"); */
};

const toggleCart =() =>{
	cartMenu.classList.toggle('open-cart');
	if(barsMenu.classList.contains('open-menu')){
		barsMenu.classList.remove('open-menu');
		return;
	}
}


const isInactiveBtnCategory= (element)=>{
	return (
		 element.classList.contains("category") && 
		 !element.classList.contains("active")
	)
}
const changeBntActive =(selectedCategory) =>{
	const categories= [...categoryElements];
	categories.forEach((categoryBtn)=>{
		if(categoryBtn.dataset.category !== selectedCategory){
			categoryBtn.classList.remove("active");
			return;
		}
		categoryBtn.classList.add("active");
	})
}
const changeFilterActive =(btn)=>{
	appState.activeFilter= btn.dataset.category;
	changeBntActive(appState.activeFilter);
}
const applyCategory=({target}) =>{
	if(!isInactiveBtnCategory(target)) {
		return;
	}
	changeFilterActive(target);
}

//slider

const slideWidth= slides.clientWidth;
console.log(slideWidth)

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
}, 4000);





const init = () =>{
    renderProduct();
	btnMas.addEventListener("click", showMoreProducts);
	barsBtnMenu.addEventListener("click", toggleMenu);
	barsCart.addEventListener("click", toggleCart);
	categoriesContainer.addEventListener("click", applyCategory);
	nextBtn.addEventListener("click", nextSlide);
	prevBtn.addEventListener("click",prevSlide);
}
init()