import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/db";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";

export default function AddContact() {
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    const docRef = await addDoc(collection(db, "contacts"), data);
    navigate(`/contact/${docRef.id}`);
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <ContactForm onSubmit={handleAdd} />
    </div>
  );
}
