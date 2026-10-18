import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type {
  CreateRoleRequest,
  PermissionResponse,
  RolePermissionsRequest,
  RoleResponse,
  RoleWithPermissionsResponse,
} from "@/lib/api/types/authorization";
import type { Page } from "@/lib/api/types/users";

async function getAllPages<T>(url: string, signal?: AbortSignal): Promise<T[]> {
  const first = (await apiClient.get<Page<T>>(url, { params: { page: 1, size: 100 }, signal })).data;
  const items = [...first.items];
  for (let page = 2; page <= first.pages; page++) {
    const response = await apiClient.get<Page<T>>(url, { params: { page, size: 100 }, signal });
    items.push(...response.data.items);
  }
  return items;
}

export const authorizationApi = {
  roles(signal?: AbortSignal): Promise<RoleWithPermissionsResponse[]> {
    return getAllPages(endpoints.rolesV1.list, signal);
  },
  permissions(signal?: AbortSignal): Promise<PermissionResponse[]> {
    return getAllPages(endpoints.rolesV1.permissions, signal);
  },
  async createRole(input: CreateRoleRequest): Promise<RoleResponse> {
    return (await apiClient.post<RoleResponse>(endpoints.rolesV1.list, input)).data;
  },
  async deleteRole(id: string): Promise<void> {
    await apiClient.delete(endpoints.rolesV1.detail(id));
  },
  async addPermissions(roleId: string, permissionIds: string[]): Promise<void> {
    const body: RolePermissionsRequest = { permission_ids: permissionIds };
    await apiClient.post(endpoints.rolesV1.rolePermissions(roleId), body);
  },
  async removePermissions(roleId: string, permissionIds: string[]): Promise<void> {
    const body: RolePermissionsRequest = { permission_ids: permissionIds };
    await apiClient.delete(endpoints.rolesV1.rolePermissions(roleId), { data: body });
  },
};
