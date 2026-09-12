import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getApiUrl = () => `${getApiBaseUrl()}/api/leaderboard/`;

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl());
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload.data ?? payload.results ?? [];
        setLeaders(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <section>
      <h2>Leaderboard</h2>
      <div className="list-group">
        {leaders.map((entry) => (
          <div key={entry._id || entry.rank} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>#{entry.rank}</strong> {entry.name}
            </div>
            <span className="badge bg-warning text-dark">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
