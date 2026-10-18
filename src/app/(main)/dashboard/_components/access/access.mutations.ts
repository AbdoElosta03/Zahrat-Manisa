"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isMockApi } from "@/lib/api/client";
import { accessApi } from "@/lib/api/services/access";
import { authApi } from "@/lib/api/services/auth";
import type { RoleInput, UserUpdate } from "@/lib/api/types/access";
import { currentUserKey } from "@/lib/query/query-client";

import { accessKeys, usePermissions } from "./access.queries";

export function useAccessMutations() {
  const client = useQueryClient();
  const { ownerId } = usePermissions();
  const invalidate = async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: accessKeys.scope(ownerId) }),
      client.invalidateQueries({ queryKey: currentUserKey }),
    ]);
  };
  const options = { mutationKey: ["access", ownerId], onSuccess: invalidate };
  return {
    createUser: useMutation({ ...options, mutationFn: accessApi.createUser }),
    updateUser: useMutation({
      ...options,
      mutationFn: ({ id, input }: { id: string; input: UserUpdate }) => accessApi.updateUser(id, input),
    }),
    deleteUser: useMutation({ ...options, mutationFn: accessApi.deleteUser }),
    createRole: useMutation({ ...options, mutationFn: accessApi.createRole }),
    updateRole: useMutation({
      ...options,
      mutationFn: ({ id, input }: { id: string; input: RoleInput }) => accessApi.updateRole(id, input),
    }),
    deleteRole: useMutation({ ...options, mutationFn: accessApi.deleteRole }),
  };
}

export function useSessionMutations() {
  const client = useQueryClient();
  const reset = async () => {
    await client.cancelQueries();
    client.clear();
  };
  return {
    login: useMutation({
      mutationKey: ["session", "login"],
      mutationFn: (input: { email: string; password: string }) =>
        isMockApi ? accessApi.login(input) : authApi.login(input),
      onSuccess: async (result) => {
        if ("transaction_token" in result || "challenge_token" in result) return;
        const user = "access_token" in result ? await accessApi.currentUser() : result;
        await reset();
        client.setQueryData(currentUserKey, user);
      },
    }),
    logout: useMutation({
      mutationKey: ["session", "logout"],
      mutationFn: accessApi.logout,
      onSettled: async () => {
        await reset();
        client.setQueryData(currentUserKey, null);
      },
    }),
    switchAccount: useMutation({
      mutationKey: ["session", "switch"],
      mutationFn: accessApi.switchDemoAccount,
      onSuccess: async (user) => {
        await reset();
        client.setQueryData(currentUserKey, user);
      },
    }),
  };
}
