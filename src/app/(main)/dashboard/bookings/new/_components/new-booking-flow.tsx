"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { BookingStepper } from "./booking-stepper";
import { BookingSummary } from "./booking-summary";
import { ConfirmationStep } from "./confirmation-step";
import { PassengersStep } from "./passengers-step";
import { PaymentStep } from "./payment-step";
import { ReviewStep } from "./review-step";
import { TravelerStep } from "./traveler-step";
import travelersData from "./travelers-mock.json";
import { TripStep } from "./trip-step";
import tripsData from "./trips-mock.json";
import type { BookingDraft, ExistingTraveler, Passenger, TripOption } from "./types";
import { STEPS } from "./types";

const initialTravelers = travelersData as ExistingTraveler[];
const trips = tripsData as TripOption[];

let travelerIdCounter = initialTravelers.length + 1;
let passengerIdCounter = 1;

function generateBookingId() {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `#BK-${suffix}`;
}

export function NewBookingFlow() {
  const [travelers, setTravelers] = useState<ExistingTraveler[]>(initialTravelers);
  const [stepIndex, setStepIndex] = useState(0);
  const [maxReachedIndex, setMaxReachedIndex] = useState(0);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [draft, setDraft] = useState<BookingDraft>({
    traveler: null,
    trip: null,
    passengers: [],
    discount: 0,
    taxesFees: 0,
    paidAmount: 0,
    paymentMethod: "cash",
  });

  const currentKey = STEPS[stepIndex]?.key;

  const canProceed = useMemo(() => {
    switch (currentKey) {
      case "traveler":
        return draft.traveler !== null;
      case "trip":
        return draft.trip !== null;
      case "passengers":
        return draft.passengers.length > 0;
      case "payment":
        return true;
      case "review":
        return true;
      default:
        return true;
    }
  }, [currentKey, draft]);

  function goToStep(index: number) {
    setStepIndex(index);
    setMaxReachedIndex((prev) => Math.max(prev, index));
  }

  function handleSelectTraveler(traveler: ExistingTraveler) {
    setDraft((prev) => {
      const nextPassengers = prev.passengers.filter((passenger) => !passenger.isPrimary);
      const primaryPassenger: Passenger = {
        id: `primary-${traveler.id}`,
        name: traveler.name,
        initials: traveler.initials,
        type: "adult",
        age: 30,
        documentStatus: "verified",
        isPrimary: true,
      };
      return { ...prev, traveler, passengers: [primaryPassenger, ...nextPassengers] };
    });
  }

  function handleCreateTraveler(newTraveler: Omit<ExistingTraveler, "id" | "previousBookings">) {
    const traveler: ExistingTraveler = {
      ...newTraveler,
      id: `trv-new-${travelerIdCounter++}`,
      previousBookings: 0,
    };
    setTravelers((prev) => [traveler, ...prev]);
    handleSelectTraveler(traveler);
  }

  function handleSelectTrip(trip: TripOption) {
    setDraft((prev) => ({ ...prev, trip }));
  }

  function handleAddPassenger(passenger: Omit<Passenger, "id">) {
    setDraft((prev) => ({
      ...prev,
      passengers: [...prev.passengers, { ...passenger, id: `pax-${passengerIdCounter++}` }],
    }));
  }

  function handleRemovePassenger(id: string) {
    setDraft((prev) => ({ ...prev, passengers: prev.passengers.filter((passenger) => passenger.id !== id) }));
  }

  function handleNext() {
    if (currentKey === "review") {
      setBookingId(generateBookingId());
      goToStep(stepIndex + 1);
      return;
    }
    if (stepIndex < STEPS.length - 1) goToStep(stepIndex + 1);
  }

  function handleBack() {
    if (stepIndex > 0) goToStep(stepIndex - 1);
  }

  function handleCreateAnother() {
    setDraft({
      traveler: null,
      trip: null,
      passengers: [],
      discount: 0,
      taxesFees: 0,
      paidAmount: 0,
      paymentMethod: "cash",
    });
    setBookingId(null);
    setStepIndex(0);
    setMaxReachedIndex(0);
  }

  const isConfirmation = currentKey === "confirmation";

  return (
    <div className="flex flex-col gap-6">
      {!isConfirmation ? (
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="/dashboard/bookings">
              <ArrowLeft />
              <span className="sr-only">Back to bookings</span>
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold text-2xl tracking-tight">New Booking</h1>
            <p className="text-muted-foreground text-sm">Create a booking for a traveler in a few steps.</p>
          </div>
        </div>
      ) : null}

      {!isConfirmation ? (
        <Card>
          <CardContent className="p-4">
            <BookingStepper currentIndex={stepIndex} maxReachedIndex={maxReachedIndex} onStepClick={goToStep} />
          </CardContent>
        </Card>
      ) : null}

      <div className={isConfirmation ? "" : "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]"}>
        <Card>
          <CardContent className="p-4 sm:p-6">
            {currentKey === "traveler" ? (
              <TravelerStep
                travelers={travelers}
                selected={draft.traveler}
                onSelect={handleSelectTraveler}
                onCreateTraveler={handleCreateTraveler}
              />
            ) : null}
            {currentKey === "trip" ? (
              <TripStep trips={trips} selected={draft.trip} onSelect={handleSelectTrip} />
            ) : null}
            {currentKey === "passengers" ? (
              <PassengersStep
                passengers={draft.passengers}
                onAdd={handleAddPassenger}
                onRemove={handleRemovePassenger}
              />
            ) : null}
            {currentKey === "payment" ? (
              <PaymentStep
                tripPrice={draft.trip?.price ?? 0}
                passengerCount={draft.passengers.length}
                discount={draft.discount}
                taxesFees={draft.taxesFees}
                paidAmount={draft.paidAmount}
                paymentMethod={draft.paymentMethod}
                onDiscountChange={(discount) => setDraft((prev) => ({ ...prev, discount }))}
                onTaxesFeesChange={(taxesFees) => setDraft((prev) => ({ ...prev, taxesFees }))}
                onPaidAmountChange={(paidAmount) => setDraft((prev) => ({ ...prev, paidAmount }))}
                onPaymentMethodChange={(paymentMethod) => setDraft((prev) => ({ ...prev, paymentMethod }))}
              />
            ) : null}
            {currentKey === "review" ? <ReviewStep draft={draft} onEditStep={goToStep} /> : null}
            {currentKey === "confirmation" && bookingId ? (
              <ConfirmationStep bookingId={bookingId} draft={draft} onCreateAnother={handleCreateAnother} />
            ) : null}

            {!isConfirmation ? (
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <Button variant="outline" onClick={handleBack} disabled={stepIndex === 0}>
                  <ArrowLeft data-icon="inline-start" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!canProceed}>
                  {currentKey === "review" ? "Create booking" : "Continue"}
                  {currentKey !== "review" ? <ArrowRight data-icon="inline-end" /> : null}
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {!isConfirmation ? (
          <div className="hidden lg:block">
            <BookingSummary draft={draft} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
