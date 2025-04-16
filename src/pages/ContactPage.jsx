import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/db";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContact({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error getting document:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirm) return;
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );

  if (!contact) return <p className="text-danger">Contact not found.</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
        <hr />

        {contact.email && (
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
        )}

        {contact.phone && (
          <p>
            <strong>Phone:</strong> {contact.phone}
          </p>
        )}

        {(contact.street ||
          contact.city ||
          contact.province ||
          contact.postalCode) && (
          <div>
            <strong>Address:</strong>
            <p className="mb-0">{contact.street}</p>
            <p className="mb-0">
              {contact.city}, {contact.province}
            </p>
            <p>{contact.postalCode}</p>
          </div>
        )}

        <div className="mt-4 d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
