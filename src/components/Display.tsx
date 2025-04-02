import { useContext, useState } from "react";
import { AppContext } from "../App";

const Display = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not available");
  }
  const { state, dispatch } = context;

  const fillArray: string[] = Array(64).fill("");
  const binaryArray = state.binary.split("");

  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);

  const handleMouseDown = (index: number) => {
    setIsSelecting(true);
    setStartIndex(index);
    setEndIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    if (isSelecting) {
      setEndIndex(index);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (startIndex - endIndex > 0) {
      // left to right
      dispatch({
        type: "add-range",
        payload: {
          start: startIndex || 0,
          end: endIndex || 0,
        },
      });
    } else if (endIndex - startIndex > 0) {
      // right to left
      dispatch({
        type: "add-range",
        payload: {
          start: endIndex || 0,
          end: startIndex || 0,
        },
      });
    }

    setStartIndex(0);
    setEndIndex(0);
  };

  // console.log(state.ranges[0]);
  return (
    <>
      <div className="display-grid">
        {fillArray.map((char, index) => {
          let isSelected = false;

          if (
            (startIndex > endIndex &&
              63 - index <= startIndex &&
              63 - index >= endIndex) ||
            (startIndex < endIndex &&
              63 - index >= startIndex &&
              63 - index <= endIndex)
          ) {
            isSelected = true;
          }
          return (
            <div
              className={`grid-item border index ${
                isSelected ? "selected" : ""
              }`}
              style={{
                gridColumn: `${index + 1} / span 1`,
              }}
              onMouseDown={() => handleMouseDown(63 - index)}
              onMouseEnter={() => handleMouseEnter(63 - index)}
              onMouseUp={handleMouseUp}
              key={index}
            >
              {63 - index}
              {char}
            </div>
          );
        })}

        {binaryArray.length === 0 &&
          fillArray.map((char, index) => (
            <div
              className="grid-item border binary"
              style={{
                gridColumn: `${index + 1} / span 1`,
              }}
              key={index}
            >
              {char}
            </div>
          ))}
        {binaryArray.map((char, index) => (
          <div
            className="grid-item border binary"
            style={{
              gridColumn: `${index + 1} / span 1`,
            }}
            key={index}
          >
            {char}
          </div>
        ))}
        <div className="divider"></div>

        {state.ranges.map((range, index) => (
          <div
            className="range"
            style={{
              gridColumn: `${range.trueStart + 1} / ${range.trueEnd + 2}`,
            }}
            key={index}
          >
            <div
              className="hex border"
              style={{
                backgroundColor: `${range.color}`,
              }}
            >
              {range.hex}
            </div>
            <div className="position">
              {range.displayStart}-{range.displayEnd}
            </div>
          </div>
        ))}
        {state.ranges.map((range, index) => (
          <div
            key={index}
            className="highlight"
            style={{
              gridColumn: `${range.trueStart + 1} / ${range.trueEnd + 2}`,
              backgroundColor: `${range.color}`,
            }}
          ></div>
        ))}
      </div>

      {/* <table className="binary-table">
        <thead>
          <tr>
            {binaryArray.map((char, index) => (
              <th key={index}>{index}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {binaryArray.map((char, index) => (
              <td key={index}>{char}</td>
            ))}
          </tr>
          <tr className="divider">
            {Array(64)
              .fill("")
              .map(() => (
                <td></td>
              ))}
          </tr>
          {state.ranges.map((range) => (
            <tr>
              {range.start} to {range.end}
            </tr>
          ))}
          {state.ranges.map((range) => (
            <tr>
              {Array(64)
                .fill("")
                .map((index) => (
                  <td>{range.hex}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default Display;
