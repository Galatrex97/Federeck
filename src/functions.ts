import prefixSchema from "./Models/prefix";
let prefix = process.env.prefix;
// help.js
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const escapeRegex = async(str: any) => {
  return await str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function prx (message: any) {
  let custom: any;
  const data = await prefixSchema
    .findOne({ Guild: message.guild?.id })
    .catch((err: any) => console.log(err));

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
};