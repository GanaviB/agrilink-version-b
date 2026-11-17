import { useState, useMemo, useCallback } from 'react';

/**
 * Search hook that filters a list of items by a query string across specified fields.
 * @param {Array} items - The full list of items to search through
 * @param {string[]} searchFields - Object keys to match the query against
 * @returns {{ query: string, setQuery: Function, results: Array }}
 */
export function useSearch(items = [], searchFields = []) {
  const [query, setQuery] = useState('');

  const handleSetQuery = useCallback((value) => {
    setQuery(typeof value === 'string' ? value : '');
  }, []);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return items;

    return items.filter((item) =>
      searchFields.some((field) => {
        const val = item[field];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(trimmed);
      })
    );
  }, [items, query, searchFields]);

  return {
    query,
    setQuery: handleSetQuery,
    results,
  };
}

export default useSearch;
