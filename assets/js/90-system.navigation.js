// assets/js/90-system.navigation.js

// Published = link, Unpublished = disabled span / disabled card
window.GEN2_SIDE_NAV = {
  foundations: [
    {
      title: "Overview",
      href: "/foundations/index.html",
      published: true,
    },
    {
      title: "Colour",
      href: "/foundations/colour.html",
      published: true,
      image: "/assets/images/colour.png",
      description: "Tokens, palettes and usage guidance."
    },
    {
      title: "Typography",
      href: "/foundations/typography.html",
      published: true,
      image: "/assets/images/typography.png",
      description: "Type scale, styles and hierarchy."
    },
    {
      title: "Spacing",
      href: "/foundations/spacing.html",
      published: false,
      image: "/assets/images/spacing.png",
      description: "Spacing scale and layout rhythm."
    },
    {
      title: "Layout",
      href: "/foundations/layout.html",
      published: false,
      image: "/assets/images/layout.png",
      description: "Lorem ipsum compnent dolor sit"
    },
    {
      title: "Elevation",
      href: "/foundations/elevation.html",
      published: false,
      image: "/assets/images/elevation.png",
      description: "Lorem ipsum compnent dolor sit"
    }
  ],

  // Components has a 3rd level: groups -> pages
  components: [
    {
      title: "Actions",
      published: true,
      children: [
        {
          title: "Buttons",
          href: "/components/actions/buttons.html",
          published: true,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit"
        },
        {
          title: "Links",
          href: "/components/actions/links.html",
          published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit"
        }
      ]
    },
    {
      title: "Containers",
      published: true,
      href: "/components/containers/index.html",
      children: [
        {
          title: "Modal", href: "/components/containers/modal.html",
          published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit"
        },
        {
          title: "Drawer", href: "/components/containers/drawer.html",
          published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit"
        }
      ]
    },
    {
      title: "Navigation",
      published: true,
      href: "/components/navigation/index.html",
      children: [
        {
          title: "Breadcrumbs",
          href: "/components/navigation/breadcrumbs.html",
          published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit"
        },
        {
          title: "Tabs",
          href: "/components/navigation/tabs.html",
          published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit"
        }
      ]
    }
  ],

  patterns: [
    {
      title: "Overview",
      href: "/patterns/index.html",
      published: false,
      image: "/assets/images/patterns.png",
      description: "Reusable solutions to common UX problems."
    },
    {
      title: "Search",
      href: "/patterns/search.html",
      published: false,
      image: "/assets/images/patterns/search.png",
      description: "Findability patterns and behaviours."
    },
    { title: "Filtering", href: "/patterns/filtering.html", published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit" },
    { title: "Pagination", href: "/patterns/pagination.html", published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit" }
  ],

  pageTypes: [
    {
      title: "Overview",
      href: "/page-types/index.html",
      published: false,
      image: "/assets/images/page-types.png",
      description: "Page-level templates and composition guidance."
    },
    { title: "Film page", href: "/page-types/film.html", published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit" },
    { title: "Browse page", href: "/page-types/browse.html", published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit" },
    { title: "Subject list", href: "/page-types/subjects.html", published: false,
          image: "https://placehold.co/600x400",
          description: "Lorem ipsum compnent dolor sit" }
  ]
};


// Inject into side nav
(function ($) {
  function normalisePath(path) {
    // remove query/hash and trailing slash
    return (path || "")
      .split("?")[0]
      .split("#")[0]
      .replace(/\/$/, "");
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
      var $span = $('<span class="side-nav__link  side-nav__link--level2 side-nav__link--disabled" aria-disabled="true"></span>')
        .text(item.title);

      $li.append($span);
    }

    return $li;
  }

  // 3rd level group renderer (for Components)
  function renderGroup(group, index, parentId) {
    var groupId = parentId + "-group-" + index;

    var $li = $('<li class="side-nav__item side-nav__item--has-children"></li>');

    // Group label as a button toggle (recommended)
    var $btn = $('<button class="side-nav__toggle side-nav__toggle--level2" type="button"></button>')
      .attr("aria-expanded", "false")
      .attr("aria-controls", groupId)
      .append(
        $('<span class="side-nav__label"></span>').text(group.title),
        $('<span class="side-nav__chev" aria-hidden="true"></span>').append(
          $('<i class="fa-solid fa-angle-down"></i>')
        )
      );

    var $ul = $('<ul class="side-nav__sublist side-nav__sublist--level3" hidden></ul>').attr("id", groupId);

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

  function injectSection(selector, items, mode) {
    var $target = $(selector);
    if (!$target.length) return;

    $target.empty();

    if (mode === "groups") {
      items.forEach(function (group, i) {
        $target.append(renderGroup(group, i, $target.attr("id") || "nav"));
      });
    } else {
      items.forEach(function (item) {
        $target.append(renderItem(item));
      });
    }

    // If any injected item is active, auto-open the parent accordion (top level)
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
    var $li = $('<li></li>');

    var isPublished = !!item.published;

    // Link if published, otherwise non-interactive card wrapper
    var $card = isPublished
      ? $('<a class="card card--link"></a>').attr("href", item.href)
      : $('<div class="card card--disabled" aria-disabled="true"></div>');

    // Header image (optional)
    if (item.image) {
      $card.append(
        $('<header class="card__header"></header>').append(
          $('<img class="card__image" loading="lazy" alt=""></img>').attr("src", item.image)
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
      if (!includeOverview && String(it.title).toLowerCase() === "overview") return false;
      return true;
    });

    filtered.forEach(function (item) {
      $target.append(renderCard(item));
    });
  }


  $(function () {
    if (!window.GEN2_SIDE_NAV) return;

    // Existing side-nav injection
    injectSection("#side-nav-foundations", window.GEN2_SIDE_NAV.foundations, "items");
    injectSection("#side-nav-components", window.GEN2_SIDE_NAV.components, "groups");
    injectSection("#side-nav-patterns", window.GEN2_SIDE_NAV.patterns, "items");
    injectSection("#nav-page-types", window.GEN2_SIDE_NAV.pageTypes, "items");

    // Overview grids (only run if the UL exists on that page)

    // Foundations overview page:
    injectCards("#overview-grid-foundations", window.GEN2_SIDE_NAV.foundations, { includeOverview: false });

    // Components overview page (cards for groups):
    injectCards(
      "#overview-grid-components",
      flattenComponentChildren(window.GEN2_SIDE_NAV.components)
    );

    // Patterns overview page:
    injectCards("#overview-grid-patterns", window.GEN2_SIDE_NAV.patterns, { includeOverview: false });

    // Page types overview page:
    injectCards("#overview-grid-page-types", window.GEN2_SIDE_NAV.pageTypes, { includeOverview: false });
  });

})(jQuery);