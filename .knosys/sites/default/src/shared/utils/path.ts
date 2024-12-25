const baseUrl = import.meta.env.BASE_URL;

function isBaseUrlSet() {
  return baseUrl !== '/';
}

function removeBaseUrl(path: string) {
  return isBaseUrlSet() ? path.slice(baseUrl.length) : path;
}

function resolvePath(path: string) {
  return isBaseUrlSet() ? `${baseUrl}${path}` : path;
}

export { removeBaseUrl, resolvePath };
