export function assetPath(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

export function appPath(path = "") {
  if (path.startsWith("#")) {
    return `${import.meta.env.BASE_URL}${path}`;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
