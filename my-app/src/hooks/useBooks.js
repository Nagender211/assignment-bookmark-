import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

function buildParams({ page, limit, search, genre, status }) {
  const params = new URLSearchParams();
  if (page) params.set("_page", String(page));
  if (limit) params.set("_limit", String(limit));
  if (search) params.set("q", search);
  if (genre) params.set("genre", genre);
  if (status) params.set("status", status);
  return params.toString();
}

export function useBooks({ page, limit = 10, search, genre, status }) {
  return useQuery({
    queryKey: ["books", { page, limit, search, genre, status }],
    queryFn: async () => {
      const qs = buildParams({ page, limit, search, genre, status });
      const res = await api.get(`/books?${qs}`);
      const total = Number(
        res.headers["x-total-count"] ?? res.data.length ?? 0
      );
      return { items: res.data, total };
    },
    keepPreviousData: true,
  });
}

export function useBook(id) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => (await api.get(`/books/${id}`)).data,
    enabled: !!id,
  });
}

export function useCreateBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.post("/books", payload).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}

export function useUpdateBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) =>
      api.put(`/books/${id}`, payload).then((r) => r.data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["books"] });
      qc.invalidateQueries({ queryKey: ["book", vars.id] });
    },
  });
}

export function useDeleteBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/books/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}
