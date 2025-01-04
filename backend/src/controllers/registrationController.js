import RegistrationService from '../services/registrationService.js';

const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        
        const result = await RegistrationService.registerUser(userData);
        
        if (result.success) {
            return res.status(201).json({
                message: result.message,
                token: result.token, // A sikeres regisztráció után a token is visszaküldésre kerül
            });
        } else {
            return res.status(400).json({ message: result.message });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error during registration' });
    }
};

export default { registerUser };

