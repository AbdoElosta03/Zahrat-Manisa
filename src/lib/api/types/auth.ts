// Contracts from https://api-production-d8b2.up.railway.app/openapi.json.
// Optional nullable fields follow FastAPI's request/response definitions.
export interface LoginRequest {
  email?: string | null;
  phone_number?: string | null;
  password: string;
  remember_me?: boolean;
  device_name?: string | null;
}

export interface RegisterRequest {
  email?: string | null;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  date_of_birth?: string | null;
  image?: string | null;
  username?: string | null;
  phone_number?: string | null;
  terms_and_conditions: boolean;
}

export interface ConfirmRegistrationRequest {
  email?: string | null;
  phone_number?: string | null;
  otp: string;
}

export interface ForgotPasswordRequest {
  email?: string | null;
  phone_number?: string | null;
}

export interface TokenResponse {
  access_token: string;
  token_type?: string;
}

export interface LoginTermsRequiredResponse {
  requires_terms_acceptance?: true;
  transaction_token: string;
}

export interface MfaPublicMethod {
  id: string;
  type: string;
  label: string;
}

export interface MfaChallengeResponse {
  status?: "verification_required";
  challenge_token: string;
  expires_in: number;
  methods: MfaPublicMethod[];
  preferred_method: string | null;
  recovery_available: boolean;
}

// Login can require accepting terms or MFA instead of returning an access token.
export type LoginResult = TokenResponse | LoginTermsRequiredResponse | MfaChallengeResponse;

export interface RegisteredUser {
  id: string;
  username?: string | null;
  occupation?: string | null;
  employee_id?: string | null;
  email?: string | null;
  phone_number?: string | null;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  date_of_birth?: string | null;
  image?: string | null;
  account_type: "employee" | "customer";
  is_owner: boolean;
  is_blocked: boolean;
  /** Present on some user payloads (e.g. detail); list may omit it. */
  roles?: MyRole[];
}

export interface MyRole {
  id: string;
  name: string;
}

export interface MyProfile extends RegisteredUser {
  roles: MyRole[];
  permissions: string[];
}

export interface ForgotPasswordResponse {
  message: string;
}
