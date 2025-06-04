// Patch for React Transition Group to prevent scrollTop errors
// This specifically targets the Collapse component and similar transition components

if (typeof window !== "undefined") {
  // Store original scroll methods
  const originalScrollTo = window.scrollTo
  const originalScrollBy = window.scrollBy

  // Patch Element.prototype.scrollTop getter/setter
  const originalScrollTopDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop")

  if (originalScrollTopDescriptor) {
    Object.defineProperty(Element.prototype, "scrollTop", {
      get: function () {
        try {
          return originalScrollTopDescriptor.get?.call(this) || 0
        } catch (e) {
          console.warn("Prevented scrollTop getter error:", e)
          return 0
        }
      },
      set: function (value) {
        try {
          if (originalScrollTopDescriptor.set) {
            originalScrollTopDescriptor.set.call(this, value)
          }
        } catch (e) {
          console.warn("Prevented scrollTop setter error:", e)
        }
      },
      configurable: true,
      enumerable: true,
    })
  }

  // Patch scrollTo and scrollBy to handle errors gracefully
  window.scrollTo = function (...args) {
    try {
      return originalScrollTo.apply(this, args)
    } catch (e) {
      console.warn("Prevented scrollTo error:", e)
    }
  }

  window.scrollBy = function (...args) {
    try {
      return originalScrollBy.apply(this, args)
    } catch (e) {
      console.warn("Prevented scrollBy error:", e)
    }
  }
}

export {}
