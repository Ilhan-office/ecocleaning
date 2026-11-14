# EcoCleaning

An eight-page DAM104 coursework website for EcoCleaning's toxin-free, plant-based cleaning services. Business names, staff, testimonials, promotions, membership prices and benefits follow the supplied November 2026 Case Study. Booking and staff tracking are browser-only demonstrations.

## Run locally

Extract the complete project and double-click **index.html**, or use your browser's **Open File** command. Keep the folders together and follow the page links. No Live Server, npm, installation, internet connection or web server is needed. Enable JavaScript for mobile navigation and forms.

## Technology and structure

HTML5; CSS custom properties, Grid, Flexbox and media queries; JavaScript; jQuery 3.7.1; SlickNav 1.0.10; Lucide 0.468.0. All browser libraries are bundled locally with their licenses. Typography uses system fonts.

```text
index.html, about_us.html, services.html, packages.html
booking.html, events.html, contact.html, register.html
css/                         main.css, home.css, about.css
css/vendor/                  SlickNav styles
js/                          script.js
js/vendor/                   jQuery, SlickNav, Lucide and licenses
images/                      Hero WebP and image provenance
EcoCleaning-Documentation.pdf Implementation report (maximum 500 words)
ASSIGNMENT-AUDIT.md           Requirements, evidence and remaining limits
```

Development tools, backups and checks in `.tools/` are excluded from website assets and the submission ZIP.

## Pages and features

| Page | Implemented content |
| --- | --- |
| `index.html` | Hero, four services, process, three supplied testimonials and booking links |
| `about_us.html` | Establishment in 2015, mission, environmental commitment and three named staff |
| `services.html` | Four case-study services with booking/enquiry links |
| `packages.html` | Accessible comparison table: Basic Fresh Plan (£14.99/month), GreenHome Plan (£29.99/month), Ultimate EcoCare (£49.99/month), with exact supplied benefits |
| `booking.html` | Validated booking, one-time or recurring date generation, staff assignments and appointment status demo |
| `events.html` | Four supplied events/promotions; links preselect registration interest |
| `contact.html` | Validated enquiry demonstration and supplied customer-care role |
| `register.html` | Updates/event registration with required address and telephone, optional comments, and existing password checks |

Every page has a left-aligned home-linked wordmark, consistent two-tier navigation, resource aside, original dark footer, descriptive metadata, semantic landmarks and skip link. SlickNav replaces desktop navigation at 700px and below. Shared layout changes occur at 950px and 700px; the font baseline is 85% at 950px and below. Containers are 95% wide up to 1300px. Tables scroll locally on narrow screens. Homepage CSS has additional responsive refinements.

## Form validation

All forms prevent network submission, trim ordinary text, validate required fields and lengths, display native validity prompts and live feedback, and reset on success. Invalid controls receive `aria-invalid`. Submit buttons stay disabled until JavaScript is ready.

| Form | Rules |
| --- | --- |
| Booking | Name: 2-160 characters; valid email; phone: 7-20 permitted characters including at least 7 digits; required service, membership, frequency, date, time and address (5-500 characters). Notes optional, up to 1000 characters. Dates cannot precede the local current date. Recurring bookings require an integer count of 2-12. |
| Contact | Name: 2-160 characters; valid email; subject: 3-160 characters; message: 10-2000 characters. |
| Registration | First/last names: 2-80 characters each; valid email; phone as above; address: 5-500 characters; updates/event interest; acknowledgement checkbox. Password and confirmation: 8-128 characters, matching, with a letter and digit. Comments optional, up to 1000 characters. |

The tracker retains only service, membership, frequency, date/time, demo reference, staff assignment and status while the booking page is open. Monthly recurrence clamps to the month's last day, then restores the original day when possible. Status cannot become Assigned without a responsible staff member. The schedule can be cleared.

## Known limitations

- No server, database, authentication, real booking confirmation, availability checking, payment, enquiry delivery, account persistence or subscription activation. The tracker is an in-memory demonstration, not live staff location tracking. Reloading or leaving the booking page clears records.
- Staff names and roles follow the case study; assigning a responsible member demonstrates tracking and does not assert that management staff perform cleaning visits.
- The case study supplies no contact details, opening hours, event dates/locations, discount percentages or per-clean prices; these are not invented.
- Client-side checks do not verify real addresses, telephone ownership or email deliverability and do not replace server-side validation.
- “Mint orange” is not a standard CSS colour. Resource links use warm pastel orange (`#ffd0a8`), violet visited and cyan hover/focus on dark green. The impossible CSS instruction “float the logo to the centre” is implemented as visual centring with Grid.

## Verification and browser compatibility

Direct offline `file://` checks cover all eight pages at 320, 375, 700, 701, 768, 950, 951, 1300 and 1600px, keyboard/mobile navigation, form success and failure cases, and recurring-date/staff-tracking behaviour. Local file, asset and fragment targets are checked. See the audit for browser results and scope.

Use current Chrome, Edge, Firefox or Safari. The code requires modern Grid, Flexbox, CSS custom properties, `clamp()`, `:focus-visible`, `URLSearchParams`, `FormData` and `Object.fromEntries()`. Chrome and Edge were tested; Firefox, Safari, physical devices and assistive technologies were not tested here. Internet Explorer is unsupported. Native date pickers and validation messages vary by browser.

## Submission

`EcoCleaning-Submission.zip` contains the eight pages, required local assets, README, audit and PDF. Extract it and open `index.html`. Tooling, caches, Git metadata and backups are excluded. Review your programme's originality and AI-use disclosure rules before submitting; no grade or full accessibility certification is claimed.
