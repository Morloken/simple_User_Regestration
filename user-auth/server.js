const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const users = {};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    users[username] = { password: hashedPassword };

    res.json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users[username];

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });

    res.json({ token });
});

app.get('/api/profile', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        res.json({ username: decoded.username });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
