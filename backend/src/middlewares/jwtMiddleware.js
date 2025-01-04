import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Az Authorization fejlécből kell kinyerni a tokent

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // A token dekódolása és ellenőrzése
        req.user = decoded; // A dekódolt felhasználói adatokat  a request objektumban
        next(); 
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyToken;
