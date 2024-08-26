import React, { useState } from "react";
import "./Matrix.css";

const Matrix = () => {
  const [colors, setColors] = useState(Array(9).fill(null));
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (index) => {
    if (!colors[index]) {
      const newColors = [...colors];
      newColors[index] = "green";
      setColors(newColors);
      setClickOrder([...clickOrder, index]);

      console.log(`Box ${index + 1} clicked. Changed to green.`);

      if (clickOrder.length === 8) {
        // Handle the last box click
        setTimeout(() => {
          console.log(
            "Last box clicked. Changing all clicked boxes to orange in order."
          );

          setClickOrder((prevOrder) => [...prevOrder, index]);

          setColors((prevColors) => {
            const updatedColors = [...prevColors];
            clickOrder.concat(index).forEach((clickIndex, i) => {
              setTimeout(() => {
                updatedColors[clickIndex] = "orange";
                setColors([...updatedColors]);
                console.log(`Box ${clickIndex + 1} changed to orange.`);
              }, i * 500);
            });
            return updatedColors;
          });
        }, 500);
      }
    }
  };

  return (
    <div className="matrix-container">
      <div className="matrix">
        {colors.map((color, index) => (
          <div
            key={index}
            className="box"
            style={{ backgroundColor: color || "white" }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Matrix;
