# EcoCleaning

A static, eight-page coursework website presenting cleaning services, package comparisons, events, and browser-based booking, contact and registration demonstrations. Forms validate locally and display feedback; they do not submit data to a backend.

## Technology stack

- HTML5 and CSS3, including custom properties, Grid, Flexbox and media queries.
- JavaScript with jQuery 3.7.1 loaded from code.jquery.com.
- Lucide 0.468.0 icons loaded from jsDelivr on the homepage; inline SVG icons on the About page.
- System fonts (Arial/Helvetica and Georgia) and a local WebP hero image.
- No build process, npm packages or application server required.

## Folder structure

```text
ecocleaning-separate-html/
|-- index.html
|-- about_us.html
|-- services.html
|-- packages.html
|-- booking.html
|-- events.html
|-- contact.html
|-- register.html
|-- css/
|   |-- main.css       # Shared layout, components and responsive rules
|   |-- home.css       # Homepage hero and service cards
|   `-- about.css      # About-page values section
|-- js/
|   `-- script.js      # Menu interaction and form validation
|-- images/
|   |-- eco-cleaning-hero.webp
|   `-- README.md
|-- EcoCleaning-Documentation.pdf
|-- README.md
`-- README.txt
```

Local tooling under `.tools/` and agent configuration are development resources, not website assets.

## Available pages

| File | Content |
| --- | --- |
| `index.html` | Hero image, service cards, process and booking links |
| `about_us.html` | Project story and values |
| `services.html` | Four service descriptions with booking/enquiry links |
| `packages.html` | Four-package comparison table and demonstration prices |
| `booking.html` | Contact details, service, package, frequency, date, time, address and optional notes |
| `events.html` | Static event/news cards and related links |
| `contact.html` | Enquiry form and fictional contact details |
| `register.html` | Demonstration registration form |

## Run locally

1. Download or extract the complete project, retaining its folder structure.
2. Double-click `index.html`, or use a browser's **Open File** command to open it.
3. Follow the relative links to the remaining pages. No Live Server, npm or terminal command is needed.

Allow internet access for jQuery and homepage Lucide icons. Without jQuery, the mobile menu and scripted form validation/feedback do not operate. The forms use `novalidate`, so their normal validation flow depends on the script. Local styles, images and ordinary page links do not require a network connection.

## Navigation and implemented features

- Repeated sticky header with seven primary links and active styling; registration links in the utility bar and footer.
- At widths up to 700px, a button toggles the mobile navigation and updates `aria-expanded`. Selecting a navigation link closes the menu.
- Shared 95%-width containers capped at 1300px. Main layout breakpoints are 950px and 700px; homepage styles include additional adjustments at 1050px and 951-1100px.
- Responsive cards and forms; the package table scrolls horizontally when needed.
- Semantic landmarks, labelled form controls, polite live feedback, input focus outlines, descriptive hero-image alternative text and reduced-motion rules for home service-card transitions.
- Distinct page titles, a shared meta description, English language declarations and viewport metadata.

## Form validation

All three forms intercept submission using jQuery, call native `checkValidity()` and `reportValidity()`, and display success/error feedback. Successful validation resets the form.

| Form | Implemented rules |
| --- | --- |
| Booking | Name: at least 2 characters; email: native email validity; phone: 7-20 characters matching `[0-9 +()-]{7,20}`. Service, package, frequency, date, preferred time and address are required; frequency defaults to One-time. The minimum date is set to the local current date when the page loads. Special notes are optional. |
| Contact | Name: at least 2 characters; valid email; subject: at least 3 characters; message: at least 10 characters. All fields are required. |
| Registration | First and last names: at least 2 characters; valid email; both password fields: at least 8 characters; passwords must match and contain at least one letter and one digit. Terms checkbox is required. |

## Known limitations

- Frontend only: no database, authentication, account persistence, enquiry delivery, payment processing, appointment creation, staff assignment or availability checks. Booking-guide text describes a proposed process, not implemented automation.
- Service/package links open destination pages without preselecting form values. Frequency selections do not create recurring appointments.
- Client-side validation is not server-side security. Names/addresses are not trimmed or semantically verified; the phone pattern checks allowed characters and length, not a real telephone number.
- Contact details and prices are coursework placeholders; events are static content.
- All pages use the same meta description. Accessibility conformance and a full cross-browser test matrix have not been established.
- The DAM104 Assignment Instructions, Case Study and Rubric were unavailable during this documentation pass; compliance against those documents has not been verified.

## Browser compatibility

Use a current Chrome, Edge, Firefox or Safari release. The implementation relies on Grid, Flexbox, CSS custom properties, `clamp()`, `:focus-visible`, `FormData`, `Object.fromEntries()` and `String.padStart()`. Older browsers, including Internet Explorer, are unsuitable. Date-picker presentation and validation messages vary by browser. These are source-based compatibility expectations, not claims of completed browser testing.
