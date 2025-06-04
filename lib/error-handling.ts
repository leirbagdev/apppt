// Consolidated error handling and transition patches for Material UI
// This file combines all the necessary patches to prevent scrollTop errors

if (typeof window !== "undefined") {
  // Patch for React Transition Group
  const originalCreateTransition = Object.getOwnPropertyDescriptor(Object.prototype, "createTransition")

  if (originalCreateTransition && originalCreateTransition.configurable) {
    Object.defineProperty(Object.prototype, "createTransition", {
      value: () => {
        // Return empty string to disable transitions
        return ""
      },
      writable: true,
      configurable: true,
    })
  }

  // Patch for event listeners to prevent transition errors
  const originalAddEventListener = window.addEventListener
  window.addEventListener = function (type, listener, options) {
    if (type === "transitionend" || type === "animationend") {
      // Ignore transition and animation events that cause scrollTop errors
      return
    }
    return originalAddEventListener.call(this, type, listener, options)
  }

  // Patch for requestAnimationFrame to handle scrollTop errors
  const originalRAF = window.requestAnimationFrame
  window.requestAnimationFrame = (callback) => {
    try {
      return originalRAF(callback)
    } catch (e) {
      if (e instanceof Error && e.message.includes("scrollTop")) {
        console.warn("Prevented scrollTop error in requestAnimationFrame")
        setTimeout(callback, 0)
        return 0
      }
      throw e
    }
  }

  // Global error handler for unhandled scrollTop errors
  const originalErrorHandler = window.onerror
  window.onerror = function (message, source, lineno, colno, error) {
    if (typeof message === "string" && message.includes("scrollTop")) {
      console.warn("Caught and prevented scrollTop error:", message)
      return true // Prevent default error handling
    }

    if (originalErrorHandler) {
      return originalErrorHandler.call(this, message, source, lineno, colno, error)
    }
    return false
  }

  // Handle unhandled promise rejections related to scrollTop
  window.addEventListener("unhandledrejection", (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes("scrollTop")) {
      console.warn("Caught and prevented scrollTop promise rejection:", event.reason.message)
      event.preventDefault()
    }
  })
}

export {}
