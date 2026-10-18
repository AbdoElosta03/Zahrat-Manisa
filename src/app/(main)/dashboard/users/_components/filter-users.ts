import type { User } from "@/lib/api/types/users";

export type UsersUiStatus = "all" | "active" | "invited" | "suspended";

/** Dashboard team directory: staff accounts and the workspace owner. */
export function isTeamDirectoryUser(user: User): boolean {
  return user.account_type === "employee" || user.is_owner;
}

export function filterUsers(
  users: User[],
  {
    search,
    status,
    accountType,
  }: {
    search: string;
    status: UsersUiStatus;
    accountType: "all" | "employee" | "customer" | "owner";
  },
): User[] {
  const query = search.trim().toLowerCase();

  return users.filter((user) => {
    if (accountType === "employee" && !isTeamDirectoryUser(user)) return false;
    if (accountType === "owner" && !user.is_owner) return false;
    if (accountType === "customer" && user.account_type !== "customer") return false;

    if (status === "active" && user.is_blocked) return false;
    if (status === "suspended" && !user.is_blocked) return false;
    if (status === "invited") return false;

    if (!query) return true;

    const haystack = [user.first_name, user.last_name, user.email, user.phone_number, user.username]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function userDirectoryStats(users: User[], total: number) {
  return {
    total,
    active: users.filter((user) => !user.is_blocked).length,
    pending: 0,
    suspended: users.filter((user) => user.is_blocked).length,
  };
}

export function filterUsersByRoleId(users: User[], roleId: string): User[] {
  if (roleId === "all") return users;
  return users.filter((user) => user.roles?.some((role) => role.id === roleId));
}
