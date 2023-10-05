/**
 * @param {string} baseUrl
 * @param {URL} url
 */
export default function addUrlFilter(baseUrl, url, filter) {
  if (!url) return false;
  // console.log(url);
  let result = baseUrl;
  const params = new URLSearchParams(url.searchParams);
  params.set('filter', filter);
  result += `?${params.toString()}`;

  return result;
}
