async function fetchProducts() {
    try {
        const response = await fetch('/api/products/getAllProducts');
        console.log('Fetching products, status:', response.status);

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        let data = await response.json();
        console.log('Fetched products:', data); // Логируем полученные данные

        // Извлекаем массив продуктов из ключа `products`
        const products = data.products;
        if (!Array.isArray(products)) {
            throw new Error('Invalid products data format: "products" is not an array');
        }

        const table = document.querySelector('#products-table tbody');
        if (!table) throw new Error('Products table not found in DOM');

        if (products.length === 0) {
            table.innerHTML = `<tr><td colspan="5">No products found</td></tr>`;
            return;
        }

        table.innerHTML = products.map(product => `
            <tr>
                <td>${product.product_id || 'N/A'}</td>
                <td>${product.title || 'N/A'}</td>
                <td>${product.category || 'N/A'}</td>
                <td>${product.price || 'N/A'}</td>
                <td>${product.quantity || 'N/A'}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching products:', error);
        const table = document.querySelector('#products-table tbody');
        if (table) {
            table.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
        }
    }
}
