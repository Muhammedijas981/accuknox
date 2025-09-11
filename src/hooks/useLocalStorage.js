import { useState, useEffect } from "react";

// Custom hook for localStorage with JSON serialization
const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(
            `Error parsing localStorage change for key "${key}":`,
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
};

// Hook for localStorage with validation
export const useValidatedLocalStorage = (key, initialValue, validator) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const setValidatedValue = (newValue) => {
    if (validator && !validator(newValue)) {
      console.warn(`Validation failed for localStorage key "${key}"`);
      return false;
    }
    setValue(newValue);
    return true;
  };

  return [value, setValidatedValue];
};

// Hook for localStorage with expiration
export const useLocalStorageWithExpiry = (
  key,
  initialValue,
  ttlMinutes = 60
) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsed = JSON.parse(item);
      const now = new Date().getTime();

      // Check if item has expired
      if (parsed.expiry && now > parsed.expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }

      return parsed.value;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValueWithExpiry = (value) => {
    try {
      const now = new Date().getTime();
      const expiry = now + ttlMinutes * 60 * 1000; // Convert minutes to milliseconds

      const item = {
        value,
        expiry,
      };

      window.localStorage.setItem(key, JSON.stringify(item));
      setValue(value);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [value, setValueWithExpiry, clearValue];
};

// Hook for managing multiple localStorage keys as a group
export const useLocalStorageGroup = (keys, initialValues = {}) => {
  const [values, setValues] = useState(() => {
    const result = {};
    keys.forEach((key) => {
      try {
        const item = window.localStorage.getItem(key);
        result[key] = item ? JSON.parse(item) : initialValues[key] || null;
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        result[key] = initialValues[key] || null;
      }
    });
    return result;
  });

  const setGroupValue = (key, value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(values[key]) : value;

      // Update local state
      setValues((prev) => ({ ...prev, [key]: valueToStore }));

      // Update localStorage
      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const setMultipleValues = (updates) => {
    try {
      const newValues = { ...values };

      Object.entries(updates).forEach(([key, value]) => {
        const valueToStore =
          value instanceof Function ? value(values[key]) : value;
        newValues[key] = valueToStore;

        if (valueToStore === undefined || valueToStore === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      });

      setValues(newValues);
    } catch (error) {
      console.warn("Error setting multiple localStorage values:", error);
    }
  };

  const clearAll = () => {
    try {
      keys.forEach((key) => {
        window.localStorage.removeItem(key);
      });
      setValues(initialValues);
    } catch (error) {
      console.warn("Error clearing localStorage group:", error);
    }
  };

  return [values, setGroupValue, setMultipleValues, clearAll];
};

// Hook for localStorage with backup to sessionStorage
export const useStorageWithFallback = (
  key,
  initialValue,
  preferLocal = true
) => {
  const [value, setValue] = useState(() => {
    try {
      // Try localStorage first if preferred
      if (preferLocal) {
        const localItem = window.localStorage.getItem(key);
        if (localItem) return JSON.parse(localItem);
      }

      // Fallback to sessionStorage
      const sessionItem = window.sessionStorage.getItem(key);
      if (sessionItem) return JSON.parse(sessionItem);

      return initialValue;
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  });

  const setStorageValue = (newValue, forceLocal = false) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);

      const serialized = JSON.stringify(valueToStore);

      // Try localStorage first
      try {
        if (preferLocal || forceLocal) {
          window.localStorage.setItem(key, serialized);
        } else {
          window.sessionStorage.setItem(key, serialized);
        }
      } catch (localError) {
        // If localStorage fails (quota exceeded), fallback to sessionStorage
        console.warn(
          "localStorage failed, falling back to sessionStorage:",
          localError
        );
        window.sessionStorage.setItem(key, serialized);
      }
    } catch (error) {
      console.warn(`Error setting storage key "${key}":`, error);
    }
  };

  return [value, setStorageValue];
};

export default useLocalStorage;
