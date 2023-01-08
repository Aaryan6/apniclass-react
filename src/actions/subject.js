import * as api from "../api";

export const getSubjects = () => async (dispatch) => {
  try {
    const { data } = await api.getSubjects();
    dispatch({ type: "FETCH_SUBJECTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
