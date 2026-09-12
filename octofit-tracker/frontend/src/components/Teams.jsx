import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getApiUrl = (path) => `${getApiBaseUrl()}/api/${path}/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload.data ?? payload.results ?? [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <section>
      <h2>Teams</h2>
      <div className="list-group">
        {teams.map((team) => (
          <div key={team._id || team.name} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{team.name}</strong>
              <span className="badge bg-success">{team.wins} wins</span>
            </div>
            <small>Members: {team.members}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
