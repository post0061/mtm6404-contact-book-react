import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/db";
import { Link } from "react-router-dom";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    data.sort((a, b) => a.lastName.localeCompare(b.lastName));
    setContacts(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      await deleteDoc(doc(db, "contacts", id));
      fetchContacts();
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <input
        className="form-control mb-3"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map((contact) => (
        <div
          key={contact.id}
          className="card mb-2 p-3 d-flex flex-row justify-content-between align-items-center"
        >
          <Link to={`/contact/${contact.id}`} className="text-decoration-none">
            <h5 className="mb-1 d-inline">
              {contact.firstName} {contact.lastName}
            </h5>
          </Link>
          <div>
            <Link to={`/edit/${contact.id}`} className="btn btn-warning me-2">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(contact.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
