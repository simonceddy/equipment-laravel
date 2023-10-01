function Table({ cols = [], rows = [], renderers = {} }) {
  return (
    <table className="w-full border border-slate-400">
      <thead>
        <tr>
          {cols.map((col, id) => {
            const label = (typeof col.label === 'function')
              ? col.label(col)
              : col.label;
            // console.log(label);
            return (
              <th className="border border-slate-400 text-lg text-left" key={`table-header-${id}`}>
                {label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, id) => (
          <tr
            className="odd:bg-slate-950 text-white odd:hover:bg-blue-800 even:bg-gray-700 even:hover:bg-green-800"
            key={`table-row-${id}`}
          >
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
