# EcoCleaning DAM104 implementation audit

Audit date: 14 November 2026. The existing eight-page design was retained while verified content, navigation, validation and responsive requirements were completed. This is a frontend coursework implementation; it is not a production booking service.

## Source authority

- **DAM104 Case Study Nov 2026.docx:** business facts and case-specific design requirements.
- **DAM104 Assignment Instructions Nov 2026.docx:** mandatory pages, semantic structure, responsive design, SEO metadata, navigation, registration fields, JavaScript/jQuery evaluation, PDF and ZIP submission.
- **Web Technologies Rubric.docx:** ten assessment categories, each worth four points. The document consists of five screenshots, which were inspected visually. Some rating prose is cut off at screenshot edges; no missing text or guaranteed mark is inferred.

Instructions inside the documents were treated as assessment specifications under the user's explicit request to audit and implement them. They do not authorise publication, submission to a university, or claims of academic originality. No submission or publication was performed.

## Case-study business requirements

| Requirement | Before | Implemented evidence / qualification |
| --- | --- | --- |
| Online booking | Form displayed a confirmation only | `booking.html` and `js/script.js` validate details and generate appointment records in memory. No live confirmation or availability check. |
| Service-package comparison | Invented package names and per-clean prices | `packages.html` now compares the three supplied membership plans and exact monthly prices/benefits. Selection links preselect the booking membership field. |
| Recurring appointments | Frequency selection only | One-time, weekly, fortnightly and monthly schedules now produce dated rows. Repeating previews accept 2-12 appointments; short months and leap years are handled. This preview limit is an implementation constraint, not a business policy. |
| Staff tracking | No implementation | Booking tracker supports responsible-staff selection, Planned/Assigned/Completed/Cancelled status, feedback and clearing records. Assigning staff automatically updates Planned/Assigned status. Assigned requires a responsible person. No real-time location tracking or shared staff system. |
| Environmental commitment | Partial wording | Exact toxin-free, plant-based commitment and mission appear throughout the site. |
| Establishment | Missing from About story | `about_us.html` states establishment in 2015 and the supplied purpose. |
| Hannah Lee | Missing | Director & Founder; oversees business strategy and eco-product selection. |
| Marcus Hill | Missing | Operations Supervisor; manages cleaning teams and training. |
| Chloe Walters | Missing | Customer Care Coordinator; handles bookings, scheduling, and queries. |
| Four services | Present with inconsistent names and unsupported scope promises | Exact names used: Eco Home Cleaning Packages, Deep Green Clean, Pet-Safe Cleaning, Office Eco-Cleaning Contracts. Unsupported room, move-in, seasonal and small-commercial coverage promises removed. |
| Basic Fresh Plan | Missing | £14.99/month; 1 discounted clean per month. |
| GreenHome Plan | Missing | £29.99/month; 2 discounted cleans + priority booking. |
| Ultimate EcoCare | Missing | £49.99/month; unlimited priority scheduling + free eco-products monthly. Unlimited scheduling is not described as unlimited free cleaning. |
| Satisfied users | Missing | Homepage quotes and names match Ruth K., Darren S. and Mina L. in the case study. Testimonials are attributed customer statements, not verified medical claims. |
| Events and promotions | Invented events and dates | All four supplied names appear on `events.html` and in the registration interest selector. Dates, locations and offer terms are not invented. |
| Unspecified business information | Fictional phone, email, hours, prices and service inclusions | Removed. Contact page uses the supplied customer-care staff role and clearly identifies the local enquiry demonstration. |

Staff assignment uses only the three supplied names and roles. It represents responsibility for a demonstration record; it does not invent cleaning employees or imply that directors personally perform cleaning visits.

## Case-study design specifications

| Specification | Final implementation |
| --- | --- |
| Home named `index.html`; meaningful other filenames | All eight existing filenames retained. |
| External `main.css`; optional `home.css` | Shared `css/main.css`, scoped `css/home.css` and existing `css/about.css`. |
| Semantic HTML | Header, navigation, main content, sections, article/figure content, aside and footer. |
| Company logo/name in header | Existing text wordmark retained, centred, responsive and linked home. No unrelated brand redesign. |
| “Float the logo to the centre” | Visual centring implemented with Grid; `float: centre` is invalid CSS. All tested widths verify the wordmark centre aligns with the viewport centre. |
| Additional resources in side section | A labelled resource aside on every page links to membership comparison, promotions, registration and tracking. It sits alongside mission content on larger screens and stacks on mobile. |
| Resource links without underlines | Scoped `.resource-aside a` styling. |
| “Mint orange”, violet visited, cyan hover/focus | “Mint orange” is not a standard CSS colour and has no hex value in the case study. Warm pastel orange `#ffd0a8` is used on dark green; visited `#ee82ee` and hover/focus `#00ffff`. This interpretation needs instructor confirmation if a specific shade was intended. |
| Border below header | Explicit `border-bottom` on `.site-header`. |
| Copyright entity | `&copy;` in every footer. |
| Dark footer, lavender text | Existing dark background retained; footer text and links use lavender. |
| Two-tier horizontal navigation, including Home | Consistent horizontal desktop primary menu with nested service, booking and events links. Separate submenu buttons support touch/keyboard input. Home exists independently of the linked logo. |
| Fluid 95% layout, maximum 1300px | Shared content containers are 95% wide and capped at 1300px. Full-width header/footer backgrounds remain. Internal reading/form widths may be narrower. Mobile hero corrected to 95%. |
| Viewport meta element | Present on all eight pages. |
| 950px media query, fonts at 85% | Root font baseline is 85% at 950px and below; rem-based typography inherits it. Viewport-based preferred sizes within heading `clamp()` rules are also multiplied by 0.85. |
| 700px SlickNav replacement | Genuine SlickNav 1.0.10, bundled locally, replaces the desktop menu at 700px and below. Its generated menu receives explicit labels, controls and expanded-state synchronisation. |
| Product/price table | Captioned membership comparison table with scoped column and row headers and a keyboard-focusable horizontal scroll region. |
| Validated registration | Required name, address, email, telephone, interest, passwords and acknowledgement; optional comments. JavaScript/jQuery evaluation precedes local acceptance. |
| Use supplied content; Lorem Ipsum for missing prose | Supplied business content takes precedence. No invented factual filler or Lorem Ipsum was needed; functional labels explain actual interactions. Existing visual headings remain where they make no unsupported business promise. |

## Assignment instructions and rubric mapping

| Task / rubric category | Evidence and quality checks |
| --- | --- |
| 1 Responsive web design and layout | Existing palette, image, cards and spacing retained. Grid/Flexbox layouts, fluid containers, stacked forms/cards and locally scrolling tables. All pages tested at nine viewport widths. |
| 2 Semantic elements and SEO | Every page has header/footer/main/aside/nav, one h1, English language and UTF-8 declarations, viewport, distinct descriptive title and description, plus relevant meta keywords. Homepage heading and booking action are immediately accessible. No search-ranking improvement is claimed. |
| 3 Navigation | Consistent menus on every page, active-page semantics, nested links, keyboard focus, submenu controls, Escape dismissal and mobile SlickNav. Resource/footer links supplement navigation. Offline local-file navigation verified without Live Server. |
| 4 CSS and formatting | Shared variables, reusable selectors and components; scoped home/About styles; explicit link states, footer treatment and responsive rules. |
| 5 Graphics design and typography | Existing contrast, repetition, alignment and proximity maintained through green/cream panels, consistent cards, serif headings and sans-serif body text. Existing WebP image retained; no unnecessary redesign. |
| 6 Accessibility | Skip link, landmarks, headings, form labels/autocomplete, visible focus, `aria-current`, `aria-expanded`, `aria-controls`, accessible submenu names, table captions/headers, live messages, `aria-invalid`, descriptive image text, decorative numbering hidden from assistive technology and reduced-motion support. Manual/automated browser checks do not constitute full accessibility certification. |
| 7 Registration form | Register for updates or one of the four supplied events; name, address, email, telephone and optional comments, clear labels, placeholders, password guidance and telephone format title. Original password matching/strength behaviour retained and strengthened. |
| 8 Data evaluation | jQuery submit interception with native validity APIs plus trimming, explicit length checks, phone digits/format, password rules, date minimum, integer recurrence bounds, known-value preselection and safe text insertion. Invalid fields show actionable messages and receive focus. |
| 9 Documentation | Updated real PDF, one readable page, 413 extracted words including headings; implementation examples and limitations, not a business-concept essay. Rendered and visually reviewed. README updated to match the implementation. |
| 10 Requirement specification | All specified public content and frontend interactions mapped above. Real operational booking, recurring execution and shared staff tracking remain outside this static implementation. No fabricated backend or production-compliance claim. |
| Source assets and submission | Local jQuery, SlickNav and Lucide assets with licenses; no runtime installation/network dependency. Clean `EcoCleaning-Submission.zip` excludes `.tools`, `.codex`, `.git`, caches, backups and the provided source documents. |
| Academic honesty / originality / deadline | No originality declaration, grade, deadline compliance or university submission is asserted. Existing AI-generated hero provenance remains in `images/README.md`; the student must review applicable disclosure rules and submission timing. |

## Verification record

- Chrome and Microsoft Edge: offline direct `file://` mode; eight pages at 320, 375, 700, 701, 768, 950, 951, 1300 and 1600px. The browser suite checks semantic metadata, labels/IDs, viewport overflow, wordmark centring, responsive type baseline, mobile and desktop menus, keyboard Escape and skip navigation.
- Functional checks include page links, plan/service/event preselection, invalid query values, registration/contact/booking failure and success cases, whitespace handling, phone digits, password strength/matching, required acknowledgement, past-date rejection, recurrence limits and integer evaluation.
- Scheduling checks cover today, weekly and fortnightly intervals, leap and non-leap February, restoration of the original monthly day, staff assignment and status, local table scrolling, clearing, reload behaviour and same-document tracker jumps when query parameters are present.
- Static verification checks every local HTML link, referenced asset and fragment target and confirms the copyright entity on each page. No missing targets were found.
- The full suite passed 365 checks each in Chrome and Edge. Additional Chrome checks passed for tablet touch submenu toggling, mobile keyboard Space activation and mobile page navigation.
- Desktop/mobile screenshots were generated for each page. PDF text extraction and rendering confirm one page, readable layout and 413 words. JavaScript syntax is checked with `node --check`.
- Browser test scripts, results, images and pre-change backups are under ignored `.tools/audit/`; they are not part of the website or submission archive.

## Remaining limitations

1. Operational booking and shared staff management require a backend, persistence, authentication/authorisation, server-side validation and availability/conflict rules. These are demonstrated locally rather than implemented as a live service. Recurrence generates a bounded preview and does not run future jobs.
2. Enquiries and registrations are not delivered or retained; memberships are not activated and no payments are taken. Personal form fields are reset after success; tracker records exclude personal contact information.
3. Exact “mint orange” colour intent is unresolved because the case study supplies no valid colour specification.
4. Firefox, Safari, real phones/tablets, screen readers, full WCAG conformance, production security and search indexing have not been independently certified here. Native date fields and validation wording vary by browser.
5. No guarantee of a rubric score is possible. The student remains responsible for academic disclosure, final submission and any instructor interpretation of the ambiguous specifications.

## Subsequent design preference

At the user's request, the original left-aligned navbar and original footer colours were restored. These preferences supersede the earlier centred-logo and lavender-footer specifications above. Desktop submenu and mobile SlickNav functionality remain. The restored layout was checked across all eight pages at eleven widths from 320px to 1600px. The implementation PDF and submission ZIP were refreshed.
