import React, { useState } from "react";
import "./HousePricePredictor.css";
const HousePricePredictor = () => {
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [lease_term, setLeaseTerm] = useState("");
  const [type, setType] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [sq_feet, setSq_feet] = useState("");

  const [selectedFurnishing, setSelectedFurnishing] = useState("Unfurnished");

  const [smoking, setSmoking] = useState("");
  const [pets, setPets] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict_house_price",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: city,
            province: province,
            latitude: latitude,
            longitude: longitude,
            lease_term: lease_term,
            type: type,
            beds: beds,
            baths: baths,
            sq_feet: sq_feet,
            furnishing: selectedFurnishing,
            smoking: smoking,
            pets: pets,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.predicted_price);
      } else {
        setPrediction(null);
      }
    } catch (error) {
      setPrediction(null);
      console.error("Error during form submission", error);
    }
  };

  return (
    <div className="container">
      <h1> House Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <br />
        <label htmlFor="province">Province:</label>
        <input
          type="text"
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          required
        />
        <br />

        <label htmlFor="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
        <br />
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
        <br />
        <label htmlFor="lease_term">Lease Term:</label>
        <input
          type="text"
          id="lease_term"
          value={lease_term}
          onChange={(e) => setLeaseTerm(e.target.value)}
          required
        />
        <br />
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <br />
        <label htmlFor="beds">Beds:</label>
        <input
          type="text"
          id="beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          required
        />
        <br />
        <label htmlFor="baths">Baths:</label>
        <input
          type="text"
          id="baths"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          required
        />
        <br />
        <label htmlFor="sq_feet">Square Feet:</label>
        <input
          type="text"
          id="sq_feet"
          value={sq_feet}
          onChange={(e) => setSq_feet(e.target.value)}
          required
        />
        <br />
        <label htmlFor="furnishing">Furnishing:</label>
        <select
          value={selectedFurnishing}
          onChange={(e) => setSelectedFurnishing(e.target.value)}
        >
          <option value="unfurnished"> Unfurnished </option>
          <option value="partiallyFurnished"> Partially Furnished</option>
          <option value="fullyFurnished"> Fully Furnished </option>
        </select>
        <br />

        <label htmlFor="smoking">Smoking:</label>
        <input
          type="text"
          id="smoking"
          value={smoking}
          onChange={(e) => setSmoking(e.target.value)}
          required
        />
        <br />

        <label htmlFor="pets">I have a pet:</label>
        <input
          type="checkbox"
          checked={pets}
          onChange={(e) => setPets(e.target.checked)}
        />
        <br />
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div className="result">
          <p>Predicted Rent Price: ${prediction}</p>
        </div>
      )}
    </div>
  );
};
export default HousePricePredictor;
