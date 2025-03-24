export const requestStoragePermission = async () => {
  try {
    if (navigator.permissions && navigator.permissions.query) {
      const result = await navigator.permissions.query({ name: 'persistent-storage' });
      if (result.state === 'granted') {
        return true;
      } else if (result.state === 'prompt') {
        return await navigator.storage && navigator.storage.persist();
      }
    }
    return false;
  } catch (error) {
    console.warn('Storage permission API not supported');
    return false;
  }
};
