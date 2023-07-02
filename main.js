const cardContainer = document.querySelector(".card-container"); 
const btnMas = document.querySelector(".btn-mas"); 
const barsBtnMenu = document.querySelector("#menu-label"); 
const barsMenu = document.querySelector(".navbar-ul"); 
const barsCart = document.querySelector("#cart-label"); 
const cartMenu= document.querySelector(".cart");
const categoriesContainer= document.querySelector(".categories");
const categoryList= document.querySelectorAll(".category");
//slider
const slider= document.querySelector(".slider")
const slides= document.querySelector(".slides")
const prevBtn= document.querySelector(".prev")
const nextBtn= document.querySelector(".next")


let cart = JSON.parse(localStorage.getItem("cart"))|| []

const saveLocalStorage = cartList =>{
	localStorage.setItem("cart", JSON.stringify(cartList))
}
//productos
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
	/* overlay.classList.toggle("show-overlay"); */
};

const toggleCart =() =>{
	cartMenu.classList.toggle('open-cart');
	if(barsMenu.classList.contains('open-menu')){
		barsMenu.classList.remove('open-menu');
		return;
	}
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