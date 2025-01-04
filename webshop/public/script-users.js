async function fetchUsers() {
    try {
        const response = await fetch('/api/users/getAllUsers');

        console.log('Fetching users, status:', response.status);

        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const users = await response.json();
        console.log('Fetched users:', users);

        const table = document.querySelector('#users-table tbody');
        if (!table) throw new Error('Users table not found in DOM');

        if (!users || users.length === 0) {
            table.innerHTML = `<tr><td colspan="4">No users found</td></tr>`;
            return;
        }

        table.innerHTML = users.map(user => `
            <tr>
                <td>${user.user_id || 'N/A'}</td>
                <td>${user.name || 'N/A'}</td>
                <td>${user.surname || 'N/A'}</td>
                <td>${user.email || 'N/A'}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching users:', error);
        const table = document.querySelector('#users-table tbody');
        if (table) {
            table.innerHTML = `<tr><td colspan="4">${error.message}</td></tr>`;
        }
    }
}

document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();

    try {
        const response = await fetch('/api/users/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || response.statusText);
        }

        alert('User added successfully!');
        fetchUsers(); // Обновляем таблицу
        document.getElementById('add-user-form').reset(); // Очищаем форму
    } catch (error) {
        console.error('Error adding user:', error);
        alert(`Error adding user: ${error.message}`);
    }
});

// Загрузка списка пользователей при открытии страницы
fetchUsers();