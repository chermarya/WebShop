async function fetchOrders() {
    try {
        const response = await fetch('/api/orders/getAllvwOrders');

        // Логируем статус ответа
        console.log('Fetching orders, status:', response.status);

        if (!response.ok) {
            throw new Error(`Error fetching orders: ${response.statusText}`);
        }

        const orders = await response.json();
        console.log('Fetched orders:', orders); // Логируем полученные данные

        const table = document.querySelector('#orders-table tbody');
        if (!table) throw new Error('Orders table not found in DOM');

        if (!orders || orders.length === 0) {
            table.innerHTML = `<tr><td colspan="5">No orders found</td></tr>`;
            return;
        }

        table.innerHTML = orders.map(order => {
            // Разбиваем строку `product_id` на список продуктов
            const productList = order.product_id
                .split('|') // Разделяем по |
                .map(item => `<li>${item}</li>`) // Превращаем в элементы списка
                .join(''); // Объединяем обратно в строку

            return `
                <tr>
                    <td>${order.order_id || 'N/A'}</td>
                    <td>${order.person || 'N/A'}</td>
                    <td><ul>${productList}</ul></td> <!-- Выводим как список -->
                    <td>${order.total_price || 'N/A'}</td>
                    <td>${order.status || 'N/A'}</td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching orders:', error);
        const table = document.querySelector('#orders-table tbody');
        if (table) {
            table.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
        }
    }
}
