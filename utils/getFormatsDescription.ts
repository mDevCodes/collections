import { Formats } from "@/schemas/collections.schemas";
import { startCase } from "lodash";

export default function getFormatsDescription(formats: Formats) {
  if (formats.length === 1) {
    return formats
      .map((format) => {
        const { name, text, descriptions } = format;
        const qty = parseInt(format.qty);

        if (text && descriptions) {
          return qty > 1
            ? startCase(`${text} ${name} ${descriptions?.join(" ")})`) +
                " " +
                `(x${qty})`
            : startCase(`${text} ${name} ${descriptions?.join(" ")}`);
        }
        if (text) {
          return qty > 1
            ? startCase(`${text} ${name}`) + " " + `(x${qty})`
            : startCase(`${text} ${name}`);
        }
        if (descriptions) {
          return qty > 1
            ? startCase(`${name} ${descriptions?.join(" ")}`) +
                " " +
                `(x${qty})`
            : startCase(`${name} ${descriptions?.join(" ")}`);
        }
        if (text === undefined && descriptions === undefined) {
          return qty > 1
            ? startCase(`${name}`) + " " + `(x${qty})`
            : startCase(`${name}`);
        }
      })
      .join(", ");
  } else {
    return formats
      .map((format) => {
        const { name, text, descriptions } = format;
        const qty = parseInt(format.qty);

        if (text && descriptions) {
          return (
            startCase(`${text} ${name} ${descriptions?.join(" ")})`) +
            " " +
            `(x${qty})`
          );
        }
        if (text) {
          return startCase(`${text} ${name}`) + " " + `(x${qty})`;
        }
        if (descriptions) {
          return (
            startCase(`${name} ${descriptions?.join(" ")}`) + " " + `(x${qty})`
          );
        }
        if (text === undefined && descriptions === undefined) {
          return startCase(`${name}`) + " " + `(x${qty})`;
        }
      })
      .join(", ");
  }
}
