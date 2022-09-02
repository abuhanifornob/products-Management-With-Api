const loadData = async() => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
}

const displayProductCategory = async() => {
    const products = await loadData();
    const productContainer = document.getElementById('product-container');

    let categoryArray = [];
    products.forEach(product => {
        if (categoryArray.indexOf(product.category) == -1) {
            categoryArray.push(product.category);
            const productCategory = document.createElement('li');
            productCategory.innerText = product.category;
            productContainer.appendChild(productCategory);
        }
    })

}


document.getElementById('searchID').addEventListener('keypress', async(event) => {

    const displayProductContainer = document.getElementById('displayProductContainer');
    displayProductContainer.innerHTML = "";

    if (event.key === 'Enter') {
        const searchField = document.getElementById('searchID');
        const searchValue = searchField.value;
        const products = await loadData();
        const findProducts = products.filter(product => product.category.includes(searchValue));

        if (findProducts.length == 0) {
            console.log('is Not Foundt');
            return
        }

        findProducts.forEach(product => {
            const productCard = document.createElement('productCard');
            console.log(productCard);
            productCard.classList.add('w-80');

            console.log(product);
            productCard.innerHTML = `
                <div class="card w-80 bg-base-100 shadow-xl">
                <figure><img class="h-48" src="${product.image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${product.title}</h2>
                    <p></p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>

                `
            displayProductContainer.appendChild(productCard)

        })

    }
})




//loadData();
displayProductCategory();
//displayProduct();