# Input Tel Dropdown >> Examples ||30

```js script
import { html } from '@mdjs/mdjs-preview';
import '@lion/select-rich/define';
import './src/intl-input-tel-dropdown.js';
```

## Input Tel International

A visually advanced Subclasser implementation of `LionInputTelDropdown`.

Inspired by:

- [intl-tel-input](https://intl-tel-input.com/)
- [react-phone-input-2](https://github.com/bl00mber/react-phone-input-2)

```js preview-story
export const IntlInputTelDropdown = () => html`
  <intl-input-tel-dropdown
    .preferredRegions="${['NL', 'PH']}"
    .modelValue=${'+639608920056'}
    label="Telephone number"
    help-text="Advanced dropdown and styling"
    name="phoneNumber"
  ></intl-input-tel-dropdown>
`;
```
