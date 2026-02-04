(function () {
  "use strict";

  const STORAGE_KEY = "nightly_mode";
  const CLASS_NAME = "nightly-dark";

  const toggleBtn = document.getElementById("nightly-toggle");
  if (!toggleBtn) {
    return;
  }

  /**
   * Apply dark mode state
   */
  function applyMode(mode) {
    const config = window.nightlyConfig || {};
    const theme = config.theme || "classic";

    if (mode === "dark") {
      document.documentElement.classList.add(CLASS_NAME);
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove(CLASS_NAME);
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.style.colorScheme = "light";
    }
  }

  /**
   * Toggle dark mode on/off
   */
  function toggle() {
    const isDark = document.documentElement.classList.contains(CLASS_NAME);
    const newMode = isDark ? "light" : "dark";

    applyMode(newMode);

    // Persist preference
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch (e) {
      // localStorage might be disabled
      console.warn("Could not save dark mode preference:", e);
    }
  }

  // Attach click handler
  toggleBtn.addEventListener("click", toggle);

  // Keyboard accessibility
  toggleBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  // Listen for system preference changes
  // Only applies when user hasn't set a manual preference
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function handleSystemChange(e) {
    // Only respond if user hasn't manually set a preference
    try {
      const userPreference = localStorage.getItem(STORAGE_KEY);
      if (!userPreference) {
        // No manual preference, follow system
        applyMode(e.matches ? "dark" : "light");
      }
    } catch (err) {
      // If localStorage fails, just ignore system changes
    }
  }

  // Modern browsers
  if (darkModeQuery.addEventListener) {
    darkModeQuery.addEventListener("change", handleSystemChange);
  } else {
    // Fallback for older browsers
    darkModeQuery.addListener(handleSystemChange);
  }

  // Keyboard Shortcut Support
  const config = window.nightlyConfig || {};

  if (config.keyboardEnabled && config.keyboardShortcut) {
    /**
     * Parse keyboard shortcut string into object
     * @param {string} shortcutString - e.g., "Ctrl+Shift+D"
     * @returns {Object} - e.g., {ctrl: true, shift: true, key: 'D'}
     */
    function parseShortcut(shortcutString) {
      const parts = shortcutString.split("+").map((p) => p.trim());
      const parsed = {
        ctrl: false,
        shift: false,
        alt: false,
        meta: false,
        key: "",
      };

      parts.forEach(function (part) {
        const partLower = part.toLowerCase();
        if (partLower === "ctrl") {
          parsed.ctrl = true;
        } else if (partLower === "shift") {
          parsed.shift = true;
        } else if (partLower === "alt") {
          parsed.alt = true;
        } else if (partLower === "meta" || partLower === "cmd") {
          parsed.meta = true;
        } else {
          parsed.key = part.toUpperCase();
        }
      });

      return parsed;
    }

    /**
     * Check if keyboard event matches the shortcut
     */
    function matchesShortcut(event, shortcut) {
      return (
        event.ctrlKey === shortcut.ctrl &&
        event.shiftKey === shortcut.shift &&
        event.altKey === shortcut.alt &&
        event.metaKey === shortcut.meta &&
        event.key.toUpperCase() === shortcut.key
      );
    }

    const shortcut = parseShortcut(config.keyboardShortcut);

    document.addEventListener("keydown", function (e) {
      if (matchesShortcut(e, shortcut)) {
        e.preventDefault();
        toggle();
      }
    });
  }

  // Time-based Scheduling Support
  if (config.scheduleEnabled && config.scheduleStart && config.scheduleEnd) {
    /**
     * Check if current time is within schedule range
     * @returns {boolean}
     */
    function isWithinSchedule() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const nowMinutes = hours * 60 + minutes;

      const startParts = config.scheduleStart.split(":").map(Number);
      const endParts = config.scheduleEnd.split(":").map(Number);
      const startMinutes = startParts[0] * 60 + startParts[1];
      const endMinutes = endParts[0] * 60 + endParts[1];

      // Handle overnight range (e.g., 20:00 to 06:00)
      if (endMinutes < startMinutes) {
        return nowMinutes >= startMinutes || nowMinutes < endMinutes;
      }

      return nowMinutes >= startMinutes && nowMinutes < endMinutes;
    }

    /**
     * Apply schedule if no user preference exists
     */
    function applySchedule() {
      try {
        const userPreference = localStorage.getItem(STORAGE_KEY);
        // Only apply schedule if user hasn't manually set a preference
        if (!userPreference) {
          const shouldBeDark = isWithinSchedule();
          const isDark =
            document.documentElement.classList.contains(CLASS_NAME);

          if (shouldBeDark && !isDark) {
            applyMode("dark");
          } else if (!shouldBeDark && isDark) {
            applyMode("light");
          }
        }
      } catch (err) {
        // Silently ignore errors
      }
    }

    // Check schedule on load
    applySchedule();

    // Check schedule every minute
    setInterval(applySchedule, 60000);
  }
})();
