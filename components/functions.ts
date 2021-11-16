import React, { FormEvent } from 'react';

export const request = async (endPoint: string, method: string, body?: object, signal?: AbortSignal) =>
  await fetch(`${window.location.origin}/api/${endPoint}`, {
    body: body ? JSON.stringify(body) : undefined,
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  });

export const getFormAndHandleStates = (
  event: FormEvent,
  setShowValidation: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  event.preventDefault();
  const formEl = (event.target as HTMLFormElement);
  if (!formEl.checkValidity()) {
    setShowValidation(true);
    return null;
  }
  setIsDisabled(true);
  setShowValidation(false);
  const data = new FormData(formEl);
  const formObject = {};
  for (const [key, value] of data) {
    (formObject as any)[key] = value;
  }
  return formObject;
};
