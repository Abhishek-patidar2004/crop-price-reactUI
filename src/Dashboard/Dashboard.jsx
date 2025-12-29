import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Option 1: Normal price check
  const handleCheckPrice = () => {
    navigate("/DropDown");
  };

  // Option 2: Max & Min price check
  const handleCheckMaxMinPrice = () => {
    navigate("/check-max-min-price");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard</h2>

      <div style={styles.cardContainer}>
        {/* Option 1 */}
        <div style={styles.card} onClick={handleCheckPrice}>
          <h3>Check Price</h3>
          <p>Check crop prices by state, district and date</p>
        </div>

        {/* Option 2 */}
        <div style={styles.card} onClick={handleCheckMaxMinPrice}>
          <h3>Check Max & Min Price</h3>
          <p>View maximum and minimum price for a crop</p>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
  },
  card: {
    width: "260px",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
};

export default Dashboard;