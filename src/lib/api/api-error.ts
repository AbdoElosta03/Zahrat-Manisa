import axios from "axios";
import { z } from "zod";

const errorBodySchema = z.object({
  message: z.string().optional(),
  detail: z
    .union([z.string(), z.array(z.object({ loc: z.array(z.union([z.string(), z.number()])), msg: z.string() }))])
    .optional(),
  fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
});

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly fieldErrors: Record<string, string[]> = {},
  ) {
    super(message);
    this.name = "ApiError";
  }
}
//function to convert any error to an ApiError, if it is not already one. This is useful for normalizing errors from axios requests.
export function normalizeApiError(error: unknown): Error {
  if (error instanceof ApiError) return error;
  if (axios.isCancel(error)) return error instanceof Error ? error : new ApiError("Request cancelled.", 0);
  if (axios.isAxiosError<unknown>(error)) {
    const parsed = errorBodySchema.safeParse(error.response?.data);
    const body = parsed.success ? parsed.data : undefined;
    const detail = Array.isArray(body?.detail)
      ? body.detail.map((item) => `${item.loc.slice(1).join(".")}: ${item.msg}`).join("; ")
      : body?.detail;
    return new ApiError(
      body?.message ?? detail ?? (error.response ? "The request failed." : "Unable to reach the API."),
      error.response?.status ?? 0,
      body?.fieldErrors,
    );
  }
  return error instanceof Error ? error : new ApiError("Unexpected request error.", 0);
}
//function for displaying the error message into alert or toast
export function getApiErrorMessage(error: unknown) {
  return normalizeApiError(error).message;
}
