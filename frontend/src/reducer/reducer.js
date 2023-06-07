export const initialState = {
  loading: true,
  data: null,
  err: false,
};

export const reducer = (state, action) => {
  if (action.type === "start") {
    return { ...state, loading: true };
  } else if (action.type === "end") {
    return { ...state, loading: false, data: action.payload };
  } else if (action.type === "error") {
    return { loading: false, data: null, err: true };
  }

  return state;
};

export const newReducer = (state, action) => {
  if (action.type === "TRIGGER") {
    return { loading: true, data: null, err: false, trigger: action.trigger };
  } else if (action.type === "END") {
    return { ...state, loading: false, data: action.data };
  } else if (action.type === "ERROR") {
    return { loading: false, data: null, err: action.error };
  } else if (action.type === "CLEAR") {
    return { loading: false, data: null, trigger: null, err: null };
  }

  return state;
};
