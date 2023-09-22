function Table({ cols = [], rows = [], renderers = {} }) {
  return (
    <table className="w-full border border-slate-400">
      <thead>
        <tr>
          {cols.map((col, id) => (
            <th className="border border-slate-400 text-lg text-left" key={`table-header-${id}`}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, id) => (
          <tr key={`table-row-${id}`}>
            {cols.map(({ key }) => (
              <td key={`table-row-${id}-cell-${key}`}>
                {renderers[key] ? renderers[key](row) : row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
