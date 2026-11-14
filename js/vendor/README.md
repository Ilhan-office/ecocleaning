# Bundled browser libraries

These files are runtime website assets, not build tools. They are bundled so the
coursework runs directly from local files without network access or npm.

| File | Version | Source | License |
| --- | --- | --- | --- |
| `jquery-3.7.1.min.js` | 3.7.1 | https://code.jquery.com/jquery-3.7.1.min.js | MIT; `jQuery-LICENSE.txt` |
| `jquery.slicknav-1.0.10.min.js` | 1.0.10 | https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/jquery.slicknav.min.js | MIT; `SlickNav-LICENSE.txt` |
| `lucide-0.468.0.min.js` | 0.468.0 | https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js | ISC, with Feather portions under MIT; `Lucide-LICENSE.txt` and the distributed script notices |

SlickNav CSS is in `css/vendor/slicknav-1.0.10.min.css` from
https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/slicknav.min.css.
Official setup and options: https://github.com/ComputerWolf/SlickNav.
Library distribution code is unchanged. Project-specific styling and expanded-state
accessibility support are in `css/main.css` and `js/script.js`.
