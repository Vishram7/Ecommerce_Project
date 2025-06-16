import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriversRequest } from './redux/driver/driverSlice';

function App() {
  const dispatch = useDispatch();

  const { drivers, loading, error } = useSelector((state) => state.driver);

  useEffect(() => {
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  // Check drivers before rendering to avoid potential errors
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Driver List</h1>
      {drivers && drivers.length > 0 ? (
        drivers.map((driver) => (
          <div key={driver.employeeid}>
            <h2>{driver.fullname}</h2>
            <p>{driver.mobileno}</p>
            <img style={{ width: '20%' }} src={driver.imageurl} alt={driver.fullname} />
          </div>
        ))
      ) : (
        <p>No drivers found.</p>
      )}
    </div>
  );
}

export default App;
