function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  function loadFromStorage(key) {
    const str = localStorage.getItem(key);
    return str ? JSON.parse(str) : null;
  }