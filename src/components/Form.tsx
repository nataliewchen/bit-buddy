import { useContext } from "react";
import { AppContext } from "../App";

const InputForm = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not available");
  }
  const { state, dispatch } = context;

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "reset-ranges" });
  };
  const handleUndo = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "undo-last-range" });
  };

  return (
    <form className="input-form">
      <div className="form-col">
        <label htmlFor="input">Enter your decimal or hexadecimal:</label>
        <div className="input-wrapper">
          <input
            id="input"
            type="text"
            value={state.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: "set-input",
                payload: { value: e.target.value },
              })
            }
          />
          <button>clear</button>
        </div>
      </div>
      <div className="form-col">
        <label>To create a new range, click on an index and drag</label>
        <div className="btn-group">
          <button onClick={handleReset}>reset ranges</button>
          <button onClick={handleUndo}>undo last range</button>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
