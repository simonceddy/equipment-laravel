/**
 * @param {string} baseUrl
 * @param {URLSearchParams} params
 * @param {string} type
 *
 * @returns {string}
 */
export default function getTypeUrl(baseUrl, params, type = '1') {
  let result = baseUrl;

  if (params.has('page')) params.delete('page');
  if (params.has('type') && params.get('type') === type) {
    params.delete('type');
  } else params.set('type', type);

  if (params.size > 0) result += `?${params.toString()}`;

  return result;
}
