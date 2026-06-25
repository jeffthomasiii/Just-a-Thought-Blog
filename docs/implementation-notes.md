# Just A Thought Blog Page Build Notes

This folder contains starter page builds for:

1. Podcast Coming Soon page
2. Resources Coming Soon page
3. Series landing page

## Suggested repo placement

Copy files this way:

```text
assets/css/jat-pages.css      -> assets/css/jat-pages.css
pages/podcast.html            -> podcast.html or pages/podcast.html
pages/resources.html          -> resources.html or pages/resources.html
pages/series.html             -> series.html or pages/series.html
```

If your existing Jekyll site keeps top-level pages at the root, place `podcast.html`, `resources.html`, and `series.html` at the root of the repo. The `permalink` front matter will still route them to:

```text
/podcast/
/resources/
/series/
```

## Image paths to create later

Recommended paths:

```text
/img/pages/bg-podcast-coming-soon.jpg
/img/pages/bg-resources-coming-soon.jpg
/img/pages/bg-series-landing.jpg
/img/pages/series-created-fallen-restored.jpg
/img/pages/series-biblical-marriage.jpg
/img/pages/series-hope-hard-places.jpg
/img/pages/series-faith-technology.jpg
/img/pages/series-camping-creation.jpg
/img/pages/series-leadership-character.jpg
```

The files currently use placeholder image blocks so the pages can display before the final images are added.

## Email signup forms

The signup forms currently use:

```html
action="#"
```

Replace this with your actual newsletter provider form action later.

## Fonts

The CSS assumes Playfair Display for headings and Source Sans 3 or Inter for body/navigation. If these are not already loaded in your layout, add Google Font imports or local font references in the site head.

## Notes

The page copy is intentionally calm and reflective. It avoids making the coming-soon pages feel empty while still being honest that the sections are not launched yet.
