"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { type UsersParams, usersParamsSchema } from "@/lib/api/types/access";

export function useUsersFilters() {
  const searchParams = useSearchParams();
  const params = usersParamsSchema.parse({
    search: (searchParams.get("search") ?? "").slice(0, 200),
    status: ["active", "invited", "suspended"].includes(searchParams.get("status") ?? "")
      ? searchParams.get("status")
      : "all",
    roleId: searchParams.get("role") ?? "all",
    sort: ["-name", "lastActive"].includes(searchParams.get("sort") ?? "") ? searchParams.get("sort") : "name",
    page: searchParams.get("page") ?? 1,
    pageSize: searchParams.get("size") ?? 5,
  });
  const [search, setSearch] = useState(params.search);

  function update(patch: Partial<UsersParams>) {
    const url = new URL(window.location.href);
    const keys = { search: "search", status: "status", roleId: "role", sort: "sort", page: "page", pageSize: "size" };
    for (const [key, value] of Object.entries(patch)) {
      const name = keys[key as keyof UsersParams];
      if (value === "" || value === "all") url.searchParams.delete(name);
      else url.searchParams.set(name, String(value));
    }
    // Native history integrates with App Router without a server navigation per keystroke.
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  useEffect(() => setSearch(params.search), [params.search]);
  useEffect(() => {
    if (search === params.search) return;
    const timer = setTimeout(() => {
      const url = new URL(window.location.href);
      if (search.trim()) url.searchParams.set("search", search.trim());
      else url.searchParams.delete("search");
      url.searchParams.set("page", "1");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, params.search]);

  return { params, search, setSearch, update };
}
