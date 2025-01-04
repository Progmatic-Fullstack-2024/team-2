import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/registrationValidation';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = {};
        
        // Validáció
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
        if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one number';
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Registration successful');
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Error during registration');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                    <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;
