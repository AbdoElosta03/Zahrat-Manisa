"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isMockApi } from "@/lib/api/client";
import { accessApi } from "@/lib/api/services/access";
import { authApi } from "@/lib/api/services/auth";
import type { CurrentUser, RoleInput, UserUpdate } from "@/lib/api/types/access";
import type { LoginResult } from "@/lib/api/types/auth";
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
    login: useMutation<LoginResult | CurrentUser, Error, { email: string; password: string; remember_me?: boolean }>({
      mutationKey: ["session", "login"],
      mutationFn: (input) =>
        isMockApi
          ? accessApi.login({ email: input.email, password: input.password })
          : authApi.login({
              email: input.email,
              password: input.password,
              remember_me: input.remember_me,
            }),
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
