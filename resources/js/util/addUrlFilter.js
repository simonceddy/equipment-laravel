/**
 * @param {string} baseUrl
 * @param {URL} url
 */
export default function addUrlFilter(baseUrl, url, filter, removePagination = true) {
  if (!url) return false;
  // console.log(url);
  let result = baseUrl;
  const params = new URLSearchParams(url.searchParams);
  params.set('filter', filter);
  if (removePagination && params.has('page')) params.delete('page');
  result += `?${params.toString()}`;

  return result;
}
