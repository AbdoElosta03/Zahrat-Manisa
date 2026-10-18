import { apiClient, clearAccessToken, setAccessToken } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type {
  ConfirmRegistrationRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResult,
  MyProfile,
  RegisteredUser,
  RegisterRequest,
} from "@/lib/api/types/auth";

/** Real FastAPI auth. Use with NEXT_PUBLIC_API_MODE=python and NEXT_PUBLIC_API_URL set to the API origin. */
export const authApi = {
  async login(input: LoginRequest): Promise<LoginResult> {
    const { data } = await apiClient.post<LoginResult>(endpoints.authV1.login, input);
    if ("access_token" in data) setAccessToken(data.access_token);
    return data;
  },
  async register(input: RegisterRequest): Promise<unknown> {
    // Swagger does not specify the success response schema for this endpoint.
    return (await apiClient.post<unknown>(endpoints.authV1.register, input)).data;
  },
  async confirmRegister(input: ConfirmRegistrationRequest): Promise<RegisteredUser> {
    return (await apiClient.post<RegisteredUser>(endpoints.authV1.confirmRegister, input)).data;
  },
  async forgotPassword(input: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return (await apiClient.post<ForgotPasswordResponse>(endpoints.authV1.forgotPassword, input)).data;
  },
  async getMyProfile(signal?: AbortSignal): Promise<MyProfile> {
    return (await apiClient.get<MyProfile>(endpoints.authV1.me, { signal })).data;
  },
  async logout(): Promise<void> {
    try {
      await apiClient.post(endpoints.authV1.logout);
    } finally {
      clearAccessToken();
    }
  },
};
