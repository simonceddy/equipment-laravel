/**
 * @param {string} baseUrl
 * @param {URL} url
 */
export default function clearUrlFilter(baseUrl, url) {
  if (!url) return false;
  // console.log(url);
  let result = baseUrl;
  const params = new URLSearchParams(url.searchParams);
  if (params.has('filter')) {
    params.delete('filter');
  }
  if (params.size > 0) result += `?${params.toString()}`;

  return result;
}
