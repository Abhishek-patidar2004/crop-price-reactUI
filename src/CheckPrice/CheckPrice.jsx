import React, { useState } from "react";
import axios from "axios";

const CheckPrice = () => {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    market: "",
    commodity: "",
    arrivalDate: "",
  });

  const [price, setPrice] = useState(null); // 🔥 SINGLE OBJECT
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`; // matches DB
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrice(null);

    try {
      const response = await axios.get(
        "http://localhost:8080/api/dashboard/prices",
        {
          params: {
            state: formData.state,
            district: formData.district,
            market: formData.market,
            commodity: formData.commodity,
            arrivalDate: formatDate(formData.arrivalDate),
          },
        }
      );

      setPrice(response.data); // 🔥 OBJECT, NOT ARRAY
    } catch (err) {
      console.error("API ERROR 👉", err.response || err.message);
      setError("No data found or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Check Crop Price</h2>

      <form onSubmit={handleSubmit}>
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="district" placeholder="District" onChange={handleChange} required />
        <input name="market" placeholder="Market" onChange={handleChange} required />
        <input name="commodity" placeholder="Commodity" onChange={handleChange} required />

        <input
          type="date"
          name="arrivalDate"
          onChange={handleChange}
          required
        />

        <br /><br />
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ SINGLE RESULT TABLE */}
      {price && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>State</th>
              <th>District</th>
              <th>Market</th>
              <th>Commodity</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Modal Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{price.state}</td>
              <td>{price.district}</td>
              <td>{price.market}</td>
              <td>{price.commodity}</td>
              <td>{price.minPrice}</td>
              <td>{price.maxPrice}</td>
              <td>{price.modalPrice}</td>
              <td>{price.arrivalDate}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckPrice;
