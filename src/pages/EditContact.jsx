import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/db";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ContactForm from "../components/ContactForm";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docSnap = await getDoc(doc(db, "contacts", id));
        if (docSnap.exists()) {
          setContact(docSnap.data());
        } else {
          alert("Contact not found.");
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to fetch contact:", err);
      }
    };
    fetchContact();
  }, [id, navigate]);

  const handleUpdate = async (data) => {
    try {
      await updateDoc(doc(db, "contacts", id), data);
      alert("Contact updated!");
      navigate(`/contact/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Contact</h2>
      {contact ? (
        <ContactForm initialData={contact} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
