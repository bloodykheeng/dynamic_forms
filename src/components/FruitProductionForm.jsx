import React, { useState } from "react";

function AppleDataCollection() {
  const [villages] = useState([
    { id: 1, name: "Village A" },
    { id: 2, name: "Village B" },
    { id: 3, name: "Village C" }
  ]);
  const [selectedVillageId, setSelectedVillageId] = useState(null);
  const [villageData, setVillageData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  const handleVillageChange = (e) => {
    const villageId = e.target.value;
    setSelectedVillageId(villageId);

    if (!villageData[villageId]) {
      setVillageData({
        ...villageData,
        [villageId]: { total_apples: 0, apple_types: [] }
      });
    }
  };

  const handleTotalApplesChange = (totalApples) => {
    const updatedVillageData = {
      ...villageData[selectedVillageId],
      total_apples: totalApples,
      apple_types: new Array(totalApples).fill({}).map(
        (_, i) =>
          villageData[selectedVillageId].apple_types[i] || {
            id: i + 1,
            type: ""
          }
      )
    };

    setVillageData({
      ...villageData,
      [selectedVillageId]: updatedVillageData
    });
  };

  const handleAppleTypeChange = (index, type) => {
    const updatedAppleTypes = [...villageData[selectedVillageId].apple_types];
    updatedAppleTypes[index] = { ...updatedAppleTypes[index], type };

    setVillageData({
      ...villageData,
      [selectedVillageId]: {
        ...villageData[selectedVillageId],
        apple_types: updatedAppleTypes
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = villageData[selectedVillageId];
    setSubmittedData([...submittedData, dataToSubmit]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Village:
          <select
            onChange={handleVillageChange}
            value={selectedVillageId || ""}
          >
            <option value="">Select a Village</option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.name}
              </option>
            ))}
          </select>
        </label>

        {selectedVillageId && (
          <>
            <label>
              Total Apples:
              <input
                type="number"
                min="0"
                value={villageData[selectedVillageId]?.total_apples || 0}
                onChange={(e) =>
                  handleTotalApplesChange(Number(e.target.value))
                }
              />
            </label>

            {villageData[selectedVillageId]?.apple_types.map((apple, index) => (
              <label key={index}>
                Apple Type {index + 1}:
                <input
                  type="text"
                  value={apple.type}
                  onChange={(e) => handleAppleTypeChange(index, e.target.value)}
                />
              </label>
            ))}
          </>
        )}

        <button type="submit" disabled={!selectedVillageId}>
          Submit
        </button>
      </form>

      <div>
        <h3>Submitted Data</h3>
        {submittedData.map((data, index) => (
          <div key={index}>
            <p>Total Apples: {data.total_apples}</p>
            <p>
              Apple Types:{" "}
              {data.apple_types.map((apple) => apple.type).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppleDataCollection;
