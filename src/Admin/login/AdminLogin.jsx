import { useContext, useState } from 'react';
import { AdminAuthContext } from '../Context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { loginAsAdmin, admin } = useContext(AdminAuthContext);
  const [formdata, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginAsAdmin(formdata.email, formdata.password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formdata.email} onChange={handleChange} />
      <input type="password" name="password" value={formdata.password} onChange={handleChange} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AdminLogin;