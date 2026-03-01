const MdxComponents = {
  SlackBlock: ({ children }: { children: React.ReactNode }) => (
    <div
      className="slack-block"
      style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '1.25rem 1.5rem',
        overflowX: 'auto',
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </div>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-black text-white">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-gray-200 even:bg-gray-50">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase border-r border-gray-700 last:border-r-0 whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-3 text-gray-700 border-r border-gray-200 last:border-r-0">
      {children}
    </td>
  ),
};

export default MdxComponents;
