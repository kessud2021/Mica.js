/**
 * Syncs form with server
 * @param form - The form state object
 * @param fetchUrl - URL to fetch initial values
 * @param saveUrl - URL to save values
 * @returns Sync object
 */
export default async function syncFormWithServer<T extends Record<string, any>>(
  form: any,
  fetchUrl: string,
  saveUrl: string
) {
  // Fetch initial values
  try {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const data = await response.json();
      form.setValues?.(data);
    }
  } catch (error) {
    console.error('Failed to fetch form data:', error);
  }

  // Save on changes
  return form.subscribe?.((state: any) => {
    if (state.dirty && state.isValid) {
      fetch(saveUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.values),
      }).catch((error) => console.error('Failed to save form:', error));
    }
  });
}
