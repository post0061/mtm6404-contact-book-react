import { Link } from "react-router-dom";

function ContactCard({ contact }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-0">
            {contact.firstName} {contact.lastName}
          </h5>
          <small className="text-muted">{contact.email}</small>
        </div>
        <Link
          to={`/contact/${contact.id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ContactCard;
