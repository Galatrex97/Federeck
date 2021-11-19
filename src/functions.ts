// help.js
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const escapeRegex = async(str: any) => {
  return await str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}