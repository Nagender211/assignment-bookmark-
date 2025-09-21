import { useNavigate, useParams } from "react-router-dom";
import { useBook, useCreateBook, useUpdateBook } from "../hooks/useBooks";
import { useEffect, useState } from "react";

const GENRES = ["Fiction", "Fantasy", "Programming", "Sci-Fi", "Non-Fiction"];
const STATUSES = ["Available", "Issued"];

export default function EditBook({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: existing, isLoading } = useBook(id);
  const create = useCreateBook();
  const update = useUpdateBook();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "Fiction",
    year: "",
    status: "Available",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && existing) {
      setForm({
        title: existing.title ?? "",
        author: existing.author ?? "",
        genre: existing.genre ?? "Fiction",
        year: String(existing.year ?? ""),
        status: existing.status ?? "Available",
      });
    }
  }, [mode, existing]);

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!GENRES.includes(form.genre)) e.genre = "Pick a valid genre";
    const year = Number(form.year);
    if (!Number.isInteger(year) || year < 1000 || year > 2100)
      e.year = "Enter a valid year";
    if (!STATUSES.includes(form.status)) e.status = "Pick a valid status";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (mode === "create") {
        await create.mutateAsync({
          title: form.title.trim(),
          author: form.author.trim(),
          genre: form.genre,
          year: Number(form.year),
          status: form.status,
        });
        window.showToast("Book created");
      } else {
        await update.mutateAsync({
          id,
          title: form.title.trim(),
          author: form.author.trim(),
          genre: form.genre,
          year: Number(form.year),
          status: form.status,
        });
        window.showToast("Book updated");
      }
      navigate("/");
    } catch (err) {
      window.showToast("Save failed", "error");
    }
  }

  if (mode === "edit" && isLoading) return <div className="card">Loading…</div>;

  return (
    <form onSubmit={onSubmit} className="card max-w-xl space-y-4">
      <h2 className="text-lg font-semibold">
        {mode === "create" ? "Add Book" : "Edit Book"}
      </h2>

      <div>
        <label className="label">Title</label>
        <input
          className="input"
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="label">Author</label>
        <input
          className="input"
          value={form.author}
          onChange={(e) => setField("author", e.target.value)}
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="label">Genre</label>
          <select
            className="select"
            value={form.genre}
            onChange={(e) => setField("genre", e.target.value)}
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="mt-1 text-sm text-red-600">{errors.genre}</p>
          )}
        </div>
        <div>
          <label className="label">Year</label>
          <input
            className="input"
            value={form.year}
            onChange={(e) => setField("year", e.target.value)}
          />
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year}</p>
          )}
        </div>
        <div>
          <label className="label">Status</label>
          <select
            className="select"
            value={form.status}
            onChange={(e) => setField("status", e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
