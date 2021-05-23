import { useLocation } from 'react-router';

/**
 * Returns a map of query parameter keys and their values
 *
 * Depends on react-router#useLocation hook
 */
export function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}
