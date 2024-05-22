export const checkServerHealth = async () => {
    try {
      const response = await fetch('/to-do-list');
      if (response.ok) {
        return true;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  };