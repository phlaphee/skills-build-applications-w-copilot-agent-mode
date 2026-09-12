import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getApiUrl = (path) => `${getApiBaseUrl()}/api/${path}/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('users'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload.data ?? payload.results ?? [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <section>
      <h2>Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id || user.email} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{user.name}</strong>
              <span className="badge bg-primary">{user.role}</span>
            </div>
            <div className="text-muted">{user.email}</div>
            <small>Team: {user.team}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
