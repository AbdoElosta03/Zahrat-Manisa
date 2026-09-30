"use client";

import { Banknote, Building2, CreditCard, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { PaymentMethod } from "./types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

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
  const subtotal = tripPrice * passengerCount;
  const total = Math.max(0, subtotal - discount + taxesFees);
  const remaining = Math.max(0, total - paidAmount);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg">Payment</h2>
        <p className="text-muted-foreground text-sm">Set pricing and collect an initial payment.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Trip price &times; {passengerCount} passenger{passengerCount === 1 ? "" : "s"}
            </span>
            <span className="tabular-nums">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="tabular-nums text-red-600 dark:text-red-400">
              {discount > 0 ? `- ${formatCurrency(discount)}` : formatCurrency(0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Taxes &amp; fees</span>
            <span className="tabular-nums">{formatCurrency(taxesFees)}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-3 font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(total)}</span>
          </div>
        </CardContent>
      </Card>

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="discount">Discount</FieldLabel>
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
            <FieldLabel htmlFor="taxes-fees">Taxes &amp; fees</FieldLabel>
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
        <FieldLabel>Payment method</FieldLabel>
        <ToggleGroup
          type="single"
          variant="outline"
          value={paymentMethod}
          onValueChange={(value) => value && onPaymentMethodChange(value as PaymentMethod)}
          className="w-full"
        >
          <ToggleGroupItem value="cash" className="flex-1 gap-1.5">
            <Banknote data-icon="inline-start" />
            Cash
          </ToggleGroupItem>
          <ToggleGroupItem value="bank-transfer" className="flex-1 gap-1.5">
            <Building2 data-icon="inline-start" />
            Bank transfer
          </ToggleGroupItem>
          <ToggleGroupItem value="card" className="flex-1 gap-1.5">
            <CreditCard data-icon="inline-start" />
            Card
          </ToggleGroupItem>
          <ToggleGroupItem value="other" className="flex-1 gap-1.5">
            <Wallet data-icon="inline-start" />
            Other
          </ToggleGroupItem>
        </ToggleGroup>
      </Field>

      <Field>
        <FieldLabel htmlFor="paid-amount">Amount paid now</FieldLabel>
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
        <span className="text-muted-foreground">Remaining balance</span>
        <span className="font-semibold tabular-nums">{formatCurrency(remaining)}</span>
      </div>
    </div>
  );
}
