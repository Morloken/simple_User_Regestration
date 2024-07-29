document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const res = await fetch('/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await res.json();
        
        if (data.username) {
            document.getElementById('user').textContent = data.username;
        } else {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error:', error);
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});
