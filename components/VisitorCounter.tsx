'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [data, setData] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    fetch('/api/visitors', { method: 'POST' })
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({ today: 0, total: 0 }));
  }, []);

  if (!data) return null;

  return (
    <span className="text-xs tracking-widest opacity-40">
      TODAY {data.today} / TOTAL {data.total}
    </span>
  );
}
