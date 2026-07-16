# Primary Hero Consistency Follow-Up

**Status:** Review  
**Branch:** `agent/hero-consistency-pass`  
**Pull request:** [#19 — Hero consistency pass across primary pages](https://github.com/jeffthomasiii/Just-a-Thought-Blog/pull/19)  
**Date:** 2026-07-16

## Reason for the follow-up

The completed brand refresh established a cohesive site, but the primary page heroes still reflected several separate implementations. The differences were most visible in kicker sizing, Series height, image treatment, About framing, stacked tablet order, and hero-button widths.

## Hero families retained

### Image-led landing heroes

- Home
- Series
- Podcast
- Resources

These pages share a framed copy-and-image composition, the same kicker and divider treatment, related title sizing, a common desktop media-height baseline, copy-to-image blending, consistent action sizing, and shared tablet/mobile media ratios.

### Compact utility heroes

- Posts
- Search

These remain intentionally image-free because their purpose is functional archive navigation. They now share the same kicker typography, divider rhythm, title hierarchy, action sizing, and desktop alignment.

### Framed profile hero

- About

About retains its narrative/profile purpose but now uses one bordered copy-and-image frame instead of a detached natural-ratio image. The photograph remains proportionally cropped with `object-fit: cover`, and the copy-to-image boundary follows the landing-page blend.

## Corrections implemented

- Corrected the collection-page paragraph selector that enlarged the Posts and Search kickers.
- Standardized primary hero kicker size, weight, spacing, divider width, copy rhythm, and action height.
- Added length-aware title sizing while keeping Home’s brief title as the largest display treatment.
- Brought Series into the Home-scale visual range by compacting the featured-series summary.
- Added the Home-style image-boundary blend to Series, Resources, and About.
- Reframed About as a full split hero with a desktop media-height baseline.
- Standardized desktop hero actions at 200px and retained full-width stacked actions on small screens.
- Shortened `Preview Planned Resources` to `Planned Resources`.
- Standardized stacked layouts to copy first and media second at tablet and mobile widths.
- Left the Posts archive cards and Recent Reflections presentation unchanged.

## Validation completed

- [x] Protected Jekyll and Sass builds.
- [x] Desktop comparison at 1440px.
- [x] Tablet comparison at 768px.
- [x] Mobile comparison at 390px.
- [x] Light- and dark-mode review.
- [x] Series no longer exceeds the Home hero visually on desktop.
- [x] About now reads as part of the shared framed hero family.
- [x] All primary hero kickers resolve to the same computed size.
- [x] Desktop hero buttons resolve to 200px × 44px without text overflow.
- [x] Small-screen actions stack at full width.
- [x] Landing/profile media uses 16:10 at tablet and 4:3 at mobile.
- [x] Copy precedes media in every stacked image-led/profile hero.
- [x] No horizontal overflow at 1440px, 768px, or 390px.
- [x] Visible focus remained present on tested hero actions in both themes.

## Desktop rendered measurements

The exact total height still responds to headline and supporting-content length, but the former Series outlier is removed:

- Home: approximately 705px
- Series: approximately 695px
- Podcast: approximately 734px
- Resources: approximately 748px
- About: approximately 697px
- Posts and Search utility heroes: approximately 245px

The limited variation is intentional and content-driven rather than the result of conflicting media ratios or minimum-height systems.

## Intentionally retained differences

- Posts and Search remain image-free.
- Posts and Search retain a right-aligned desktop action because they are utility pages.
- Home retains the largest short-form title treatment.
- Longer landing-page titles use a slightly reduced but related scale to avoid excessive wrapping.
- Individual hero copy lengths are not artificially truncated solely to force identical total heights.
