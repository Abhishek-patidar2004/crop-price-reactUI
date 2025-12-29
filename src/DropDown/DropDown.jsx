import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DropDown.css";

function DropDown() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // STATES
  useEffect(() => {
    axios.get("http://localhost:8080/api/dropdown/states")
      .then(res => setStates(res.data));
  }, []);

  // DISTRICTS
  useEffect(() => {
    if (!state) return;
    axios.get(`http://localhost:8080/api/dropdown/districts?state=${state}`)
      .then(res => setDistricts(res.data));
  }, [state]);

  // MARKETS
  useEffect(() => {
    if (!district) return;
    axios.get(
      `http://localhost:8080/api/dropdown/markets?state=${state}&district=${district}`
    ).then(res => setMarkets(res.data));
  }, [district]);

  // COMMODITIES
  useEffect(() => {
    axios.get("http://localhost:8080/api/dropdown/commodities")
      .then(res => setCommodities(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrice(null);

    try {
      const res = await axios.get(
        "http://localhost:8080/api/dropdown/checkprice",
        {
          params: {
            state,
            district,
            market,
            commodity,
            arrivalDate
          }
        }
      );
      setPrice(res.data[0]);
    } catch (err) {
      console.error(err);
      setError("No data found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={state} onChange={e => setState(e.target.value)}>
          <option value="">Select State</option>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>

        <select value={district} disabled={!state}
                onChange={e => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          {districts.map(d => <option key={d}>{d}</option>)}
        </select>

        <select value={market} disabled={!district}
                onChange={e => setMarket(e.target.value)}>
          <option value="">Select Market</option>
          {markets.map(m => <option key={m}>{m}</option>)}
        </select>

        <select value={commodity}
                onChange={e => setCommodity(e.target.value)}>
          <option value="">Select Commodity</option>
          {commodities.map(c => <option key={c}>{c}</option>)}
        </select>

        <input
          type="date"
          value={arrivalDate}
          onChange={e => setArrivalDate(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {price && (
        <table border="6" padding="10">
          <tbody>
            <tr><td>State</td><td>{price.state}</td></tr>
            <tr><td>District</td><td>{price.district}</td></tr>
            <tr><td>Market</td><td>{price.market}</td></tr>
            <tr><td>Commodity</td><td>{price.commodity}</td></tr>
            <tr><td>Min</td><td>{price.min_price}</td></tr>
            <tr><td>Max</td><td>{price.max_price}</td></tr>
            <tr><td>Modal</td><td>{price.modal_price}</td></tr>
            <tr><td>Date</td><td>{price.arrival_date}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DropDown;
