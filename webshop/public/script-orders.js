async function fetchOrders() {
    try {
        const response = await fetch('/api/orders/getAllvwOrders');
        console.log('Fetching orders, status:', response.status);

        if (!response.ok) {
            throw new Error(`Error fetching orders: ${response.statusText}`);
        }

        const orders = await response.json();
        console.log('Fetched orders:', orders);

        const table = document.querySelector('#orders-table tbody');
        if (!table) throw new Error('Orders table not found in DOM');

        if (orders.length === 0) {
            table.innerHTML = `<tr><td colspan="6">No orders found</td></tr>`;
            return;
        }

        table.innerHTML = orders.map(order => {
            const productList = order.product_id
                .split('|')
                .map(item => `<li>${item}</li>`)
                .join('');

            const statuses = ["В обробці", "Комплектується", "Відправлено", "Доставлено", "Отримано"];
            const statusOptions = statuses.map(status => `
                <option value="${status}" ${order.status === status ? "selected" : ""}>
                    ${status}
                </option>
            `).join('');

            return `
                <tr>
                    <td>${order.order_id || 'N/A'}</td>
                    <td>${order.person || 'N/A'}</td>
                    <td><ul>${productList}</ul></td>
                    <td>${order.total_price || 'N/A'}</td>
                    <td>
                        <select id="status-${order.order_id}">
                            ${statusOptions}
                        </select>
                    </td>
                    <td>
                        <button class="save-button" onclick="updateOrderStatus(${order.order_id})">
                            Save
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching orders:', error);
        const table = document.querySelector('#orders-table tbody');
        if (table) {
            table.innerHTML = `<tr><td colspan="6">${error.message}</td></tr>`;
        }
    }
}

async function updateOrderStatus(orderId) {
    try {
        const statusSelect = document.getElementById(`status-${orderId}`);
        console.log('Status select element:', statusSelect);

        if (!statusSelect) {
            throw new Error(`Element with ID status-${orderId} not found`);
        }

        const newStatus = statusSelect.value;
        console.log('Selected status value:', newStatus);

        const requestBody = {
            order_id: orderId,
            new_status: newStatus
        };
        console.log('Request body:', requestBody);

        const response = await fetch(`/api/orders/updateOrderStatus`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        console.log('Fetch response:', response);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || response.statusText);
        }

        const result = await response.json();
        alert(`Status for order ${orderId} updated to "${newStatus}"`);
    } catch (error) {
        console.error(`Error updating status for order ${orderId}:`, error);
        alert(`Error updating status for order ${orderId}: ${error.message}`);
    }
}

fetchOrders();