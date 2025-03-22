import slugify from "slugify";

export const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const normalizeString = (str: string) => {
  return slugify(str, { lower: true, locale: "vi" });
};

export const normalizeName = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/, (char) => char.toUpperCase());
};

export const isJSONString = (str: string) => {
  if (typeof str !== "string") return false;
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null;
  } catch (e) {
    return false;
  }
};
