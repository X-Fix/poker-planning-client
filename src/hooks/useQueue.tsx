import { useState } from 'react';
/**
 * Use a cached queue value outside of the hook. React useState has a caveat where if you call
 * setState more than once in the same render frame, it only remembers the last value. This can lead
 * to queued items being lost so we add/remove the items to/from this _queue instead, and sync the
 * _queue and state values after every action
 *
 * WARNING: This approach makes this hook a singleton so if you need to useQueue in more than one
 * instance, you'll need to come up with a fix for that
 */
let _queue: unknown[];

export function useQueue<T = unknown>(initialArray: T[]) {
  const [queue, setQueue] = useState<T[]>(initialArray);
  _queue = queue;

  function enqueue(item: T) {
    _queue = [..._queue, item];
    setQueue(_queue as T[]);
  }

  function dequeue(): T {
    const [dequeued, ...rest] = _queue;
    _queue = rest;
    setQueue(_queue as T[]);

    return dequeued as T;
  }

  return { queue, enqueue, dequeue };
}
