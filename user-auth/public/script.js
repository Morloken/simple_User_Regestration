document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
    
        const data = await res.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
    
        const data = await res.json();
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'profile.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
