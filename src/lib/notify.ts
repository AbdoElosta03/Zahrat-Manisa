import { type ExternalToast, toast } from "sonner";

import {
  sonnerSolidErrorStyle,
  sonnerSolidInfoStyle,
  sonnerSolidSuccessStyle,
  sonnerSolidWarningStyle,
} from "@/lib/sonner-solid-styles";

function withToastStyle(baseStyle: ExternalToast["style"], options?: ExternalToast): ExternalToast {
  const extraStyle = options?.style;
  return {
    ...options,
    style: {
      ...baseStyle,
      ...(typeof extraStyle === "object" && extraStyle !== null ? extraStyle : {}),
    },
  };
}

/** App toasts using shadcn studio solid sonner styles (17 / 18 / 19 / 20). */
export const notify = {
  success(message: string, options?: ExternalToast) {
    return toast.success(message, withToastStyle(sonnerSolidSuccessStyle, options));
  },
  error(message: string, options?: ExternalToast) {
    return toast.error(message, withToastStyle(sonnerSolidErrorStyle, options));
  },
  info(message: string, options?: ExternalToast) {
    return toast.info(message, withToastStyle(sonnerSolidInfoStyle, options));
  },
  warning(message: string, options?: ExternalToast) {
    return toast.warning(message, withToastStyle(sonnerSolidWarningStyle, options));
  },
  message(message: string, options?: ExternalToast) {
    return toast(message, options);
  },
};
