import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/workouts/`;
  }

  return 'http://localhost:8000/api/workouts/';
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
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
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <section>
      <h2>Workouts</h2>
      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout._id || workout.title} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{workout.title}</strong>
              <span className="badge bg-secondary">{workout.category}</span>
            </div>
            <small>Duration: {workout.durationMinutes} minutes</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
