let  productList = document.getElementById('product-list');
let  categorySelect = document.getElementById('category-select');
let sortSelect = document.getElementById('sort-select');
let searchInput = document.getElementById('search-input');

// Fetch all products
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch all product categories
async function fetchCategories() {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Render product items
function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-details">
        <h2>${product.title}</h2>
        <p>Price: $${product.price}</p>
      </div>
    `;
    productList.appendChild(productItem);
  });
}

// Filter products by category
function filterProducts(products, category) {
  if (category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
}

// Sort products by price
function sortProducts(products, order) {
  return products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
}

// Search products by title
function searchProducts(products, searchTerm) {
  return products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Initialize the page with products and categories
async function initializePage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();
  renderProducts(products);

  // Populate category select options
  categorySelect.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Event listeners
categorySelect.addEventListener('change', async () => {
  const selectedCategory = categorySelect.value;
  const products = await fetchProducts();
  const filteredProducts = filterProducts(products, selectedCategory);
  renderProducts(filteredProducts);
});

sortSelect.addEventListener('change', async () => {
  const selectedOrder = sortSelect.value;
  const products = await fetchProducts();
  const sortedProducts = sortProducts(products, selectedOrder);
  renderProducts(sortedProducts);
});

searchInput.addEventListener('input', async () => {
  const searchTerm = searchInput.value.trim();
  const products = await fetchProducts();
  const searchedProducts = searchProducts(products, searchTerm);
  renderProducts(searchedProducts);
});

// Initialize the page
initializePage();
