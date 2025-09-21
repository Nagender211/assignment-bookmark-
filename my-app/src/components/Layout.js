import { Link } from "react-router-dom";
import Toast from "./Toast";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold">
            Book Dashboard
          </Link>
          <nav className="text-sm text-gray-600">
            <a
              href="https://github.com/typicode/json-server"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline"
            >
              json-server docs
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

      <Toast />
    </div>
  );
}
