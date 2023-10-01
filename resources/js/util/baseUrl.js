/**
 * Prepares a base url for query e.g. pagination
 *
* @param {URL} url
* @param {?string} replace an optional key to replace in the query. Defaults to replacing 'page'.
*/
export default function baseUrl(path, url, replace = 'page') {
  if (!url) return false;
  // console.log(url);
  let result = `${path}?`;

  if (url.searchParams?.size > 0) {
    const params = new URLSearchParams(url.searchParams);
    if (replace && params.has(replace)) {
      params.delete(replace);
    }
    result += `${params.toString()}&`;
  }

  return result;
}
