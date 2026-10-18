"use client";

import { useQuery } from "@tanstack/react-query";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { authApi } from "@/lib/api/services/auth";

export function MyProfileDetails() {
  const { data: profile, isPending, isError, error, refetch } = useQuery({
    queryKey: ["session", "my-profile"],
    queryFn: ({ signal }) => authApi.getMyProfile(signal),
  });

  if (isPending) return <Skeleton className="h-64 w-full" />;
  if (isError) return (
    <Alert variant="destructive">
      <AlertTitle>Unable to load your profile</AlertTitle>
      <AlertDescription className="flex flex-col items-start gap-3">
        {getApiErrorMessage(error)}
        <Button variant="outline" onClick={() => void refetch()}>Try again</Button>
      </AlertDescription>
    </Alert>
  );

  const name = `${profile.first_name} ${profile.last_name}`.trim();
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <h1 className="text-2xl font-semibold">My profile</h1>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            {profile.image && <AvatarImage src={profile.image} alt={name} />}
            <AvatarFallback>{profile.first_name[0]}{profile.last_name[0]}</AvatarFallback>
          </Avatar>
          <div><CardTitle>{name}</CardTitle><p className="text-sm text-muted-foreground">{profile.occupation ?? profile.account_type}</p></div>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div><dt className="text-muted-foreground">Email</dt><dd>{profile.email ?? "—"}</dd></div>
            <div><dt className="text-muted-foreground">Phone</dt><dd>{profile.phone_number ?? "—"}</dd></div>
            <div><dt className="text-muted-foreground">Username</dt><dd>{profile.username ?? "—"}</dd></div>
            <div><dt className="text-muted-foreground">Employee ID</dt><dd>{profile.employee_id ?? "—"}</dd></div>
            <div><dt className="text-muted-foreground">Account</dt><dd>{profile.account_type}</dd></div>
            <div><dt className="text-muted-foreground">Roles</dt><dd>{profile.roles.map((role) => role.name).join(", ") || "—"}</dd></div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
