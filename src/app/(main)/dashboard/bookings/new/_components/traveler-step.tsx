"use client";

import { useState } from "react";

import { Check, Plus, Search, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { ExistingTraveler } from "./types";

export function TravelerStep({
  travelers,
  selected,
  onSelect,
  onCreateTraveler,
}: {
  travelers: ExistingTraveler[];
  selected: ExistingTraveler | null;
  onSelect: (traveler: ExistingTraveler) => void;
  onCreateTraveler: (traveler: Omit<ExistingTraveler, "id" | "previousBookings">) => void;
}) {
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = travelers.filter(
    (traveler) =>
      query.length === 0 ||
      traveler.name.toLowerCase().includes(query) ||
      traveler.email.toLowerCase().includes(query) ||
      traveler.phone.toLowerCase().includes(query),
  );

  function handleCreate() {
    if (!newName.trim() || !newPhone.trim() || !newEmail.trim()) return;
    onCreateTraveler({
      name: newName.trim(),
      initials: newName
        .trim()
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      phone: newPhone.trim(),
      email: newEmail.trim(),
      country: newCountry.trim() || "—",
    });
    setNewName("");
    setNewPhone("");
    setNewEmail("");
    setNewCountry("");
    setIsCreating(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg">Select a traveler</h2>
        <p className="text-muted-foreground text-sm">Choose an existing traveler or create a new one.</p>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, phone, or email..."
          className="pl-8"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((traveler) => {
          const isSelected = selected?.id === traveler.id;
          return (
            <button key={traveler.id} type="button" onClick={() => onSelect(traveler)} className="text-left">
              <Card
                className={`gap-0 py-0 transition-colors ${isSelected ? "border-primary ring-1 ring-primary" : "hover:border-foreground/20"}`}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <Avatar size="lg">
                    <AvatarFallback>{traveler.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-sm">{traveler.name}</span>
                      {isSelected ? (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-3" />
                        </span>
                      ) : null}
                    </div>
                    <span className="truncate text-muted-foreground text-xs">{traveler.phone}</span>
                    <span className="truncate text-muted-foreground text-xs">{traveler.email}</span>
                    <span className="text-muted-foreground text-xs">
                      {traveler.country} &middot; {traveler.previousBookings} previous booking
                      {traveler.previousBookings === 1 ? "" : "s"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserRound />
            </EmptyMedia>
            <EmptyTitle>No travelers found</EmptyTitle>
            <EmptyDescription>Try a different search, or create a new traveler below.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}

      {isCreating ? (
        <Card>
          <CardContent className="flex flex-col gap-4 p-4">
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="new-traveler-name">Full name</FieldLabel>
                  <Input
                    id="new-traveler-name"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    placeholder="e.g. Rana Idris"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="new-traveler-phone">Phone</FieldLabel>
                  <Input
                    id="new-traveler-phone"
                    value={newPhone}
                    onChange={(event) => setNewPhone(event.target.value)}
                    placeholder="+90 5xx xxx xxxx"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="new-traveler-email">Email</FieldLabel>
                  <Input
                    id="new-traveler-email"
                    type="email"
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                    placeholder="name@example.com"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="new-traveler-country">Country</FieldLabel>
                  <Input
                    id="new-traveler-country"
                    value={newCountry}
                    onChange={(event) => setNewCountry(event.target.value)}
                    placeholder="e.g. Turkiye"
                  />
                </Field>
              </div>
            </FieldGroup>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleCreate}
                disabled={!newName.trim() || !newPhone.trim() || !newEmail.trim()}
              >
                Add traveler
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" className="w-fit" onClick={() => setIsCreating(true)}>
          <Plus data-icon="inline-start" />
          Create new traveler
        </Button>
      )}
    </div>
  );
}
