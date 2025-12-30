import React, { Component } from "react";
import axios from "axios";

class MaxMinPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commodities: [],
      commodity: "",
      arrivalDate: "",
      type: "max", // max | min
      prices: [],
      loading: false,
      error: ""
    };
  }

  // Load commodities on page load
  componentDidMount() {
    axios
      .get("http://localhost:8080/api/dropdown/commodities")
      .then(res => {
        this.setState({ commodities: res.data });
      })
      .catch(() => {
        this.setState({ error: "Failed to load commodities" });
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: "", prices: [] });

    const { commodity, arrivalDate, type } = this.state;

    try {
      const res = await axios.get(
        "http://localhost:8080/api/dropdown/max-min-price",
        {
          params: {
            commodity,
            arrivalDate,
            type
          }
        }
      );

      this.setState({ prices: res.data });
    } catch (err) {
      this.setState({ error: "No data found" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      commodities,
      commodity,
      arrivalDate,
      type,
      prices,
      loading,
      error
    } = this.state;

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>📊 Max / Min Crop Price Finder</h2>

        <form onSubmit={this.handleSubmit} style={styles.form}>
          
          {/* Commodity Dropdown */}
          <select
            name="commodity"
            value={commodity}
            onChange={this.handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Commodity</option>
            {commodities.map((c, index) => (
              <option key={index} value={c}>{c}</option>
            ))}
          </select>

          {/* Arrival Date */}
          <input
            type="date"
            name="arrivalDate"
            value={arrivalDate}
            onChange={this.handleChange}
            required
            style={styles.input}
          />

          {/* Type */}
          <select
            name="type"
            value={type}
            onChange={this.handleChange}
            style={styles.input}
          >
            <option value="max">Maximum Price</option>
            <option value="min">Minimum Price</option>
          </select>

          <button type="submit" style={styles.button}>
            Get Price
          </button>
        </form>

        {/* Status */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Results */}
        {prices.length > 0 && (
          <div style={styles.resultBox}>
            <h3>📋 Price List</h3>

            {prices.map((p, index) => (
              <div key={index} style={styles.card}>
                <p><b>State:</b> {p.state}</p>
                <p><b>District:</b> {p.district}</p>
                <p><b>Market:</b> {p.market}</p>
                <p><b>Commodity:</b> {p.commodity}</p>
                <p><b>Maximum Price:</b>{p.max_price}</p>
                <p><b>Minimum Price:</b>{p.min_price}</p>

                <p><b>Date:</b> {p.arrival_date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MaxMinPrice;

/* 🎨 Styling */
const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    minWidth: "200px"
  },
  button: {
    padding: "10px 25px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  resultBox: {
    marginTop: "30px"
  },
  card: {
    background: "#121416ff",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }
};
