/* ==========================================================================
   core-ui.js (jQuery version)
   Media Site Gen 2: Core UI behaviours
   Purpose: predictable, reusable behaviours for Core UI patterns
   Dependencies: jQuery
   Notes:
   - Uses a unified overlay engine for modals, drawers and menus
   - Progressive enhancement for inert background (fallback provided)
   - Smart menu placement (flip + max-height)
   - Tabs
   - Toasts
   - Tooltips
   ========================================================================== */

(function ($) {
  "use strict";

  /* ------------------------------------------------------------------------
     Shared helpers
     ------------------------------------------------------------------------ */

  var $doc = $(document);
  var $win = $(window);

  var $appRoot = $("[data-app-root]").first();
  if ($appRoot.length === 0) $appRoot = $(document.body);

  var supportsInert = ("inert" in HTMLElement.prototype);

  function getFocusable($root) {
    var selector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");
    return $root.find(selector).filter(":visible");
  }

  /* ------------------------------------------------------------------------
     Scroll lock (stack-safe)
     ------------------------------------------------------------------------ */

  var scrollLockCount = 0;

  function lockScroll() {
    scrollLockCount += 1;
    $(document.body).addClass("is-scroll-locked");
  }

  function unlockScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) $(document.body).removeClass("is-scroll-locked");
  }

  /* ------------------------------------------------------------------------
     Background interactivity (inert progressive enhancement)
     ------------------------------------------------------------------------ */

  function setBackgroundInteractive(isInteractive) {
    if (supportsInert) {
      $appRoot.get(0).inert = !isInteractive;
    } else {
      $(document.body).toggleClass("is-overlay-open", !isInteractive);
      $appRoot.attr("aria-hidden", String(!isInteractive));
    }
  }

  /* ------------------------------------------------------------------------
     Focus trap + restore (stack-safe)
     ------------------------------------------------------------------------ */

  var overlayStack = [];

  function trapFocus($container) {
    var $focusables = getFocusable($container);
    if ($focusables.length === 0) return function () {};

    var $first = $focusables.first();
    var $last = $focusables.last();

    function handler(e) {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === $first.get(0)) {
        e.preventDefault();
        $last.trigger("focus");
      } else if (!e.shiftKey && document.activeElement === $last.get(0)) {
        e.preventDefault();
        $first.trigger("focus");
      }
    }

    $container.on("keydown.uiTrap", handler);

    return function release() {
      $container.off("keydown.uiTrap", handler);
    };
  }

  function getOverlayKind($overlay) {
    return $overlay.attr("data-overlay-kind") || "modal";
  }

  function getOpenOverlays() {
    return $(".ui-modal[aria-hidden='false'], .ui-drawer[aria-hidden='false']");
  }

  function getOpenMenus() {
    return $("[data-overlay-kind='menu'][aria-hidden='false']");
  }

  function closeAllMenus() {
    getOpenMenus().each(function () {
      closeOverlay($(this).attr("id"));
    });
  }

  /* ------------------------------------------------------------------------
     Smart menu placement (flip + max height)
     ------------------------------------------------------------------------ */

  function applyMenuPlacement($panel, $trigger) {
    if ($panel.length === 0 || $trigger.length === 0) return;

    // Ensure measurable without flashing
    var prevVis = $panel.css("visibility");
    $panel.css("visibility", "hidden");

    // Measure
    var panelRect = $panel.get(0).getBoundingClientRect();
    var triggerRect = $trigger.get(0).getBoundingClientRect();

    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var gap = 8; // should roughly match CSS --menu-gap

    var spaceBelow = vh - triggerRect.bottom - gap;
    var spaceAbove = triggerRect.top - gap;

    var spaceRight = vw - triggerRect.right;
    var spaceLeft = triggerRect.left;

    var openUp = (panelRect.height > spaceBelow) && (spaceAbove > spaceBelow);
    var alignLeft = (panelRect.width > spaceRight) && (spaceLeft > spaceRight);

    var v = openUp ? "top" : "bottom";
    var h = alignLeft ? "left" : "right";

    $panel.attr("data-placement", v + "-" + h);

    // Dynamic max-height based on available space
    var available = openUp ? spaceAbove : spaceBelow;
    var safeMax = Math.max(160, Math.floor(available - 12));
    $panel.css("max-height", safeMax + "px");

    $panel.css("visibility", prevVis);
  }

  function repositionOpenMenus() {
    getOpenMenus().each(function () {
      var $panel = $(this);
      var id = $panel.attr("id");
      if (!id) return;

      // Find matching trigger
      var $trigger = $("[data-overlay-open='" + CSS.escape(id) + "']").first();
      if ($trigger.length) applyMenuPlacement($panel, $trigger);
    });
  }

  /* ------------------------------------------------------------------------
     Overlay engine (modals + drawers + menus)
     ------------------------------------------------------------------------ */

  function openOverlay(id, $trigger) {
    var $overlay = $("#" + CSS.escape(id));
    if ($overlay.length === 0) return;

    var kind = getOverlayKind($overlay);

    // Menus: close other menus first
    if (kind === "menu") closeAllMenus();

    // Disable background only for modal/drawer
    if (kind !== "menu" && getOpenOverlays().length === 0) setBackgroundInteractive(false);

    // Focus trap only for modal/drawer (not menus)
    var release = (kind === "menu") ? function () {} : trapFocus($overlay);

    overlayStack.push({
      id: id,
      kind: kind,
      $trigger: $trigger,
      release: release
    });

    $overlay.attr("aria-hidden", "false");

    // Menu placement (needs to happen after visible)
    if (kind === "menu") applyMenuPlacement($overlay, $trigger);

    // Scroll lock only for modal/drawer
    if (kind !== "menu") lockScroll();

    // Trigger aria state
    if ($trigger && $trigger.length) $trigger.attr("aria-expanded", "true");

    // Focus target
    var $focusTarget;
    if (kind === "menu") {
      $focusTarget = $overlay.find("[role='menuitem']").filter(":visible").first();
    } else {
      $focusTarget = $overlay.find("[autofocus]").filter(":visible").first();
      if ($focusTarget.length === 0) $focusTarget = getFocusable($overlay).first();
    }

    if ($focusTarget && $focusTarget.length) $focusTarget.trigger("focus");
  }

  function closeOverlay(id) {
    var $overlay = $("#" + CSS.escape(id));
    if ($overlay.length === 0) return;

    var kind = getOverlayKind($overlay);

    $overlay.attr("aria-hidden", "true");

    if (kind !== "menu") unlockScroll();

    var entry = overlayStack.pop();
    if (entry) {
      try { entry.release && entry.release(); } catch (e) {}

      if (entry.$trigger && entry.$trigger.length) {
        entry.$trigger.attr("aria-expanded", "false");
        entry.$trigger.trigger("focus");
      }
    }

    // Re-enable background when all modal/drawer overlays are closed
    if (kind !== "menu" && getOpenOverlays().length === 0) setBackgroundInteractive(true);
  }

  function closeTopOverlay() {
    // Prefer top of stack, but fall back to last visible overlay
    if (overlayStack.length) {
      closeOverlay(overlayStack[overlayStack.length - 1].id);
      return;
    }

    var $open = getOpenOverlays();
    if ($open.length) closeOverlay($open.last().attr("id"));
  }

  /* Click interactions: open/close + outside click for menus + close on selection */
  $doc.on("click", function (e) {
    var $t = $(e.target);

    // Close menus when clicking outside any open menu + its trigger
    var $openMenus = getOpenMenus();
    if ($openMenus.length) {
      var clickedInsideMenu = $t.closest("[data-overlay-kind='menu'][aria-hidden='false']").length > 0;
      var clickedMenuTrigger = $t.closest("[data-overlay-open]").length > 0;

      if (!clickedInsideMenu && !clickedMenuTrigger) closeAllMenus();
    }

    // Open overlay
    var $openBtn = $t.closest("[data-overlay-open]");
    if ($openBtn.length) {
      e.preventDefault();
      openOverlay($openBtn.attr("data-overlay-open"), $openBtn);
      return;
    }

    // Close overlay
    var $closeBtn = $t.closest("[data-overlay-close]");
    if ($closeBtn.length) {
      e.preventDefault();
      closeOverlay($closeBtn.attr("data-overlay-close"));
      return;
    }

    // If menu item clicked, close menus
    var $menuItem = $t.closest("[data-overlay-kind='menu'] [role='menuitem']");
    if ($menuItem.length) {
      closeAllMenus();
    }
  });

  /* Escape closes top overlay; also hides tooltip */
  $doc.on("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeTopOverlay();
    hideTooltip();
  });

  /* Keep menus positioned on resize/scroll */
  $win.on("resize", repositionOpenMenus);
  // capture-like scroll handler: use document + window
  $win.on("scroll", repositionOpenMenus);
  $doc.on("scroll", repositionOpenMenus);

  /* ------------------------------------------------------------------------
   Scroll lock utilities
   - Prevents scrollbar layout shift (Windows)
   - Supports nested modals with a lock counter
   ------------------------------------------------------------------------ */

(function ($) {
  var lockCount = 0;
  var savedScrollY = 0;

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function setScrollbarWidthVar() {
    var w = getScrollbarWidth();
    document.documentElement.style.setProperty("--scrollbar-width", w + "px");
  }

  function lockScroll() {
    lockCount += 1;
    if (lockCount > 1) return; // already locked

    // If you ever switch to fixed-position locking, keep this savedScrollY.
    savedScrollY = window.scrollY || window.pageYOffset || 0;

    setScrollbarWidthVar();
    document.body.classList.add("is-scroll-locked");

    // For fixed-position variant only:
    // document.documentElement.style.setProperty("--scroll-lock-top", savedScrollY + "px");
  }

  function unlockScroll() {
    if (lockCount === 0) return;

    lockCount -= 1;
    if (lockCount > 0) return; // still locked by another modal

    document.body.classList.remove("is-scroll-locked");
    document.documentElement.style.setProperty("--scrollbar-width", "0px");

    // For fixed-position variant only:
    // document.documentElement.style.removeProperty("--scroll-lock-top");
    // window.scrollTo(0, savedScrollY);
  }

  // Keep scrollbar width correct on resize while locked
  $(window).on("resize", function () {
    if (document.body.classList.contains("is-scroll-locked")) {
      setScrollbarWidthVar();
    }
  });

  // Expose helpers (handy for your modal component)
  window.CM = window.CM || {};
  window.CM.scrollLock = {
    lock: lockScroll,
    unlock: unlockScroll,
    refresh: setScrollbarWidthVar
  };
})(jQuery);

$(document).on("click", "[data-modal-open]", function () {
  window.CM.scrollLock.lock();
  // open your modal...
});

$(document).on("click", "[data-modal-close]", function () {
  // close your modal...
  window.CM.scrollLock.unlock();
});



  /* ------------------------------------------------------------------------
     Tabs (core)
     ------------------------------------------------------------------------ */

  function setActiveTab($tabsRoot, panelId) {
    var $tabs = $tabsRoot.find("[role='tab'][data-tab]");
    var $panels = $tabsRoot.find("[role='tabpanel']");

    $tabs.each(function () {
      var $btn = $(this);
      var isActive = ($btn.attr("data-tab") === panelId);
      $btn.attr("aria-selected", String(isActive));
      $btn.prop("tabIndex", isActive ? 0 : -1);
    });

    $panels.each(function () {
      var $panel = $(this);
      var show = ($panel.attr("id") === panelId);
      $panel.prop("hidden", !show);
    });
  }

  $doc.on("click", "[data-ui-tabs] [role='tab'][data-tab]", function (e) {
    e.preventDefault();
    var $tab = $(this);
    var $root = $tab.closest("[data-ui-tabs]");
    setActiveTab($root, $tab.attr("data-tab"));
  });

  $doc.on("keydown", function (e) {
    var $current = $(document.activeElement).closest("[data-ui-tabs] [role='tab'][data-tab]");
    if ($current.length === 0) return;

    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();

    var $root = $current.closest("[data-ui-tabs]");
    var $tabs = $root.find("[role='tab'][data-tab]");
    var idx = $tabs.index($current);

    var dir = (e.key === "ArrowRight") ? 1 : -1;
    var nextIdx = (idx + dir + $tabs.length) % $tabs.length;
    var $next = $tabs.eq(nextIdx);

    $next.trigger("focus");
    setActiveTab($root, $next.attr("data-tab"));
  });

  /* ------------------------------------------------------------------------
     Toasts (core)
     ------------------------------------------------------------------------ */

  var $toastRegion = $(".ui-toast-region").first();

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function createToast(opts) {
    if ($toastRegion.length === 0) return;

    var variant = opts.variant || "info";
    var title = opts.title || "Notice";
    var message = opts.message || "";
    var timeoutMs = opts.timeoutMs || 4500;

    var $toast = $(
      '<div class="ui-toast ui-toast--' + escapeHtml(variant) + '" role="status">' +
        '<p class="ui-toast__title">' + escapeHtml(title) + "</p>" +
        (message ? '<p class="ui-toast__message">' + escapeHtml(message) + "</p>" : "") +
        '<div class="ui-toast__actions">' +
          '<button type="button" class="ui-btn ui-btn--ghost" data-toast-close>Dismiss</button>' +
        "</div>" +
      "</div>"
    );

    $toastRegion.append($toast);

    var timer = window.setTimeout(function () {
      $toast.remove();
    }, timeoutMs);

    $toast.on("click", "[data-toast-close]", function () {
      window.clearTimeout(timer);
      $toast.remove();
    });
  }

  $doc.on("click", "[data-toast]", function () {
    var $btn = $(this);
    createToast({
      variant: $btn.attr("data-toast-variant") || "info",
      title: $btn.attr("data-toast-title") || "Notice",
      message: $btn.attr("data-toast-message") || ""
    });
  });

  /* ------------------------------------------------------------------------
     Tooltips (core) - shared instance
     ------------------------------------------------------------------------ */

  var $tooltip = $("#ui-tooltip");
  var $tooltipContent = $tooltip.find(".ui-tooltip__content");
  var currentTooltipTarget = null;

  function positionTooltip($target) {
    if ($tooltip.length === 0 || $target.length === 0) return;

    $tooltip.css({ left: "0px", top: "0px", maxWidth: "", visibility: "hidden" });

    var tRect = $target.get(0).getBoundingClientRect();
    var tipRect = $tooltip.get(0).getBoundingClientRect();

    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var gap = 10;
    var pad = 8;

    var spaceAbove = tRect.top - gap;
    var spaceBelow = vh - tRect.bottom - gap;

    var placeTop = (tipRect.height > spaceBelow) && (spaceAbove > spaceBelow);
    var placement = placeTop ? "top" : "bottom";

    $tooltip.attr("data-placement", placement);

    // Centre align
    var x = tRect.left + (tRect.width / 2) - (tipRect.width / 2);
    x = Math.max(pad, Math.min(x, vw - tipRect.width - pad));

    var y;
    if (placement === "top") {
      y = tRect.top - tipRect.height - gap;
      if (y < pad) {
        $tooltip.attr("data-placement", "bottom");
        y = tRect.bottom + gap;
      }
    } else {
      y = tRect.bottom + gap;
      if (y + tipRect.height > vh - pad) {
        $tooltip.attr("data-placement", "top");
        y = tRect.top - tipRect.height - gap;
      }
    }

    $tooltip.css({ left: Math.round(x) + "px", top: Math.round(y) + "px", visibility: "" });

    // Dynamic max-height safety
    var nowPlacement = $tooltip.attr("data-placement");
    var available = (nowPlacement === "top") ? spaceAbove : spaceBelow;
    var maxH = Math.max(120, Math.floor(available - 12));
    $tooltip.css({ maxHeight: maxH + "px", overflow: "auto" });
  }

  function showTooltip($target) {
    if ($tooltip.length === 0 || $tooltipContent.length === 0) return;
    var text = $target.attr("data-tooltip");
    if (!text) return;

    $tooltipContent.text(text);
    $tooltip.attr("aria-hidden", "false");
    positionTooltip($target);
  }

  function hideTooltip() {
    if ($tooltip.length === 0) return;
    $tooltip.attr("aria-hidden", "true");
  }

  $doc.on("mouseover", "[data-tooltip]", function () {
    currentTooltipTarget = this;
    showTooltip($(this));
  });

  $doc.on("mouseout", "[data-tooltip]", function (e) {
    // Only hide when leaving the element (not bubbling within)
    if (currentTooltipTarget === this) {
      currentTooltipTarget = null;
      hideTooltip();
    }
  });

  $doc.on("focusin", "[data-tooltip]", function () {
    currentTooltipTarget = this;
    showTooltip($(this));
  });

  $doc.on("focusout", "[data-tooltip]", function () {
    if (currentTooltipTarget === this) {
      currentTooltipTarget = null;
      hideTooltip();
    }
  });

  function repositionTooltip() {
    if ($tooltip.length === 0) return;
    if ($tooltip.attr("aria-hidden") === "true") return;
    if (!currentTooltipTarget) return;
    positionTooltip($(currentTooltipTarget));
  }

  $win.on("resize", repositionTooltip);
  $win.on("scroll", repositionTooltip);
  $doc.on("scroll", repositionTooltip);

})(jQuery);

// -----------------------------
// Tooltips (shared instance)
// Usage: data-tooltip="Text" on any element
// -----------------------------
const tooltip = document.getElementById("ui-tooltip");
const tooltipContent = tooltip?.querySelector(".ui-tooltip__content");

const showTooltip = (target) => {
  if (!tooltip || !tooltipContent || !target) return;

  const text = target.getAttribute("data-tooltip");
  if (!text) return;

  tooltipContent.textContent = text;
  tooltip.setAttribute("aria-hidden", "false");

  positionTooltip(target);
};

const hideTooltip = () => {
  if (!tooltip) return;
  tooltip.setAttribute("aria-hidden", "true");
};

const positionTooltip = (target) => {
  if (!tooltip) return;

  // Measure
  tooltip.style.left = "0px";
  tooltip.style.top = "0px";
  tooltip.style.maxWidth = ""; // allow natural width before measuring

  const tRect = target.getBoundingClientRect();
  const tipRect = tooltip.getBoundingClientRect();

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const gap = 10;

  const spaceAbove = tRect.top - gap;
  const spaceBelow = vh - tRect.bottom - gap;

  const placeTop = tipRect.height > spaceBelow && spaceAbove > spaceBelow;
  const placement = placeTop ? "top" : "bottom";
  tooltip.setAttribute("data-placement", placement);

  // Base x: centre align to target
  let x = tRect.left + (tRect.width / 2) - (tipRect.width / 2);

  // Clamp horizontally with padding
  const pad = 8;
  x = Math.max(pad, Math.min(x, vw - tipRect.width - pad));

  // y based on placement
  let y;
  if (placement === "top") {
    y = tRect.top - tipRect.height - gap;
    // If still off-screen, fall back to bottom
    if (y < pad) {
      tooltip.setAttribute("data-placement", "bottom");
      y = tRect.bottom + gap;
    }
  } else {
    y = tRect.bottom + gap;
    // If still off-screen, fall back to top
    if (y + tipRect.height > vh - pad) {
      tooltip.setAttribute("data-placement", "top");
      y = tRect.top - tipRect.height - gap;
    }
  }

  tooltip.style.left = `${Math.round(x)}px`;
  tooltip.style.top = `${Math.round(y)}px`;

  // Dynamic max-height safety (rare but nice)
  const maxH = Math.max(120, Math.floor((tooltip.getAttribute("data-placement") === "top" ? spaceAbove : spaceBelow) - 12));
  tooltip.style.maxHeight = `${maxH}px`;
  tooltip.style.overflow = "auto";
};

// Show on hover/focus, hide on blur/leave
let currentTooltipTarget = null;

document.addEventListener("mouseover", (e) => {
  const target = e.target.closest("[data-tooltip]");
  if (!target) return;
  currentTooltipTarget = target;
  showTooltip(target);
});

document.addEventListener("mouseout", (e) => {
  if (!currentTooltipTarget) return;
  const leaving = e.target.closest("[data-tooltip]");
  if (leaving === currentTooltipTarget) {
    currentTooltipTarget = null;
    hideTooltip();
  }
});

document.addEventListener("focusin", (e) => {
  const target = e.target.closest("[data-tooltip]");
  if (!target) return;
  currentTooltipTarget = target;
  showTooltip(target);
});

document.addEventListener("focusout", (e) => {
  const target = e.target.closest("[data-tooltip]");
  if (!target) return;
  if (currentTooltipTarget === target) {
    currentTooltipTarget = null;
    hideTooltip();
  }
});

// Reposition on scroll/resize (only if visible)
const repositionTooltip = () => {
  if (!tooltip || tooltip.getAttribute("aria-hidden") === "true") return;
  if (!currentTooltipTarget) return;
  positionTooltip(currentTooltipTarget);
};

window.addEventListener("resize", repositionTooltip, { passive: true });
window.addEventListener("scroll", repositionTooltip, { passive: true, capture: true });

// Hide on Escape
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  hideTooltip();
});

// -----------------------------
// Table of Contents
// Active table of contents highlighting based on visible sections
// -----------------------------

(function ($) {
  "use strict";

  var $toc = $("[data-ds-toc]");
  if ($toc.length === 0) return;

  var $links = $toc.find("a[href^='#']");
  var $sections = $("[data-ds-section]");

  function setActive(id) {
    $links.removeClass("is-active");
    $links.filter("[href='#" + id + "']").addClass("is-active");
  }

  // IntersectionObserver if available, fallback to scroll handler
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      // Pick the entry that is intersecting and closest to the top
      var visible = entries
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });

      if (visible.length) setActive(visible[0].target.id);
    }, {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: [0, 0.1, 0.25]
    });

    $sections.each(function () { observer.observe(this); });
  } else {
    function onScroll() {
      var top = $(window).scrollTop();
      var currentId = null;

      $sections.each(function () {
        var $s = $(this);
        var sTop = $s.offset().top - 120;
        if (top >= sTop) currentId = $s.attr("id");
      });

      if (currentId) setActive(currentId);
    }

    $(window).on("scroll resize", onScroll);
    onScroll();
  }

  // Smooth scroll on click (optional)
  $toc.on("click", "a[href^='#']", function () {
    var href = $(this).attr("href");
    var $target = $(href);
    if ($target.length === 0) return;

    // Let the browser update the hash normally, but animate scroll
    var y = $target.offset().top - 88;
    $("html, body").stop(true).animate({ scrollTop: y }, 200);
    return false;
  });

})(jQuery);

// -----------------------------
// Copy-to-clipboard for code snippets
// Usage:
//   - Button: [data-copy-target="#id-of-code-element"]
//   - Code element should contain textContent of snippet (escaped HTML is fine)
// -----------------------------

(function ($) {
  "use strict";

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    // Fallback for non-secure contexts
    return new Promise(function (resolve, reject) {
      try {
        var $temp = $("<textarea>")
          .val(text)
          .css({ position: "fixed", left: "-9999px", top: "0", opacity: "0" })
          .appendTo(document.body);

        $temp.get(0).select();
        var ok = document.execCommand("copy");
        $temp.remove();
        ok ? resolve() : reject(new Error("Copy failed"));
      } catch (e) {
        reject(e);
      }
    });
  }

  $(document).on("click", "[data-copy-target]", function () {
    var $btn = $(this);
    var targetSel = $btn.attr("data-copy-target");
    if (!targetSel) return;

    var $code = $(targetSel);
    if ($code.length === 0) return;

    var text = $code.text();

    $btn.removeClass("is-copied is-failed");

    copyText(text).then(function () {
      $btn.addClass("is-copied");
      var prev = $btn.text();
      $btn.text("Copied");
      window.setTimeout(function () {
        $btn.text(prev);
        $btn.removeClass("is-copied");
      }, 1200);
    }).catch(function () {
      $btn.addClass("is-failed");
      var prev2 = $btn.text();
      $btn.text("Copy failed");
      window.setTimeout(function () {
        $btn.text(prev2);
        $btn.removeClass("is-failed");
      }, 1400);
    });
  });

})(jQuery);


  $(function () {
    var currentYear = new Date().getFullYear();

    $('.footer__copyright').each(function () {
      var $el = $(this);

      // Replace any existing year (e.g. 2023, 2024, 2025)
      $el.text(function (_, text) {
        return text.replace(/\b(19|20)\d{2}\b/, currentYear);
      });
    });
  });

