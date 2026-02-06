require('dotenv').config();
const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Testing login with admin credentials...\n');

        const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
            email: 'admin@lebian.com',
            password: 'Admin@123'
        });

        console.log('✅ Login successful!');
        console.log('\nResponse:');
        console.log(JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('❌ Login failed!');
        if (error.response) {
            console.log('\nStatus:', error.response.status);
            console.log('Error:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.log('\n❌ No response from server. Is the backend running?');
            console.log('Make sure to run: npm run dev');
        } else {
            console.log('\nError:', error.message);
        }
    }
};

testLogin();
