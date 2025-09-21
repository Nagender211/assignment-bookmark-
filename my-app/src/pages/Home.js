import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BookFilters from "../components/BookFilters";
import BookTable from "../components/BookTable";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import { useBooks, useDeleteBook } from "../hooks/useBooks";

export default function Home() {
  const [params] = useSearchParams();
  const page = Number(params.get("page") ?? "1");
  const search = params.get("search") ?? "";
  const genre = params.get("genre") ?? "";
  const status = params.get("status") ?? "";

  const { data, isLoading, isError } = useBooks({
    page,
    limit: 10,
    search,
    genre,
    status,
  });
  const del = useDeleteBook();

  const [confirm, setConfirm] = useState({ open: false, book: null });

  function askDelete(book) {
    setConfirm({ open: true, book });
  }

  async function confirmDelete() {
    try {
      await del.mutateAsync(confirm.book.id);
      window.showToast("Book deleted");
    } catch (e) {
      window.showToast("Delete failed", "error");
    } finally {
      setConfirm({ open: false, book: null });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Books</h1>
        <Link className="btn btn-primary" to="/books/new">
          Add Book
        </Link>
      </div>

      <BookFilters />

      {isLoading && <div className="card">Loading…</div>}
      {isError && <div className="card text-red-600">Failed to load.</div>}

      {data && (
        <>
          <BookTable items={data.items} onDelete={askDelete} />
          <Pagination total={data.total} limit={10} />
        </>
      )}

      <ConfirmDialog
        open={confirm.open}
        title="Delete book?"
        message={
          confirm.book
            ? `Delete "${confirm.book.title}" by ${confirm.book.author}?`
            : ""
        }
        onCancel={() => setConfirm({ open: false, book: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
