// assets/js/90-system.navigation.js

// Published = link, Unpublished = disabled span / disabled card
window.GEN2_SIDE_NAV = {
  foundations: [
    { title: "Overview", href: "foundations/index.html", published: true },

    {
      title: "Layout",
      href: "foundations/layout.html",
      published: true,
      image: "assets/images/layout.png",
      description:
        "Defines core layout structures, columns and content composition.",
    },
    {
      title: "Spacing",
      href: "foundations/spacing.html",
      published: true,
      image: "assets/images/spacing.png",
      description: "Defines spacing scale, rhythm and vertical flow.",
    },
    {
      title: "Typography",
      href: "foundations/typography.html",
      published: true,
      image: "assets/images/typography.png",
      description:
        "Defines typographic roles, hierarchy and readability principles.",
    },
        {
      title: "Colour",
      href: "foundations/colour.html",
      published: true,
      image: "assets/images/colour.png",
      description:
        "Defines colour roles, contexts and semantic usage across the system.",
    },
    {
      title: "Elevation",
      href: "foundations/elevation.html",
      published: true,
      image: "assets/images/elevation.png",
      description: "Defines layering, depth and surface hierarchy.",
    },
  ],

  // Components has a 3rd level: groups -> pages
  componentsOverview: [
    { title: "Overview", href: "components/index.html", published: true },
  ],

  components: [
    {
      title: "Actions",
      published: true,
      children: [
        {
          title: "Button",
          href: "components/actions/button.html",
          published: true,
          image: "assets/images/components/button.png",
          description:
            "Triggers a clear, immediate action such as submitting or confirming.",
        },
        {
          title: "Link",
          href: "components/actions/link.html",
          published: false,
          image: "assets/images/components/link.png",
          description: "Navigates users to destinations and resources.",
        },
        {
          title: "Action menu",
          href: "components/actions/action-menu.html",
          published: false,
          image: "assets/images/components/action-menu.png",
          description: "Groups contextual actions behind a single trigger.",
        },
      ],
    },

    {
      title: "Content & Containers",
      published: true,
      children: [
        {
          title: "Card",
          href: "components/content-containers/card.html",
          published: false,
          image: "assets/images/components/card.png",
          description:
            "Groups related content into a reusable, contained surface.",
        },
        {
          title: "Accordion",
          href: "components/content-containers/accordion.html",
          published: false,
          image: "assets/images/components/accordion.png",
          description:
            "Reveals and hides related content sections within a page.",
        },
        {
          title: "Carousel",
          href: "components/content-containers/carousel.html",
          published: false,
          image: "assets/images/components/carousel.png",
          description:
            "Presents a horizontal, cards-only collection for browsing.",
        },
      ],
    },

    {
      title: "Navigation",
      published: true,
      children: [
        {
          title: "Breadcrumb",
          href: "components/navigation/breadcrumb.html",
          published: false,
          image: "assets/images/components/breadcrumb.png",
          description: "Shows where a page sits within the site hierarchy.",
        },
        {
          title: "Pagination",
          href: "components/navigation/pagination.html",
          published: false,
          image: "assets/images/components/pagination.png",
          description:
            "Navigates through paged collections and indicates current position.",
        },
        {
          title: "Tabs",
          href: "components/navigation/tabs.html",
          published: false,
          image: "assets/images/components/tabs.png",
          description:
            "Switches between related content sections within a page.",
        },
        {
          title: "Menu",
          href: "components/navigation/menu.html",
          published: false,
          image: "assets/images/components/menu.png",
          description: "Reveals navigation destinations on demand.",
        },
        {
          title: "Side navigation",
          href: "components/navigation/side-navigation.html",
          published: false,
          image: "assets/images/components/side-navigation.png",
          description: "Provides persistent navigation across site sections.",
        },
        {
          title: "In-page navigation",
          href: "components/navigation/in-page-navigation.html",
          published: false,
          image: "assets/images/components/in-page-navigation.png",
          description: "Links to sections within the current page.",
        },
      ],
    },

    {
      title: "Feedback & Status",
      published: true,
      children: [
        {
          title: "Message bar",
          href: "components/feedback/message-bar.html",
          published: false,
          image: "assets/images/components/message-bar.png",
          description:
            "Communicates system feedback, status or important notices.",
        },
        {
          title: "Badge",
          href: "components/feedback/badge.html",
          published: false,
          image: "assets/images/components/badge.png",
          description: "Displays short, supplementary labels or status.",
        },
        {
          title: "Tooltip",
          href: "components/feedback/tooltip.html",
          published: false,
          image: "assets/images/components/tooltip.png",
          description:
            "Provides brief, optional clarification on hover or focus.",
        },
        {
          title: "Modal",
          href: "components/feedback/modal.html",
          published: false,
          image: "assets/images/components/modal.png",
          description:
            "Presents focused content or decisions that require resolution.",
        },
      ],
    },
  ],

  patterns: [
    { title: "Overview", href: "patterns/index.html", published: false },

    // Navigation & Wayfinding
    {
      title: "Header navigation",
      href: "patterns/header-navigation.html",
      published: false,
      image: "assets/images/patterns/header-navigation.png",
      description:
        "Combines primary navigation, menus and responsive behaviour.",
    },
    {
      title: "Footer",
      href: "patterns/footer.html",
      published: false,
      image: "assets/images/patterns/footer.png",
      description:
        "Provides persistent access to secondary links and information.",
    },
    {
      title: "Mobile navigation drawer",
      href: "patterns/mobile-navigation-drawer.html",
      published: false,
      image: "assets/images/patterns/mobile-navigation-drawer.png",
      description:
        "Presents navigation in an off-canvas panel on small screens.",
    },

    // Discovery & Browsing
    {
      title: "Card listings",
      href: "patterns/card-listings.html",
      published: false,
      image: "assets/images/patterns/card-listings.png",
      description:
        "Displays collections of content as grids or lists of cards.",
    },
    {
      title: "Carousel rows",
      href: "patterns/carousel-rows.html",
      published: false,
      image: "assets/images/patterns/carousel-rows.png",
      description: "Presents curated content sections using card carousels.",
    },
    {
      title: "Results toolbar",
      href: "patterns/results-toolbar.html",
      published: false,
      image: "assets/images/patterns/results-toolbar.png",
      description:
        "Groups controls for sorting, view switching and result context.",
    },
    {
      title: "Pagination placement",
      href: "patterns/pagination-placement.html",
      published: false,
      image: "assets/images/patterns/pagination-placement.png",
      description: "Defines where pagination appears in relation to listings.",
    },

    // Content Presentation
    {
      title: "Detail page header",
      href: "patterns/detail-page-header.html",
      published: false,
      image: "assets/images/patterns/detail-page-header.png",
      description: "Presents primary media, title, metadata and actions.",
    },
    {
      title: "Metadata blocks",
      href: "patterns/metadata-blocks.html",
      published: false,
      image: "assets/images/patterns/metadata-blocks.png",
      description:
        "Displays structured supporting information such as dates and credits.",
    },
    {
      title: "Expandable text",
      href: "patterns/expandable-text.html",
      published: false,
      image: "assets/images/patterns/expandable-text.png",
      description:
        "Reveals additional content using a view more / less interaction.",
    },
    {
      title: "Empty states",
      href: "patterns/empty-states.html",
      published: false,
      image: "assets/images/patterns/empty-states.png",
      description: "Communicates the absence of content and guides next steps.",
    },

    // Feedback & Status
    {
      title: "Inline validation and error summary",
      href: "patterns/inline-validation.html",
      published: false,
      image: "assets/images/patterns/inline-validation.png",
      description: "Communicates form errors clearly and accessibly.",
    },
    {
      title: "Confirmation flow",
      href: "patterns/confirmation-flow.html",
      published: false,
      image: "assets/images/patterns/confirmation-flow.png",
      description: "Confirms user actions using menus, modals and feedback.",
    },
    {
      title: "Loading states",
      href: "patterns/loading-states.html",
      published: false,
      image: "assets/images/patterns/loading-states.png",
      description:
        "Indicates progress while content or actions are in progress.",
    },

    // Account & Personalisation
    {
      title: "Signed-in content rows",
      href: "patterns/signed-in-content-rows.html",
      published: false,
      image: "assets/images/patterns/signed-in-content-rows.png",
      description:
        "Displays personalised content such as continue watching or recently viewed.",
    },
    {
      title: "Access gating",
      href: "patterns/access-gating.html",
      published: false,
      image: "assets/images/patterns/access-gating.png",
      description:
        "Communicates access states and appropriate calls to action.",
    },
  ],

  pageTypes: [
    {
      title: "Overview",
      href: "page-types/index.html",
      published: true,
      image: "assets/images/page-types.png",
      description: "Page-level templates and composition guidance.",
    },
    {
      title: "Film page",
      href: "page-types/film.html",
      published: false,
      image: "assets/images/page-types/film.png",
      description: "Template and composition guidance for film detail pages.",
    },
    {
      title: "Browse page",
      href: "page-types/browse.html",
      published: false,
      image: "assets/images/page-types/browse.png",
      description:
        "Template and composition guidance for browse and results pages.",
    },
    {
      title: "Subject list",
      href: "page-types/subjects.html",
      published: false,
      image: "assets/images/page-types/subjects.png",
      description:
        "Template and composition guidance for subject and category listings.",
    },
  ],
};

// Inject into side nav
(function ($) {
  function normalisePath(path) {
    // remove query/hash and trailing slash
    return (path || "").split("?")[0].split("#")[0].replace(/\/$/, "");
  }

  function isCurrent(href) {
    var current = normalisePath(window.location.pathname);
    var target = normalisePath(href);

    // If you're developing locally with /index.html etc, match both ways:
    if (current === "") current = "/";

    return current === target;
  }

  function flattenComponentChildren(groups) {
    var out = [];

    (groups || []).forEach(function (group) {
      if (!group || !Array.isArray(group.children)) return;

      group.children.forEach(function (child) {
        out.push(child);
      });
    });

    return out;
  }

  function renderItem(item) {
    var $li = $('<li class="side-nav__item"></li>');

    if (item.published) {
      var $a = $('<a class="side-nav__link side-nav__link--level2"></a>')
        .attr("href", item.href)
        .text(item.title);

      if (isCurrent(item.href)) {
        $a.addClass("is-active");
      }

      $li.append($a);
    } else {
      var $span = $(
        '<span class="side-nav__link  side-nav__link--level2 side-nav__link--disabled" aria-disabled="true"></span>'
      ).text(item.title);

      $li.append($span);
    }

    return $li;
  }

  // 3rd level group renderer (for Components)
  function renderGroup(group, index, parentId) {
    var groupId = parentId + "-group-" + index;

    var $li = $(
      '<li class="side-nav__item side-nav__item--has-children"></li>'
    );

    // Group label as a button toggle (recommended)
    var $btn = $(
      '<button class="side-nav__toggle side-nav__toggle--level2" type="button"></button>'
    )
      .attr("aria-expanded", "false")
      .attr("aria-controls", groupId)
      .append(
        $('<span class="side-nav__label"></span>').text(group.title),
        $('<span class="side-nav__chev" aria-hidden="true"></span>').append(
          $('<i class="fa-solid fa-angle-down"></i>')
        )
      );

    var $ul = $(
      '<ul class="side-nav__sublist side-nav__sublist--level3" hidden></ul>'
    ).attr("id", groupId);

    if (Array.isArray(group.children)) {
      group.children.forEach(function (child) {
        $ul.append(renderItem(child));
      });
    }

    // Auto-open group if it contains active page
    if ($ul.find(".is-active").length) {
      $btn.attr("aria-expanded", "true");
      $ul.addClass("is-open"); // optional class if your CSS uses it
    }

    $li.append($btn, $ul);
    return $li;
  }

  function injectSection(selector, items, mode, opts) {
    var $target = $(selector);
    if (!$target.length) return;

    var options = opts || {};
    if (!options.append) $target.empty();

    if (mode === "groups") {
      (items || []).forEach(function (group, i) {
        $target.append(renderGroup(group, i, $target.attr("id") || "nav"));
      });
    } else {
      (items || []).forEach(function (item) {
        $target.append(renderItem(item));
      });
    }

    if ($target.find(".is-active").length) {
      var id = $target.attr("id");
      if (id) {
        var $topToggle = $('[aria-controls="' + id + '"]');
        $topToggle.attr("aria-expanded", "true");
      }
    }
  }

  // Cards (overview grids)
  function renderCard(item) {
    var $li = $("<li></li>");

    var isPublished = !!item.published;

    // Link if published, otherwise non-interactive card wrapper
    var $card = isPublished
      ? $('<a class="card card--link"></a>').attr("href", item.href)
      : $('<div class="card card--disabled" aria-disabled="true"></div>');

    // Header image (optional)
    if (item.image) {
      $card.append(
        $('<header class="card__header"></header>').append(
          $('<img class="card__image" loading="lazy" alt=""></img>').attr(
            "src",
            item.image
          )
        )
      );
    }

    // Title
    $card.append(
      $('<div class="card__body"></div>').append(
        $('<h3 class="card__title"></h3>').text(item.title)
      )
    );

    // Meta / description (optional)
    if (item.description) {
      $card.append(
        $('<footer class="card__footer"></footer>').append(
          $('<p class="card__meta"></p>').text(item.description)
        )
      );
    }

    // Optional active state
    if (isPublished && item.href && isCurrent(item.href)) {
      $card.addClass("is-active");
    }

    $li.append($card);
    return $li;
  }

  function injectCards(selector, items, options) {
    var $target = $(selector);
    if (!$target.length) return;

    $target.empty();

    var opts = options || {};
    var includeOverview = opts.includeOverview !== false; // default true

    // Filter: only items with href (and optionally hide "Overview" itself)
    var filtered = (items || []).filter(function (it) {
      if (!it || !it.href) return false;
      if (!includeOverview && String(it.title).toLowerCase() === "overview")
        return false;
      return true;
    });

    filtered.forEach(function (item) {
      $target.append(renderCard(item));
    });
  }

  $(function () {
    if (!window.GEN2_SIDE_NAV) return;

    // Existing side-nav injection
    injectSection(
      "#side-nav-foundations",
      window.GEN2_SIDE_NAV.foundations,
      "items"
    );
    injectSection(
      "#side-nav-components",
      window.GEN2_SIDE_NAV.componentsOverview,
      "items"
    );
    injectSection(
      "#side-nav-components",
      window.GEN2_SIDE_NAV.components,
      "groups",
      { append: true }
    );
    injectSection("#side-nav-patterns", window.GEN2_SIDE_NAV.patterns, "items");
    injectSection(
      "#side-nav-page-types",
      window.GEN2_SIDE_NAV.pageTypes,
      "items"
    );

    // Overview grids (only run if the UL exists on that page)

    // Foundations overview page:
    injectCards(
      "#overview-grid-foundations",
      window.GEN2_SIDE_NAV.foundations,
      { includeOverview: false }
    );

    // Components overview page (cards for groups):
    injectCards(
      "#overview-grid-components",
      flattenComponentChildren(window.GEN2_SIDE_NAV.components)
    );

    // Patterns overview page:
    injectCards("#overview-grid-patterns", window.GEN2_SIDE_NAV.patterns, {
      includeOverview: false,
    });

    // Page types overview page:
    injectCards("#overview-grid-page-types", window.GEN2_SIDE_NAV.pageTypes, {
      includeOverview: false,
    });
  });
})(jQuery);

// Injects "Previous / Next" article links at the end of each doc page
(function () {
  if (!window.GEN2_SIDE_NAV) return;

  // ---- Config -------------------------------------------------------------

  // Only include pages that are published. Set to false if you want prev/next
  // to include unpublished pages too.
  var ONLY_PUBLISHED = true;

  // Where to inject. If this selector doesn't exist, we'll append to <article>.
  var INJECT_SELECTOR = ".content.content--prose"; // your article shell

  // Optional: exclude pages from the sequence (e.g., home page, index)
  var EXCLUDE_HREFS = new Set([
    // "index.html"
  ]);

  // ---- Helpers ------------------------------------------------------------

  function normalisePath(href) {
    // Turn nav hrefs like "components/actions/button.html" into a comparable path.
    // Also normalise current location which may include repo folder on GitHub Pages.
    if (!href) return "";

    // Remove any leading slash for consistency
    href = String(href).replace(/^\/+/, "");

    // Remove repo folder prefix if present in location (e.g. /system/)
    // and also if someone accidentally stored "/system/..." in href.
    var repo = "system";
    href = href.replace(new RegExp("^" + repo + "\\/"), "");

    // Collapse ./ and duplicate slashes
    href = href.replace(/^\.\//, "").replace(/\/{2,}/g, "/");

    return href;
  }

  function getCurrentPath() {
    var path = window.location.pathname || "";
    path = path.replace(/^\/+/, "");

    // Strip repo folder for GitHub Pages project sites
    // e.g. system/foundations/colour.html -> foundations/colour.html
    var repo = "system";
    if (path === repo) path = "";
    if (path.startsWith(repo + "/")) path = path.slice(repo.length + 1);

    // If you land on a folder, treat it as index.html
    if (path.endsWith("/")) path += "index.html";
    if (path === "") path = "index.html";

    return normalisePath(path);
  }

  function isEligible(item) {
    if (!item || !item.href) return false;
    if (EXCLUDE_HREFS.has(item.href)) return false;
    if (ONLY_PUBLISHED && item.published !== true) return false;
    return true;
  }

  function pushIfEligible(list, item, meta) {
    if (!isEligible(item)) return;
    list.push({
      title: item.title,
      href: normalisePath(item.href),
      // Optional meta for labels if you ever want it
      group: meta && meta.group ? meta.group : null,
      section: meta && meta.section ? meta.section : null,
    });
  }

  // Flatten in the order you want the reading sequence to be.
  // This order will control "Prev / Next".
  function buildSequence(nav) {
    var seq = [];

    // Foundations (Overview + pages)
    (nav.foundations || []).forEach(function (item) {
      pushIfEligible(seq, item, { section: "Foundations" });
    });

    // Components overview
    (nav.componentsOverview || []).forEach(function (item) {
      pushIfEligible(seq, item, { section: "Components" });
    });

    // Components groups -> children
    (nav.components || []).forEach(function (group) {
      (group.children || []).forEach(function (child) {
        pushIfEligible(seq, child, {
          section: "Components",
          group: group.title,
        });
      });
    });

    // Patterns
    (nav.patterns || []).forEach(function (item) {
      pushIfEligible(seq, item, { section: "Patterns" });
    });

    // Page types
    (nav.pageTypes || []).forEach(function (item) {
      pushIfEligible(seq, item, { section: "Page types" });
    });

    return seq;
  }

  function findCurrentIndex(seq, currentPath) {
    for (var i = 0; i < seq.length; i++) {
      if (seq[i].href === currentPath) return i;
    }
    return -1;
  }

  function renderPrevNext(prev, next) {
    // Uses your existing Link component style hooks (adjust class names as needed)
    var html = '<nav class="article-pager" aria-label="Article navigation">';
    html += '<div class="article-pager__inner">';

    if (prev) {
      html +=
        '<a class="article-pager__link article-pager__link--prev" href="' +
        prev.href +
        '">' +
        '<i class="fa-solid fa-angle-left"></i>' +
        '<span class="article-pager__title">' +
        escapeHtml(prev.title) +
        "</span>" +
        "</a>";
    } else {
      html +=
        '<span class="article-pager__link article-pager__link--prev article-pager__link--empty" aria-hidden="true"></span>';
    }

    if (next) {
      html +=
        '<a class="article-pager__link article-pager__link--next" href="' +
        next.href +
        '">' +
        '<span class="article-pager__title">' +
        escapeHtml(next.title) +
        "</span>" +
        '<i class="fa-solid fa-angle-right"></i>' +
        "</a>";
    } else {
      html +=
        '<span class="article-pager__link article-pager__link--next article-pager__link--empty" aria-hidden="true"></span>';
    }

    html += "</div></nav>";
    return html;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function inject(html) {
    var target = document.querySelector(INJECT_SELECTOR);
    if (!target) target = document.querySelector("article");
    if (!target) return;

    var wrapper = document.createElement("div");
    wrapper.className = "article-pager-wrap";
    wrapper.innerHTML = html;

    target.appendChild(wrapper);
  }

  // ---- Run ----------------------------------------------------------------

  var seq = buildSequence(window.GEN2_SIDE_NAV);
  var current = getCurrentPath();
  var index = findCurrentIndex(seq, current);

  if (index === -1) return; // not in the sequence (or excluded)

  var prev = index > 0 ? seq[index - 1] : null;
  var next = index < seq.length - 1 ? seq[index + 1] : null;

  inject(renderPrevNext(prev, next));
})();
