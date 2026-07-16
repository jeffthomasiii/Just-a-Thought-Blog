# DS-06 — Professional Background Rebuild Notes

**Status:** In progress  
**Branch:** `agent/ds-06-professional-background`

## Implemented

- Replaced the invalid nested document structure in `cv.html` with valid Jekyll page content.
- Retained `/cv/` while changing the reader-facing title to `Professional Background`.
- Assigned the page to the shared profile archetype.
- Added a profile hero with current role, location, 29 years of AECO experience, contact actions, LinkedIn, and print/save-PDF behavior.
- Reorganized the content into Professional Summary, Current Role, Career Experience, Leadership and Affiliations, Speaking and Writing, Education and Credentials, Technical Expertise, and a closing connection to Just A Thought.
- Updated the employer and title to ARKANCE and Technology Consultant.
- Updated education to Bachelor of Science in Industrial Design, ITT Technical Institute, 1997.
- Distinguished former or expired Autodesk certifications from current credentials.
- Updated Autodesk and collaboration terminology, including Autodesk Forma, Forma Design Collaboration, Autodesk Construction Cloud, BIM Collaborate Pro, and the Autodesk AEC Collection.
- Added a dedicated, fully scoped Professional Background stylesheet with responsive and print treatments.
- Added an optional body-class mechanism to the default layout and applied a page-specific print scope to `/cv/`.
- Added Professional Background links from About and the footer.

## Validation pending

- Jekyll and Sass production build.
- Valid single-document HTML output with no nested `DOCTYPE`, `html`, `head`, or `body` elements.
- Desktop, tablet, and mobile visual review.
- Light- and dark-mode review.
- Print preview and page-break review.
- Keyboard and visible-focus review.
- Contact, LinkedIn, About, blog, and footer-link validation.
- Heading hierarchy, landmarks, list semantics, labels, and external-link review.
- Confirmation that Professional Background styles do not affect other pages.

## Deferred

- The full About page redesign remains DS-07.
- A downloadable, separately maintained résumé file is not being introduced in this work item.
- The primary navigation remains unchanged; Professional Background is linked from About and the footer.
- Future employment, credential, speaking, or affiliation changes will require content maintenance as facts change.
