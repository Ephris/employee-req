import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin, authStorage } from '../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = await adminLogin(username, password);
      authStorage.setToken(result.token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'grid', placeItems: 'center', padding: 16 }}>
      <form
        onSubmit={onSubmit}
        style={{ width: '100%', maxWidth: 460, borderRadius: 16, background: '#fff', padding: 24, boxShadow: '0 12px 30px rgba(15,23,42,0.12)' }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 8, fontSize: 28, color: '#0f172a' }}>Admin Login</h1>
        <p style={{ marginTop: 0, marginBottom: 16, color: '#475569' }}>
          Sign in to review and manage submissions.
        </p>
        {error && (
          <div style={{ marginBottom: 12, borderRadius: 8, background: '#fef2f2', color: '#b91c1c', padding: '10px 12px' }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600 }}>Username</label>
          <input
            style={{ width: '100%', borderRadius: 8, border: '1px solid #cbd5e1', padding: '10px 12px' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600 }}>Password</label>
          <input
            style={{ width: '100%', borderRadius: 8, border: '1px solid #cbd5e1', padding: '10px 12px' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          style={{ width: '100%', borderRadius: 8, border: 'none', background: '#4f46e5', color: 'white', padding: '10px 14px', cursor: 'pointer' }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <p style={{ marginTop: 12, marginBottom: 0, fontSize: 13, color: '#64748b' }}>
          Tip: In development, first login can auto-create the admin user if none exists.
        </p>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>Back to Home</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;

