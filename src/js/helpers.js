export const getFavorites = () => {
  const stored = localStorage.getItem('favorites');
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse favorites:', e);
    return [];
  }
};