// pastikan path sesuai

import { setCustomer, setError } from "../Slicer/Customer";

export const loadCustomer = (customerData) => async (dispatch) => {
  try {
    const response = await fetch(
      "http://localhost:5001/api/customer/load-user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load customer");
    }

    // Jika request berhasil, set customer ke state
    dispatch(setCustomer({ customer: data.user }));
  } catch (error) {
    // Jika ada error, dispatch error ke state
    dispatch(setError({ error: error.message }));
  }
};
