"use client";

import { useEffect, useState } from "react";

import { initialRoles, initialUsers, type TeamRole, type TeamUser } from "./access-data";

const USERS_KEY = "manisa-team-users";
const ROLES_KEY = "manisa-team-roles-v2";

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useAccessData() {
  const [users, setUsers] = useState<TeamUser[]>(initialUsers);
  const [roles, setRoles] = useState<TeamRole[]>(initialRoles);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUsers(readStored(USERS_KEY, initialUsers));
    setRoles(readStored(ROLES_KEY, initialRoles));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [ready, users]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }, [ready, roles]);

  return { users, setUsers, roles, setRoles, ready };
}
