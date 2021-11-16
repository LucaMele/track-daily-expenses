export const request = async (endPoint: string, method: string, body?: object, signal?: AbortSignal) =>
  await fetch(`${window.location.origin}/api/${endPoint}`, {
    body: body ? JSON.stringify(body) : undefined,
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  });
