
// Import TanStack Query core classes.
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

// Import the custom API error class.
import { ApiError } from "@/lib/api/api-error";

// Define a unique cache key for the current user.
export const currentUserKey = ["session", "current-user"] as const;

// Create and configure a new QueryClient.
export function createQueryClient() {
  // Declare the QueryClient instance.
  let client: QueryClient;

  // Handle session expiration on HTTP 401 errors.
  const expireSession = (error: unknown) => {
    // Ignore non-ApiError errors and non-401 responses.
    if (!(error instanceof ApiError) || error.status !== 401) return;

    // Clear the current user from the cache.
    client.setQueryData(currentUserKey, null);

    // Cancel all ongoing access-related queries.
    void client.cancelQueries({ queryKey: ["access"] }).then(() => {
      // Remove cached access-related data.
      client.removeQueries({ queryKey: ["access"] });
    });
  };

  // Initialize QueryClient with global configurations.
  client = new QueryClient({
    // Handle errors from all queries globally.
    queryCache: new QueryCache({
      onError: expireSession,
    }),

    // Handle errors from all mutations globally.
    mutationCache: new MutationCache({
      onError: expireSession,
    }),

    // Define default behavior for queries and mutations.
    defaultOptions: {
      queries: {
        // Keep data fresh for 30 seconds.
        staleTime: 30000,

        // Remove inactive queries after 5 minutes.
        gcTime: 5 * 60 * 1000,

        // Refetch stale data when the window regains focus.
        refetchOnWindowFocus: true,

        // Control automatic retries after query failures.
        retry: (failureCount, error) => {
          // Do not retry HTTP 4xx client errors.
          if (
            error instanceof ApiError &&
            error.status > 0 &&
            error.status < 500
          ) return false;

          // Allow only one retry for other errors.
          return failureCount < 1;
        },
      },

      // Disable automatic retries for mutations.
      mutations: {
        retry: false,
      },
    },
  });

  // Return the configured QueryClient instance.
  return client;
}
