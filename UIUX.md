### UI/UX
- Consistent colour scheming and branding used.
- 'Home' button via AirBrB icon on top left of NavBar always available, for ease of navigation. NavBar is also visible on all pages.
- Most significant elements given central positions, such as the search bar, with sufficient spacing for emphasis. This ensures visibility.
- Icons used are intuitive and universal, such as a magnifying glass for search, a half circle with an exiting arrow for logout, a trash can for deletion, and a pencil for editing. Buttons also change style when hovered over. This ensures affordance.
- Popups for success or errors ensure the user receives feedback in response to interactions.
- Maintained visual hierarchy via font sizes and headings.
- Breadcrumbs and chevron icons used to facilitate traversal to previous pages.
- Fades and transitions used to make the user journey smooth.
- Non-logged in users are constrained in what they can do. In particular, the dropdown menu provides logged-in users with the options to only 'login' or 'register'.
- Minimal steps for users to carry out tasks to maintain efficiency of the user journey.

### Accessibility
- `alt` tags with appropriate descriptions used for images.
- Keyboard traps avoided so that keyboar dusers can `tab` through most elements.
- Used standard HTML elements, such as `form`, `button`, `textarea` and `input` rather than over-reliance on `div`.
- `aria-label` used on buttons without associated `label` elements, such as interactive icons.
- Packages used, such as `@reach/menu-button` include necessary aria attributes to indicate relationships between elements: for example, `aria-controls` for the dropdown. 
- Custom `aria-haspopup` labels used to indicate which buttons trigger a modal or dialog.
- Colour theme selected to enable sufficient contrast to improve readability.
- All Ids are unique.
- Error messages are succinct and temporary. The Toastify package also includes the role `alert` to assist screen readers.