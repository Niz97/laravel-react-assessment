import { useState, useEffect } from 'react'
import './App.css';
import Location from './components/Location';
import NewLocationForm from './components/NewLocationForm';

const APP_URL = "http://127.0.0.1:8000/api/";
const INITIAL_FORM = {
  name: "",
  description: "",
  status: "",
  date_start: "",
  date_end: "",
};

function App() {
  // EXTRA:: Given extra time I would use a third party state managment library such as Redux or Zustand
  // Likely Redux since I have experience with it
  // ContextProvider would also be a native solution
  // Redux would allow me to remove any prop drilling, but for the size of this project I determined it was acceptable
  const [locations, setLocations] = useState([])
  const [newLocation, setNewLocation] = useState({
    name: "",
    description: "",
    status: "",
    date_start: "",
    date_end: "",
  });
  const [alert, setAlert] = useState("");

  // HANDLE METHODS START
  async function handleSubmit(event){
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation)
    });
    let result = await response.json();
    
    // EXTRA:: Ideally the alerts would clear after short period of time
    if (response.ok) {
      setAlert("Successfully created new Location!");
      setNewLocation(INITIAL_FORM);
    } else {
      setAlert(result);
    }
  }

  // EXTRA:: This method should also handle when an <input /> element is of type checkbox
  const handleChange = event => {
    const { name, value } = event.target;
    setNewLocation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // HANDLE METHODS END


  useEffect(() => {
    async function fetchLocations() {
      let response = await fetch("http://127.0.0.1:8000/api/locations");
      let result = await response.json()
      setLocations(result)
    }

    fetchLocations()
  }, [])

  return (
    <div className="screen">

      <div className="create-location-container">
        <NewLocationForm 
          location={newLocation} 
          onChange={handleChange} 
          onSubmit={handleSubmit}
        />
    
        <div className="alert-container">
          {
            alert ? <div>{alert}</div> : null 
          }
        </div>
      </div>

      <div className="locations-container">
        {locations.map((location) => (
          <Location
            key={`location-key-${location.id}`} //EXTRA:: Would be more appropriate to use a package such as 'uuid' for unique keys
            location={location}/>
        ))}
      </div>

    </div>
  )
}

export default App
