"use client";

import Image from "next/image";

import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/language-provider";
import { T, V } from "@/i18n/t";

import travelerHeroData from "./traveler-hero-data.json";

type TravelerHero = {
  value: number;
  change: number;
  caption: string;
  image: string;
  stats: { label: string; value: number }[];
};

const hero = travelerHeroData as TravelerHero;

export function TravelerHeroCard() {
  const { formatNumber } = useI18n();
  return (
    <Card className="h-full gap-0 overflow-hidden py-0">
      <div className="relative h-32 w-full shrink-0 sm:h-36">
        <Image
          src={hero.image || "/placeholder.svg"}
          alt=""
          fill
          className="object-cover"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent" />
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between">
          <span className="font-medium text-white text-xs uppercase tracking-wide">
            <T id="default.travelers" />
          </span>
          <Badge className="bg-success/15 text-success" dir="ltr" variant="secondary">
            <TrendingUp data-icon="inline-start" />+{hero.change}%
          </Badge>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col gap-4 pt-4 pb-5">
        <div>
          <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
            {formatNumber(hero.value)}
          </div>
          <p className="mt-1.5 text-muted-foreground text-xs leading-snug">
            <V scope="default" text={hero.caption} />
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-2 border-t pt-3">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground">
                <V scope="default" text={stat.label} />
              </span>
              <span className="font-medium tabular-nums">{formatNumber(stat.value)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
