import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getApiUrl = (path) => `${getApiBaseUrl()}/api/${path}/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('activities'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload.data ?? payload.results ?? [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <section>
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || `${activity.user}-${activity.date}`} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{activity.type}</strong>
              <span className="badge bg-info text-dark">{activity.date}</span>
            </div>
            <small>{activity.user}</small>
            <div>Distance: {activity.distanceKm} km</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
