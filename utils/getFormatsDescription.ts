import { Formats } from "@/schemas/collections.schemas";

export default function getFormatsDescription(formats: Formats) {
  if (formats.length === 1) {
    return formats
      .map((format) => {
        const { name, text, descriptions } = format;
        const qty = parseInt(format.qty);
        if (text && descriptions) {
          if (qty === 1) {
            return text + " " + name + " " + descriptions?.join(" ");
          }

          if (qty > 1) {
            return (
              text +
              " " +
              name +
              " " +
              descriptions?.join(" ") +
              " " +
              `(x${qty})`
            );
          }
        }
        if (text) {
          if (qty === 1) {
            return text + " " + name;
          }

          if (qty > 1) {
            return text + " " + name + " " + `(x${qty})`;
          }
        }
        if (descriptions) {
          if (qty === 1) {
            return name + " " + descriptions?.join(" ");
          }

          if (qty > 1) {
            return name + " " + descriptions?.join(" ") + " " + `(x${qty})`;
          }
        }
        if (text === undefined && descriptions === undefined) {
          if (qty === 1) {
            return name;
          }

          if (qty > 1) {
            return name + " " + `(x${qty})`;
          }
        }
      })
      .join(", ");
  } else {
    return formats
      .map((format) => {
        const { name, text, qty, descriptions } = format;
        if (text && descriptions) {
          return (
            text +
            " " +
            name +
            " " +
            descriptions?.join(" ") +
            " " +
            `(x${qty})`
          );
        }
        if (text) {
          return text + " " + name + " " + `(x${qty})`;
        }
        if (descriptions) {
          return name + " " + descriptions?.join(" ") + " " + `(x${qty})`;
        }
        if (text === undefined && descriptions === undefined) {
          return name + " " + `(x${qty})`;
        }
      })
      .join(", ");
  }
}
