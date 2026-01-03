import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login =() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = login(email, password);

        if(result.success){
            if(result.role === 'admin') {
                navigate('/admin/dashbord');
            }else if(result.role === 'customer'){
                navigate('/customers/dashboard');
            }
        }else{
            alert(result.message);
        }
    }

    return(
        <div className='login-container'>
            <div className='login-box'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                        />

                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <button type='submit' className='login-btn'>
                        Login
                    </button>
                </form>
                <div className='credentials-info'>
                    <p><strong>Admin:</strong>admin@gmail.com/ admin1234</p>
                    <p><strong>Customer:</strong>customer@gmail.com/ customer1234</p>
                </div>
            </div>
        </div>
    )
}

export default Login;