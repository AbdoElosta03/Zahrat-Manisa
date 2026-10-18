"use client";

import { Banknote, Building2, CreditCard, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useI18n } from "@/i18n/language-provider";
import { T } from "@/i18n/t";

import type { PaymentMethod } from "./types";

export function PaymentStep({
  tripPrice,
  passengerCount,
  discount,
  taxesFees,
  paidAmount,
  paymentMethod,
  onDiscountChange,
  onTaxesFeesChange,
  onPaidAmountChange,
  onPaymentMethodChange,
}: {
  tripPrice: number;
  passengerCount: number;
  discount: number;
  taxesFees: number;
  paidAmount: number;
  paymentMethod: PaymentMethod;
  onDiscountChange: (value: number) => void;
  onTaxesFeesChange: (value: number) => void;
  onPaidAmountChange: (value: number) => void;
  onPaymentMethodChange: (value: PaymentMethod) => void;
}) {
  const { formatCurrency, t } = useI18n();
  const subtotal = tripPrice * passengerCount;
  const total = Math.max(0, subtotal - discount + taxesFees);
  const remaining = Math.max(0, total - paidAmount);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg">
          <T id="bookings.payment" />
        </h2>
        <p className="text-muted-foreground text-sm">
          <T id="bookings.setPricingAndCollectAnInitialPayment" />
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("bookings.tripPriceLine", { count: passengerCount })}</span>
            <span className="tabular-nums">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              <T id="bookings.discount" />
            </span>
            <span className="tabular-nums text-red-600 dark:text-red-400">
              {discount > 0 ? `- ${formatCurrency(discount)}` : formatCurrency(0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              <T id="bookings.taxesFees" />
            </span>
            <span className="tabular-nums">{formatCurrency(taxesFees)}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-3 font-semibold">
            <span>
              <T id="bookings.total" />
            </span>
            <span className="tabular-nums">{formatCurrency(total)}</span>
          </div>
        </CardContent>
      </Card>

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="discount">
              <T id="bookings.discount" />
            </FieldLabel>
            <Input
              id="discount"
              type="number"
              min={0}
              value={discount === 0 ? "" : discount}
              onChange={(event) => onDiscountChange(Number(event.target.value) || 0)}
              placeholder="0"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="taxes-fees">
              <T id="bookings.taxesFees" />
            </FieldLabel>
            <Input
              id="taxes-fees"
              type="number"
              min={0}
              value={taxesFees === 0 ? "" : taxesFees}
              onChange={(event) => onTaxesFeesChange(Number(event.target.value) || 0)}
              placeholder="0"
            />
          </Field>
        </div>
      </FieldGroup>

      <Field>
        <FieldLabel>
          <T id="bookings.paymentMethod" />
        </FieldLabel>
        <ToggleGroup
          type="single"
          variant="outline"
          value={paymentMethod}
          onValueChange={(value) => value && onPaymentMethodChange(value as PaymentMethod)}
          className="w-full"
        >
          <ToggleGroupItem value="cash" className="flex-1 gap-1.5">
            <Banknote data-icon="inline-start" />
            <T id="bookings.cash" />
          </ToggleGroupItem>
          <ToggleGroupItem value="bank-transfer" className="flex-1 gap-1.5">
            <Building2 data-icon="inline-start" />
            <T id="bookings.bankTransfer" />
          </ToggleGroupItem>
          <ToggleGroupItem value="card" className="flex-1 gap-1.5">
            <CreditCard data-icon="inline-start" />
            <T id="bookings.card" />
          </ToggleGroupItem>
          <ToggleGroupItem value="other" className="flex-1 gap-1.5">
            <Wallet data-icon="inline-start" />
            <T id="bookings.other" />
          </ToggleGroupItem>
        </ToggleGroup>
      </Field>

      <Field>
        <FieldLabel htmlFor="paid-amount">
          <T id="bookings.amountPaidNow" />
        </FieldLabel>
        <Input
          id="paid-amount"
          type="number"
          min={0}
          value={paidAmount === 0 ? "" : paidAmount}
          onChange={(event) => onPaidAmountChange(Number(event.target.value) || 0)}
          placeholder="0"
        />
      </Field>

      <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3 text-sm">
        <span className="text-muted-foreground">
          <T id="bookings.remainingBalance" />
        </span>
        <span className="font-semibold tabular-nums">{formatCurrency(remaining)}</span>
      </div>
    </div>
  );
}
