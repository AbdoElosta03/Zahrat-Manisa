"use client";

import { T, V } from "@/i18n/t";
import { useState } from "react";

import { Plus, Trash2, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/i18n/language-provider";

import type { DocumentStatus, Passenger, PassengerType } from "./types";

const typeLabels: Record<PassengerType, string> = { adult: "Adult", child: "Child", infant: "Infant" };
const documentConfig: Record<DocumentStatus, { label: string; className: string }> = {
  verified: { label: "Verified", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  missing: { label: "Missing", className: "bg-red-500/10 text-red-600 dark:text-red-400" },
};

function initialsFor(name: string) {
  return name
    .trim()
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PassengersStep({
  passengers,
  onAdd,
  onRemove,
}: {
  passengers: Passenger[];
  onAdd: (passenger: Omit<Passenger, "id">) => void;
  onRemove: (id: string) => void;
}) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [type, setType] = useState<PassengerType>("adult");
  const [age, setAge] = useState("");
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>("pending");

  const adults = passengers.filter((passenger) => passenger.type === "adult").length;
  const children = passengers.filter((passenger) => passenger.type !== "adult").length;

  function handleAdd() {
    if (!name.trim() || !age.trim()) return;
    onAdd({
      name: name.trim(),
      initials: initialsFor(name.trim()),
      type,
      age: Number(age),
      documentStatus,
    });
    setName("");
    setAge("");
    setType("adult");
    setDocumentStatus("pending");
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg"><T id="bookings.passengers" /></h2>
        <p className="text-muted-foreground text-sm"><T id="bookings.addEveryoneTravelingOnThisBooking" /></p>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-muted/30 px-4 py-3 text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          <Users className="size-4 text-muted-foreground" />
          {passengers.length} <T id="bookings.total2" />
        </span>
        <span className="text-muted-foreground">{t("bookings.partyLine", { adults, children })}</span>
      </div>

      {passengers.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle><T id="bookings.noPassengersYet" /></EmptyTitle>
            <EmptyDescription><T id="bookings.addAtLeastOnePassengerToContinue" /></EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-2">
          {passengers.map((passenger) => {
            const document = documentConfig[passenger.documentStatus];
            return (
              <Card key={passenger.id} className="gap-0 py-0">
                <CardContent className="flex items-center gap-3 p-3">
                  <Avatar>
                    <AvatarFallback>{passenger.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate font-medium text-sm">
                      {passenger.name}
                      {passenger.isPrimary ? (
                        <span className="ml-1.5 text-muted-foreground text-xs"><T id="bookings.primaryTraveler" /></span>
                      ) : null}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {typeLabels[passenger.type]} <T id="bookings.middotAge" /> {passenger.age}
                    </span>
                  </div>
                  <Badge className={document.className}><V scope="bookings" text={document.label} /></Badge>
                  {!passenger.isPrimary ? (
                    <Button variant="ghost" size="icon-sm" onClick={() => onRemove(passenger.id)}>
                      <Trash2 className="text-muted-foreground" />
                      <span className="sr-only"><T id="bookings.removePassenger" /></span>
                    </Button>
                  ) : (
                    <div className="size-7" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card>
        <CardContent className="flex flex-col gap-4 p-4">
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="passenger-name"><T id="bookings.fullName" /></FieldLabel>
                <Input
                  id="passenger-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Rana Idris"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="passenger-age"><T id="bookings.age" /></FieldLabel>
                <Input
                  id="passenger-age"
                  type="number"
                  min={0}
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="e.g. 32"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="passenger-type"><T id="bookings.type" /></FieldLabel>
                <Select value={type} onValueChange={(value) => setType(value as PassengerType)}>
                  <SelectTrigger id="passenger-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult"><T id="bookings.adult2" /></SelectItem>
                    <SelectItem value="child"><T id="bookings.child2" /></SelectItem>
                    <SelectItem value="infant"><T id="bookings.infant" /></SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="passenger-document"><T id="bookings.documentStatus" /></FieldLabel>
                <Select value={documentStatus} onValueChange={(value) => setDocumentStatus(value as DocumentStatus)}>
                  <SelectTrigger id="passenger-document" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified"><T id="bookings.verified" /></SelectItem>
                    <SelectItem value="pending"><T id="bookings.pending" /></SelectItem>
                    <SelectItem value="missing"><T id="bookings.missing" /></SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FieldGroup>
          <Button className="w-fit" onClick={handleAdd} disabled={!name.trim() || !age.trim()}>
            <Plus data-icon="inline-start" />
            <T id="bookings.addPassenger" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
