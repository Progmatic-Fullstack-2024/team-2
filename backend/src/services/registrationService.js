import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key'; // Ez a kulcs a JWT generálásához

const registerUser = async (userData) => {
    try {
        // Jelszó titkosítása
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Felhasználó létrehozása
        const user = new UserModel({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            password: hashedPassword, // A titkosított jelszó kerül tárolásra
            role: userData.role || 'user', // Alapértelmezett szerepkör: user
        });

        await user.save();

        // JWT generálása
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' } // A token egy óráig érvényes de ezt változtathatjuk !
        );

        // Visszaadjuk a sikeres választ a tokennel
        return { success: true, message: 'Registration successful', token };
    } catch (error) {
        console.error('Error in registration:', error);
        return { success: false, message: 'Registration failed' };
    }
};

export default { registerUser };
