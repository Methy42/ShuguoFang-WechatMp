export const assetsPathFilter = (value = "") => {
  return value ? value.replace(/{{assetsUrl}}/g, uni.system_config.assetsUrl) : "";
}

export const priceFilter = (value = "") => {
  return value ? value/100 : "****";
}