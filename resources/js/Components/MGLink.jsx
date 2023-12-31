import ExternalLink from './ExternalLink';

const baseURL = 'https://www.modulargrid.net/';

function MGLink({ slug, url, }) {
  if (!url && !slug) return null;
  const u = `${baseURL}${url || `e/${slug}`}`;

  return (
    <ExternalLink url={u} />
  );
}

export default MGLink;
