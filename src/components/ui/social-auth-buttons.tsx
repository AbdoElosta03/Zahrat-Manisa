import { Button } from "@/components/ui/button";
import { cn } from "cn";

const SOCIAL_BRAND_ICONS = {
  google: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png",
  facebook: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/facebook-icon.png",
} as const;

type SocialAuthIntent = "login" | "register";

type SocialAuthButtonsProps = {
  intent: SocialAuthIntent;
  className?: string;
};

const LABELS: Record<SocialAuthIntent, { google: string; facebook: string }> = {
  login: {
    google: "Continue with Google",
    facebook: "Continue with Facebook",
  },
  register: {
    google: "Sign up with Google",
    facebook: "Sign up with Facebook",
  },
};

type SocialProvider = keyof typeof SOCIAL_BRAND_ICONS;

function SocialAuthButton({
  provider,
  label,
}: {
  provider: SocialProvider;
  label: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="h-10 min-w-0 flex-1 justify-center font-normal shadow-xs"
      disabled
      aria-label={label}
    >
      <img
        src={SOCIAL_BRAND_ICONS[provider]}
        alt=""
        aria-hidden
        className="size-5 shrink-0"
        data-icon="inline-start"
      />
      <span className="truncate">{label}</span>
    </Button>
  );
}

export function SocialAuthButtons({ intent, className }: SocialAuthButtonsProps) {
  const copy = LABELS[intent];

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:gap-4", className)}>
      <SocialAuthButton provider="google" label={copy.google} />
      <SocialAuthButton provider="facebook" label={copy.facebook} />
    </div>
  );
}
