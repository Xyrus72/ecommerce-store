const loadProduct = async (searchText, isShowAll, sortBy = null) => {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    let Products = data.products;

    const filteredProducts = Products.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (sortBy === 'price') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'category') {
        filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
    }

    displayProducts(filteredProducts, isShowAll);
}















const handleSort = (sortBy) => {
    toggleloadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadProduct(searchText, true, sortBy);
}

const displayProducts = (Products, isShowAll) => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear existing products

    const showAllContainer = document.getElementById('show-all-container');
    if (Products.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        Products = Products.slice(0, 12);
    }

    Products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList = `card bg-base-100 p-4 shadow-xl`;
        
        productCard.innerHTML = `
            <figure>
                <img src="${product.images}" alt="${product.title}" class="w-full h-48 object-cover" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${product.title}</h2>
                <p class="${product.availabilityStatus === 'In Stock' ? 'text-green-500' : 'text-red-500'}">
                    ${product.availabilityStatus === 'In Stock' ? 'Available' : 'Out of Stock'}
                </p>
                
                <div class="card-actions justify-end">
                    <button onclick="handleBuyNow('${product.id}')" class="btn btn-primary">${product.price}$</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    toggleloadingSpinner(false);
}








function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('dropdown-open');
}


document.addEventListener('click', (event) => {
    const isClickInside = document.querySelector('.dropdown').contains(event.target);
    if (!isClickInside) {
        document.querySelector('.dropdown').classList.remove('dropdown-open');
    }
});


loadProduct('');





const stockAche = (data) => {
    console.log('stockAche function called with data:', data);
    //  product data to localStorage
    localStorage.setItem('productDetails', JSON.stringify(data));
   
    window.location.href = './stockache.html';
}









const handleSearch = (isShowAll) => {
    toggleloadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadProduct(searchText,isShowAll);
}




const toggleloadingSpinner=(isLoading) =>{

    const loadingSpinner =document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner .classList.remove('hidden');
    }else{
        loadingSpinner .classList.add('hidden')
    }
}




const handleBuyNow=async(id)=>{
    //console.log('ssssssssssssssssssssssssssss',id);

    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    //console.log(data);
    showProductDetails(data)

    

    }
    

const showProductDetails= (jinish)=>{
    console.log(jinish,'paaaaaisi');
    if (jinish.availabilityStatus=== 'Low Stock'){
        console.log('kaj kore ')
        window.location.href ='./stocknai.html'

    }else{
        console.log('koiiiiiiiiiiiiiiiiiii');
        stockAche(jinish);
    }



}












    
    //aita baki kaj baki
    //next page a data show and buy shitssssss





const handleShowAll=()=>{
    handleSearch(true);




}





loadProduct('');