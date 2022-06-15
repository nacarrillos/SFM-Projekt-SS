import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BauteilSuche = () => {
  const [bauteilId, setBauteilId] = useState("");
  let navigate = useNavigate();

  const handleSuche = (e, id) => {
    e.preventDefault();
    try {
      if (bauteilId !== "") {
        navigate(`/bauteil/${id}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="mt-4 mb-4">
      <form action="">
        <div className="row">
          <div className="col-11">
            <input
              value={bauteilId}
              onChange={(e) => setBauteilId(e.target.value)}
              className="form-control"
              type="number"
              placeholder="Screib die Bauteile ID Wenn du es kennst"
              required
            />
          </div>
          <div className="col">
            <button
              onClick={(e) => handleSuche(e, bauteilId)}
              type="submit"
              className="btn btn-primary"
            >
              Suchen
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BauteilSuche;
