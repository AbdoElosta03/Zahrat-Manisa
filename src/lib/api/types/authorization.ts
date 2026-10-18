import type { Page } from "@/lib/api/types/users";

export interface PermissionResponse {
  id: string;
  name: string;
  description: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
}

export interface RoleWithPermissionsResponse extends RoleResponse {
  permissions: PermissionResponse[];
}

export interface CreateRoleRequest {
  name: string;
  description: string;
}

export interface RolePermissionsRequest {
  permission_ids: string[];
}

export type RolesPage = Page<RoleWithPermissionsResponse>;
export type PermissionsPage = Page<PermissionResponse>;
