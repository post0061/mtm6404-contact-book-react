import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Only update form if initialData is provided and form is empty
    if (initialData && Object.keys(initialData).length > 0 && !form.firstName) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData, form.firstName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form); // this will call add or update depending on context
    } catch (err) {
      console.error("Error submitting contact:", err);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              name="phone"
              type="text"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Street</label>
            <input
              name="street"
              type="text"
              className="form-control"
              value={form.street}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              name="city"
              type="text"
              className="form-control"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Province</label>
            <input
              name="province"
              type="text"
              className="form-control"
              value={form.province}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Postal Code</label>
            <input
              name="postalCode"
              type="text"
              className="form-control"
              value={form.postalCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {initialData?.firstName ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
}
