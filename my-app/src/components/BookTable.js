import { Link } from "react-router-dom";

export default function BookTable({ items, onDelete }) {
  return (
    <div className="card overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="th">Title</th>
            <th className="th">Author</th>
            <th className="th">Genre</th>
            <th className="th">Year</th>
            <th className="th">Status</th>
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((b) => (
            <tr key={b.id}>
              <td className="td">{b.title}</td>
              <td className="td">{b.author}</td>
              <td className="td">{b.genre}</td>
              <td className="td">{b.year}</td>
              <td className="td">
                <span
                  className={`badge ${
                    b.status === "Available" ? "badge-green" : "badge-yellow"
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="td space-x-2">
                <Link className="btn btn-secondary" to={`/books/${b.id}/edit`}>
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => onDelete(b)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
