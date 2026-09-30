import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Zahrat Manisa",
  version: packageJson.version,
  copyright: `© ${currentYear}, Zahrat Manisa.`,
  meta: {
    title: "Zahrat Manisa",
    description:
      "Zahrat Manisa is a travel and tourism company. Search flights, manage bookings, and run trip operations from one place.",
  },
};
