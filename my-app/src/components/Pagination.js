import { useSearchParams } from "react-router-dom";

export default function Pagination({ total, limit = 10 }) {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") ?? "1");
  const totalPages = Math.max(1, Math.ceil(total / limit));

  function goto(p) {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    setParams(next);
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </div>
      <div className="space-x-2">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => goto(page - 1)}
        >
          Prev
        </button>
        <button
          className="btn btn-secondary"
          disabled={page >= totalPages}
          onClick={() => goto(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
