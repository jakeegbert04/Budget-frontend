import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "./useFetch";

const useModalForm = ({
  initialState,
  endpoint,
  extraBody = {},
  onSuccess,
  validate,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const { loading, fetchData } = useFetch();

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" || name === "balance" || name === "amount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (validate && !validate(formData)) {
      setError("Please fill all required fields.");
      return;
    }
    try {
      const response = await fetchData(endpoint, {
        method: "POST",
        body: { ...formData, ...extraBody, user_id: userInfo.user_id },
      });
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError("Failed to submit. Please try again.");
    }
  };
  useEffect(() => {
    setFormData(initialState);
    setError(null);
  }, [initialState]);

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
};

export default useModalForm;
