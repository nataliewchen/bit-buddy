// import { useState, useContext } from "react";
// import { AppContext } from "../App";

const RangeForm = () => {
  // const context = useContext(AppContext);
  // if (!context) {
  //   throw new Error("AppContext is not available");
  // }
  // const { dispatch } = context;

  // const [start, setStart] = useState<number | "">("");
  // const [end, setEnd] = useState<number | "">("");

  // const handleAddRange = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   dispatch({
  //     type: "add-range",
  //     payload: {
  //       start: start || 0,
  //       end: end || 0,
  //     },
  //   });
  //   setStart("");
  //   setEnd("");
  // };

  return (
    <>
      {/* <div>
        <p>To create a new range, click on an index and drag</p>
        <button
          onClick={() => {
            dispatch({ type: "reset-ranges" });
          }}
        >
          reset ranges
        </button>
        <button
          onClick={() => {
            dispatch({ type: "undo-add-range" });
          }}
        >
          undo last range
        </button>
      </div> */}
      {/* <form className="range-form">
        New Range:
        <div className="form-control">
          <label className="hide" htmlFor="start">
            start:
          </label>
          <input
            type="number"
            name=""
            id="start"
            value={start}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStart(Number(e.target.value))
            }
          />
          to
          <label className="hide" htmlFor="end">
            end:
          </label>
          <input
            type="number"
            name=""
            id="end"
            value={end}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnd(Number(e.target.value))
            }
          />
          <button onClick={handleAddRange}>add</button>
        </div>
      </form> */}
    </>
  );
};

export default RangeForm;
