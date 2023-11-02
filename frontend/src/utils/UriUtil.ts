export const getCurrentModuleName = () => {
  const hash = window.location.hash;
  if (hash && hash.length > 0) {
    const split = hash.substring(1).trim().split("/");
    return split.length > 1 ? split[1] : split[0];
  }

  return "dashboard";
};

export function getModuleNameFromHash(hash: any) {
  const arr = hash.substring(1).split("/");
  if (arr.length > 1) {
    return arr[0];
  }
  return arr[0];
}

export function getSubmenuIdFromHash(hash: any) {
  const arr = hash.substring(1).split("/");
  if (arr.length > 1) {
    return arr[1];
  }

  return arr[1];
}

export function getHash(url: any) {
  if (!url || url.length == 0) {
    return "";
  }

  const arr = url.split("#");

  return arr.length == 2 ? `#${arr[1]}` : "";
}
