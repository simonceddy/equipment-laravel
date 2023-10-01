/**
 * Prepares a base url for query e.g. pagination
 *
* @param {URL} url
* @param {?string} replace an optional key to replace in the query. Defaults to replacing 'page'.
*/
export default function sortUrl(path, url, col = 'name') {
  if (!url) return false;
  // console.log(url);
  let result = `${path}?`;

  const params = new URLSearchParams(url.searchParams);
  if (params.has('sort') && params.get('sort') === col) {
    params.set('desc', params.has('desc') && params.get('desc') === '1' ? 0 : 1);
  } else params.set('sort', col);

  result += `${params.toString()}`;

  return result;
}
