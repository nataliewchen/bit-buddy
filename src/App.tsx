import { useEffect, useReducer, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Display from "./components/Display";

interface Range {
  displayStart: number;
  displayEnd: number;
  trueStart: number;
  trueEnd: number;
  hex: string;
  color: string;
}

interface State {
  input: string;
  binary: string;
  ranges: Range[];
  occupied: Set<number>;
}

const initialState: State = {
  input: "",
  binary: Array(64).fill("0").join(""),
  ranges: [],
  occupied: new Set<number>(),
};

type Action =
  | { type: "set-input"; payload: { value: string } }
  | { type: "set-binary"; payload: { value: string } }
  | { type: "add-range"; payload: { start: number; end: number } }
  | { type: "reset-ranges" }
  | { type: "undo-last-range" };

interface AppContextType {
  state: State;
  dispatch: (action: Action) => void;
}

const convertToStrToBinary = (input: string) => {
  let decimal: number;

  if (input.startsWith("0x") || input.startsWith("0X")) {
    decimal = parseInt(input, 16);
  } else {
    decimal = parseInt(input, 10);
  }

  if (isNaN(decimal)) {
    return "";
  } else {
    let binaryString: string = decimal.toString(2);
    while (binaryString.length < 64) {
      binaryString = "0" + binaryString;
    }

    return binaryString;
  }
};

const convertBinaryToHex = (binary: string, start: number, end: number) => {
  const substr = binary.slice(start, end + 1);
  return "0x" + parseInt(substr, 2).toString(16).toUpperCase();
};

const invertPosition = (pos: number) => {
  return 63 - pos;
};

const colors = [
  "#4B004B", // Dark Magenta
  "#746100", // Dark Yellow
  "#002366", // Dark Blue
  "#0F4C0F", // Dark Green
  "#7D0A0A", // Dark Red
  "#660033", // Dark Pink
  "#005B5B", // Dark Cyan
  "#3D0C5E", // Dark Purple
  "#1A1A40", // Dark Grayish Indigo
  "#9B4503", // Dark Orange
];

const addSpreadNumsToSet = (
  occupied: Set<number>,
  start: number,
  end: number
) => {
  // start > end since it's the display nums
  for (let i = start; i >= end; i--) {
    occupied.add(i);
  }
  return occupied;
};

const removeSpreadNumsFromSet = (
  occupied: Set<number>,
  start: number,
  end: number
) => {
  // start > end since it's the display nums
  for (let i = start; i >= end; i--) {
    occupied.delete(i);
  }
  return occupied;
};

const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "set-input":
      return {
        ...state,
        input: action.payload.value,
      };
    case "set-binary":
      return {
        ...state,
        binary: action.payload.value,
      };
    case "add-range": {
      const hasOverlap =
        state.occupied.has(action.payload.start) ||
        state.occupied.has(action.payload.end);
      if (hasOverlap) {
        console.log("OVERLAP");
      }
      // console.log(hasOverlap);
      if (state.binary && !hasOverlap) {
        // reversing to get the 0 -> 63 equivalent
        const trueStart: number = invertPosition(action.payload.start);
        const trueEnd: number = invertPosition(action.payload.end);
        return {
          ...state,
          ranges: [
            ...state.ranges,
            {
              displayStart: action.payload.start,
              displayEnd: action.payload.end,
              trueStart: trueStart,
              trueEnd: trueEnd,
              hex: convertBinaryToHex(state.binary, trueStart, trueEnd),
              color: colors[Math.floor(Math.random() * colors.length)],
            },
          ],
          occupied: addSpreadNumsToSet(
            state.occupied,
            action.payload.start,
            action.payload.end
          ),
        };
      }
      return state;
    }
    case "reset-ranges":
      return {
        ...state,
        ranges: [],
        occupied: new Set(),
      };
    case "undo-last-range": {
      const lastRange = state.ranges.slice(-1)[0];
      console.log(lastRange);
      return {
        ...state,
        ranges: state.ranges.slice(0, -1),
        occupied: removeSpreadNumsFromSet(
          state.occupied,
          lastRange.displayStart,
          lastRange.displayEnd
        ),
      };
    }

    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const binary = convertToStrToBinary(state.input);
    dispatch({ type: "set-binary", payload: { value: binary } });
  }, [state.input]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <Header />
        <Form />
        <Display />
      </div>
    </AppContext.Provider>
  );
};

export default App;
