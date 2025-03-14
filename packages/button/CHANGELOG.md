# Change Log

## 0.17.0

### Minor Changes

- 672c8e99: New documentation structure
- aa8b8916: BREAKING CHANGE: Work without polyfill if possible

  When using [component composition](https://lit.dev/docs/composition/component-composition/) in a Lion Component we always made it very explicit which sub-components are used.
  On top of that we scoped these [sub components](https://open-wc.org/docs/development/scoped-elements/) to the [current shadow root](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md) allowing multiple version to be used simultaneously.

  To enable this features we relied on the fact that the `ScopedElementsMixin` did loaded the needed polyfill for us.

  We however over time got feedback from multiple consumers that lion components "break the app as soon as you load them".
  The reasons is/was that not everyone is always using `ScopedElementsMixin` or in full control of the app (or its load order).

  To quote the release notes of `ScopedElementsMixin` v2.1.0:

  > ScopedElementsMixin 2.x tried to be as convenient as possible by automatically loading the scoped custom elements registry polyfill.
  > This however led to a fatal error whenever you registered any component before ScopedElementsMixin was used.

  And this was the case.

  With the upgrade to `@open-wc/scoped-elements` v2.1.1 Lion now no longer automatically loads the polyfill through `ScopedElementsMixin`.

  This essentially means the polyfill became optional which results in the following behavior

  1. If polyfill is not loaded it will use the global registry as a fallback
  2. Log error if actually scoping is needed and polyfill is not loaded
  3. If you manually create elements you will need to handle polyfilled and not polyfilled cases now

  ```diff
  -  const myButton = this.shadowRoot.createElement('my-button');
  +  const myButton = this.createScopedElement('my-button');
  ```

  This also removes `@webcomponents/scoped-custom-element-registry` as a production dependency.

  If you need scoping be sure to load the polyfill before any other web component gets registered.

  It may look something like this in your HTML

  ```html
  <script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"></script>
  ```

  or if you have an SPA you can load it at the top of your app shell code

  ```js
  import '@webcomponents/scoped-custom-element-registry';
  ```

  You need scoping if you want to

  use 2 major versions of a web component (e.g. in an SPA pageA uses 1.x and pageB uses 2.x of color-picker)
  or you want to use the same tag name with different implementations (use tag color-picker from foo here and from bar here)

  See more details at

  - [Lion release blog post](https://lion-web.netlify.app/blog/lion-without-polyfills/)
  - [@open-wc/scoped-elements release blog post](https://open-wc.org/blog/scoped-elements-without-polyfill/)
  - [Change log of ScopedElementsMixin](https://github.com/open-wc/open-wc/blob/master/packages/scoped-elements/CHANGELOG.md#210)

### Patch Changes

- Updated dependencies [66531e3c]
- Updated dependencies [672c8e99]
- Updated dependencies [aa8b8916]
  - @lion/core@0.22.0

## 0.16.0

### Minor Changes

- 683d5c1c: Upgrade to latest Typescript. Keep in mind, some @ts-ignores were necessary, also per TS maintainer's advice. Use skipLibCheck in your TSConfig to ignore issues coming from Lion, the types are valid.

  **We also unfixed lion's dependencies (now using caret ^) on its own packages**, because it caused a lot of problems with duplicate installations for end users as well as subclassers and its end users. Both of these changes may affect subclassers in a breaking manner, hence the minor bump.

  Be sure to [read our Rationale on this change](https://lion-web.netlify.app/docs/rationales/versioning/) and what this means for you as a user.

### Patch Changes

- Updated dependencies [683d5c1c]
  - @lion/core@0.21.0

## 0.15.0

### Minor Changes

- 2b583ee7: Remove differentKeyEventNamesShimIE, since IE11 isn't supported any more

### Patch Changes

- 30805edf: Replace deprecated node folder exports with wildcard exports for docs
- be844663: Increase minimum click area to meet WCAG Success Criterion 2.5.5 Target Size (Enhanced)
- 2bd3c521: Rename customElementsManifest to customElements in package.json
- Updated dependencies [30805edf]
- Updated dependencies [495cb0c5]
- Updated dependencies [2b583ee7]
- Updated dependencies [83011918]
  - @lion/core@0.20.0

## 0.14.5

### Patch Changes

- c4562f7e: use html & unsafeStatic from @open-wc/testing instead of directly from lit
- Updated dependencies [9b81b69e]
- Updated dependencies [a2c66cd9]
- Updated dependencies [c4562f7e]
- Updated dependencies [c55d4566]
  - @lion/core@0.19.0

## 0.14.4

### Patch Changes

- Updated dependencies [bcf68ceb]
- Updated dependencies [d963e74e]
  - @lion/core@0.18.4

## 0.14.3

### Patch Changes

- 811b3294: Add files that result in customElements.define to sideEffect so build tools don't tree shake them
- Updated dependencies [ec03d209]
  - @lion/core@0.18.3

## 0.14.2

### Patch Changes

- Updated dependencies [8c06302e]
  - @lion/core@0.18.2

## 0.14.1

### Patch Changes

- 84131205: use mdjs-preview in docs for lit compatibility
- Updated dependencies [84131205]
  - @lion/core@0.18.1

## 0.14.0

### Minor Changes

- 57b2fb9f: - BREAKING: In `lion-button` package split of separate buttons for reset & submit:

  - LionButton (a clean fundament, **use outside forms**)
  - LionButtonReset (logic for. submit and reset events, but without implicit form submission logic: **use for reset buttons**)
  - LionButtonSubmit (full featured button: **use for submit buttons and buttons with dynamic types**)

  - fixed axe criterium for LionButton (which contained a native button to support form submission)
  - removed `_beforeTemplate()` & `_afterTemplate()` from LionButton

## 0.13.0

### Minor Changes

- 72067c0d: **BREAKING** Upgrade to [lit](https://lit.dev/) version 2

  This does not change any of the public APIs of lion.
  It however effects you when you have your own extension layer or your own components especially when using directives.
  See the [official lit upgrade guide](https://lit.dev/docs/releases/upgrade/).

  **BREAKING** Upgrade to [ScopedElements](https://open-wc.org/docs/development/scoped-elements/) version 2

  This version of `@open-wc/scoped-elements` is now following the [Scoped Custom Element Registries](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md) and automatically loads a polyfill [@webcomponents/scoped-custom-element-registry](https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry).

  This means tag names are no longer being rewritten with a hash.

  ```js
  import { css, LitElement } from 'lit';
  import { ScopedElementsMixin } from '@open-wc/scoped-elements';
  import { MyButton } from './MyButton.js';

  export class MyElement extends ScopedElementsMixin(LitElement) {
    static get scopedElements() {
      return {
        'my-button': MyButton,
      };
    }

    render() {
      return html`
        <my-button>click me</my-button>
      `;
    }
  }
  ```

  ```html
  <!-- before (ScopedElements 1.x) -->
  <my-element>
    #shadow-root
    <my-button-23243424>click me</my-button-23243424>
  </my-element>

  <!-- after (ScopedElements 2.x) -->
  <my-element>
    #shadow-root
    <my-button>click me</my-button>
  </my-element>
  ```

### Patch Changes

- Updated dependencies [72067c0d]
  - @lion/core@0.18.0

## 0.12.0

### Minor Changes

- 02e4f2cb: add simulator to demos

### Patch Changes

- Updated dependencies [02e4f2cb]
  - @lion/core@0.17.0

## 0.11.1

### Patch Changes

- f0527583: fix: expose members as protected for extension compat. till v1

## 0.11.0

### Minor Changes

- 43e4bb81: Type fixes and enhancements:

  - all protected/private entries added to form-core type definitions, and their dependents were fixed
  - a lot @ts-expect-error and @ts-ignore (all `get slots()` and `get modelValue()` issues are fixed)
  - categorized @ts-expect-error / @ts-ignore into:
    - [external]: when a 3rd party didn't ship types (could also be browser specs)
    - [allow-protected]: when we are allowed to know about protected methods. For instance when code
      resides in the same package
    - [allow-private]: when we need to check a private value inside a test
    - [allow]: miscellaneous allows
    - [editor]: when the editor complains, but the cli/ci doesn't

### Patch Changes

- 77a04245: add protected and private type info
- Updated dependencies [77a04245]
- Updated dependencies [43e4bb81]
  - @lion/core@0.16.0

## 0.10.1

### Patch Changes

- 59dad284: Removed lion-specific component namings from overview.md files

## 0.10.0

### Minor Changes

- f3e54c56: Publish documentation with a format for Rocket
- 5db622e9: BREAKING: Align exports fields. This means no more wildcards, meaning you always import with bare import specifiers, extensionless. Import components where customElements.define side effect is executed by importing from '@lion/package/define'. For multi-component packages this defines all components (e.g. radio-group + radio). If you want to only import a single one, do '@lion/radio-group/define-radio' for example for just lion-radio.

### Patch Changes

- Updated dependencies [f3e54c56]
- Updated dependencies [5db622e9]
  - @lion/core@0.15.0

## 0.9.1

### Patch Changes

- Updated dependencies [701aadce]
  - @lion/core@0.14.1

## 0.9.0

### Minor Changes

- b2f981db: Add exports field in package.json

  Note that some tools can break with this change as long as they respect the exports field. If that is the case, check that you always access the elements included in the exports field, with the same name which they are exported. Any item not exported is considered private to the package and should not be accessed from the outside.

### Patch Changes

- Updated dependencies [b2f981db]
  - @lion/core@0.14.0

## 0.8.11

### Patch Changes

- 33f639e8: Delay adding prevent event leakage handler by one frame. This is because it takes 1 frame longer for older browsers such as Firefox ESR 60, IE11 and old Edge to have the native form available as a property on the native button.

## 0.8.10

### Patch Changes

- Updated dependencies [8fb7e7a1]
- Updated dependencies [9112d243]
  - @lion/core@0.13.8

## 0.8.9

### Patch Changes

- 3fefc359: Fix button user-select for Edge/Safari by adding prefixes for the CSS rule.

## 0.8.8

### Patch Changes

- 98f1bb7e: Ensure all lit imports are imported from @lion/core. Remove devDependencies in all subpackages and move to root package.json. Add demo dependencies as real dependencies for users that extend our docs/demos.
- 718843e5: Set user-select to none on button, so that the inner text is not selectable.
- Updated dependencies [98f1bb7e]
  - @lion/core@0.13.7

## 0.8.7

### Patch Changes

- Updated dependencies [9fba9007]
  - @lion/core@0.13.6

## 0.8.6

### Patch Changes

- Updated dependencies [41edf033]
  - @lion/core@0.13.5

## 0.8.5

### Patch Changes

- 27020f12: Button fixes

  - make click event target predictable (always host)
  - do not override aria-labelledby from user

## 0.8.4

### Patch Changes

- Updated dependencies [cfbcccb5]
  - @lion/core@0.13.4

## 0.8.3

### Patch Changes

- Updated dependencies [e2e4deec]
  - @lion/core@0.13.3

## 0.8.2

### Patch Changes

- Updated dependencies [20ba0ca8]
  - @lion/core@0.13.2

## 0.8.1

### Patch Changes

- b910d6f7: On top of the 40x40px min height and width, set width/height to 100% so that the clickarea covers the entire width or height of the button.

## 0.8.0

### Minor Changes

- 26b60593: Several button improvements

  - remove click-area --> move styles to host::before
  - reduce css so that extending styles makes sense. Merge .btn with host.
  - reduce the template and remove the if else construction inside the template.
  - hide focus styles if they're not needed, for example, when an element receives focus via the mouse.
  - improve \_\_clickDelegationHandler. Use current slotted native button instead of create new one.
  - fix vertical alignment when 2 buttons are inline and one has icon. Example included.

### Patch Changes

- f7ab5391: Set button host to inline-flex as a better default for when button content contains a before or after icon
- Updated dependencies [e92b98a4]
  - @lion/core@0.13.1

## 0.7.15

### Patch Changes

- 6679fe77: Types button and combobox

## 0.7.14

### Patch Changes

- Updated dependencies [01a798e5]
  - @lion/core@0.13.0

## 0.7.13

### Patch Changes

- e42071d8: Types for overlays, tooltip and button
- Updated dependencies [75107a4b]
  - @lion/core@0.12.0

## 0.7.12

### Patch Changes

- Updated dependencies [874ff483]
  - @lion/core@0.11.0

## 0.7.11

### Patch Changes

- Updated dependencies [65ecd432]
- Updated dependencies [4dc621a0]
  - @lion/core@0.10.0

## 0.7.10

### Patch Changes

- Updated dependencies [4b3ac525]
  - @lion/core@0.9.1

## 0.7.9

### Patch Changes

- Updated dependencies [3c61fd29]
- Updated dependencies [9ecab4d5]
  - @lion/core@0.9.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.7.8](https://github.com/ing-bank/lion/compare/@lion/button@0.7.7...@lion/button@0.7.8) (2020-07-13)

**Note:** Version bump only for package @lion/button

## [0.7.7](https://github.com/ing-bank/lion/compare/@lion/button@0.7.6...@lion/button@0.7.7) (2020-07-06)

### Bug Fixes

- **button:** add mouseupHandler also on 'this', remove iron test helpers ([9f9d49e](https://github.com/ing-bank/lion/commit/9f9d49ebcf0bcb8edfe5d0e0a9e1fe2a59488655))

## [0.7.6](https://github.com/ing-bank/lion/compare/@lion/button@0.7.5...@lion/button@0.7.6) (2020-06-24)

### Bug Fixes

- **button:** prevent scrolling when repeating space key ([7eec6f3](https://github.com/ing-bank/lion/commit/7eec6f37651d16cc94f77d86f891d19137cfd427))

## [0.7.5](https://github.com/ing-bank/lion/compare/@lion/button@0.7.4...@lion/button@0.7.5) (2020-06-18)

**Note:** Version bump only for package @lion/button

## [0.7.4](https://github.com/ing-bank/lion/compare/@lion/button@0.7.3...@lion/button@0.7.4) (2020-06-10)

**Note:** Version bump only for package @lion/button

## [0.7.3](https://github.com/ing-bank/lion/compare/@lion/button@0.7.2...@lion/button@0.7.3) (2020-06-08)

**Note:** Version bump only for package @lion/button

## [0.7.2](https://github.com/ing-bank/lion/compare/@lion/button@0.7.1...@lion/button@0.7.2) (2020-06-03)

### Bug Fixes

- remove all stories folders from npm ([1e04d06](https://github.com/ing-bank/lion/commit/1e04d06921f9d5e1a446b6d14045154ff83771c3))

## [0.7.1](https://github.com/ing-bank/lion/compare/@lion/button@0.7.0...@lion/button@0.7.1) (2020-06-02)

### Bug Fixes

- **button:** aria-disabled for button and switch ([31ccb4a](https://github.com/ing-bank/lion/commit/31ccb4a10f6b14e93ddaca825d5e6bf2db8dd1ee))

# [0.7.0](https://github.com/ing-bank/lion/compare/@lion/button@0.6.0...@lion/button@0.7.0) (2020-05-29)

### Features

- use markdown javascript (mdjs) for documentation ([bcd074d](https://github.com/ing-bank/lion/commit/bcd074d1fbce8754d428538df723ba402603e2c8))

# [0.6.0](https://github.com/ing-bank/lion/compare/@lion/button@0.5.12...@lion/button@0.6.0) (2020-05-18)

### Features

- use singleton manager to support nested npm installations ([e2eb0e0](https://github.com/ing-bank/lion/commit/e2eb0e0077b9efed9382701461753778f63cad48))

## [0.5.12](https://github.com/ing-bank/lion/compare/@lion/button@0.5.11...@lion/button@0.5.12) (2020-04-29)

### Bug Fixes

- add display:none for hidden ([#692](https://github.com/ing-bank/lion/issues/692)) ([9731771](https://github.com/ing-bank/lion/commit/9731771c23a5ed8661558e62cb5e34b62cc2b8b7))
- **button:** adjust button to more sensible default styling ([#674](https://github.com/ing-bank/lion/issues/674)) ([78cd503](https://github.com/ing-bank/lion/commit/78cd503b5ef4c54cce5bae5008397e1ce1242133))

## [0.5.11](https://github.com/ing-bank/lion/compare/@lion/button@0.5.10...@lion/button@0.5.11) (2020-04-02)

**Note:** Version bump only for package @lion/button

## [0.5.10](https://github.com/ing-bank/lion/compare/@lion/button@0.5.9...@lion/button@0.5.10) (2020-03-25)

### Bug Fixes

- **button:** prevent clickarea from blocking sibling content ([2b2d6b3](https://github.com/ing-bank/lion/commit/2b2d6b34aa9d8d61f01302480f280ec502da8765))

## [0.5.9](https://github.com/ing-bank/lion/compare/@lion/button@0.5.8...@lion/button@0.5.9) (2020-03-05)

**Note:** Version bump only for package @lion/button

## [0.5.8](https://github.com/ing-bank/lion/compare/@lion/button@0.5.7...@lion/button@0.5.8) (2020-03-02)

### Bug Fixes

- normalize subclasser apis ([ce0630f](https://github.com/ing-bank/lion/commit/ce0630f32b2206813e5cfd2c7842b2faa5141591))

## [0.5.7](https://github.com/ing-bank/lion/compare/@lion/button@0.5.6...@lion/button@0.5.7) (2020-02-26)

**Note:** Version bump only for package @lion/button

## [0.5.6](https://github.com/ing-bank/lion/compare/@lion/button@0.5.5...@lion/button@0.5.6) (2020-02-19)

### Bug Fixes

- reduce storybook chunck sizes for more performance ([9fc5606](https://github.com/ing-bank/lion/commit/9fc560605f5dcf6e9abcf8d58079c59f12750046))

## [0.5.5](https://github.com/ing-bank/lion/compare/@lion/button@0.5.4...@lion/button@0.5.5) (2020-02-14)

### Bug Fixes

- **button:** ie11 error when setting attribute in constructor ([1664278](https://github.com/ing-bank/lion/commit/166427871d90b8ae478924f1685249d92c1c0f82))

## [0.5.4](https://github.com/ing-bank/lion/compare/@lion/button@0.5.3...@lion/button@0.5.4) (2020-02-06)

### Bug Fixes

- **button:** run regexp once instead of every render cycle ([954adc5](https://github.com/ing-bank/lion/commit/954adc56596f2d9244baf48889d6b338b2a12ac4))

## [0.5.3](https://github.com/ing-bank/lion/compare/@lion/button@0.5.2...@lion/button@0.5.3) (2020-01-30)

### Bug Fixes

- **button:** using space on button should not scroll page ([#531](https://github.com/ing-bank/lion/issues/531)) ([52aaa75](https://github.com/ing-bank/lion/commit/52aaa756a7c3501e20ac5547c39cecf1b3a541ab))

## [0.5.2](https://github.com/ing-bank/lion/compare/@lion/button@0.5.1...@lion/button@0.5.2) (2020-01-20)

**Note:** Version bump only for package @lion/button

## [0.5.1](https://github.com/ing-bank/lion/compare/@lion/button@0.5.0...@lion/button@0.5.1) (2020-01-17)

### Bug Fixes

- update storybook and use main.js ([e61e0b9](https://github.com/ing-bank/lion/commit/e61e0b938ff72cc18cc0b3aa1560f2cece0c9fe6))

# [0.5.0](https://github.com/ing-bank/lion/compare/@lion/button@0.4.6...@lion/button@0.5.0) (2020-01-13)

### Features

- improved storybook demos ([89b835a](https://github.com/ing-bank/lion/commit/89b835a79998c45a28093de01f69216c35009a40))

## [0.4.6](https://github.com/ing-bank/lion/compare/@lion/button@0.4.5...@lion/button@0.4.6) (2020-01-08)

**Note:** Version bump only for package @lion/button

## [0.4.5](https://github.com/ing-bank/lion/compare/@lion/button@0.4.4...@lion/button@0.4.5) (2019-12-16)

**Note:** Version bump only for package @lion/button

## [0.4.4](https://github.com/ing-bank/lion/compare/@lion/button@0.4.3...@lion/button@0.4.4) (2019-12-13)

**Note:** Version bump only for package @lion/button

## [0.4.3](https://github.com/ing-bank/lion/compare/@lion/button@0.4.2...@lion/button@0.4.3) (2019-12-11)

**Note:** Version bump only for package @lion/button

## [0.4.2](https://github.com/ing-bank/lion/compare/@lion/button@0.4.1...@lion/button@0.4.2) (2019-12-06)

**Note:** Version bump only for package @lion/button

## [0.4.1](https://github.com/ing-bank/lion/compare/@lion/button@0.4.0...@lion/button@0.4.1) (2019-12-04)

**Note:** Version bump only for package @lion/button

# [0.4.0](https://github.com/ing-bank/lion/compare/@lion/button@0.3.46...@lion/button@0.4.0) (2019-12-04)

### Features

- integrate and pass automated a11y testing ([e1a417b](https://github.com/ing-bank/lion/commit/e1a417b041431e4e25a5b6a63e23ba0a3974f5a5))

## [0.3.46](https://github.com/ing-bank/lion/compare/@lion/button@0.3.45...@lion/button@0.3.46) (2019-12-03)

### Bug Fixes

- let lerna publish fixed versions ([bc7448c](https://github.com/ing-bank/lion/commit/bc7448c694deb3c05fd3d083a9acb5365b26b7ab))

## [0.3.45](https://github.com/ing-bank/lion/compare/@lion/button@0.3.44...@lion/button@0.3.45) (2019-12-02)

### Bug Fixes

- use strict versions to get correct deps on older versions ([8645c13](https://github.com/ing-bank/lion/commit/8645c13b1d77e488713f2e5e0e4e00c4d30ea1ee))

## [0.3.44](https://github.com/ing-bank/lion/compare/@lion/button@0.3.43...@lion/button@0.3.44) (2019-12-01)

**Note:** Version bump only for package @lion/button

## [0.3.43](https://github.com/ing-bank/lion/compare/@lion/button@0.3.42...@lion/button@0.3.43) (2019-11-28)

**Note:** Version bump only for package @lion/button

## [0.3.42](https://github.com/ing-bank/lion/compare/@lion/button@0.3.41...@lion/button@0.3.42) (2019-11-27)

**Note:** Version bump only for package @lion/button

## [0.3.41](https://github.com/ing-bank/lion/compare/@lion/button@0.3.40...@lion/button@0.3.41) (2019-11-27)

**Note:** Version bump only for package @lion/button

## [0.3.40](https://github.com/ing-bank/lion/compare/@lion/button@0.3.39...@lion/button@0.3.40) (2019-11-26)

**Note:** Version bump only for package @lion/button

## [0.3.39](https://github.com/ing-bank/lion/compare/@lion/button@0.3.38...@lion/button@0.3.39) (2019-11-22)

**Note:** Version bump only for package @lion/button

## [0.3.38](https://github.com/ing-bank/lion/compare/@lion/button@0.3.37...@lion/button@0.3.38) (2019-11-19)

### Bug Fixes

- **button:** make click event work in ie11 ([0d7d513](https://github.com/ing-bank/lion/commit/0d7d513405e05f7bdf4e6cd4f0ca0955da16e9b5))

## [0.3.37](https://github.com/ing-bank/lion/compare/@lion/button@0.3.36...@lion/button@0.3.37) (2019-11-18)

**Note:** Version bump only for package @lion/button

## [0.3.36](https://github.com/ing-bank/lion/compare/@lion/button@0.3.35...@lion/button@0.3.36) (2019-11-15)

### Bug Fixes

- refactor slot selection ([5999ea9](https://github.com/ing-bank/lion/commit/5999ea956967b449f3f04935c7facb19e2889dc9))

## [0.3.35](https://github.com/ing-bank/lion/compare/@lion/button@0.3.34...@lion/button@0.3.35) (2019-11-13)

### Bug Fixes

- **button:** make button more accessible ([fdedcf2](https://github.com/ing-bank/lion/commit/fdedcf289490209963794e83aa28ca07fb966583))

## [0.3.34](https://github.com/ing-bank/lion/compare/@lion/button@0.3.33...@lion/button@0.3.34) (2019-11-12)

**Note:** Version bump only for package @lion/button

## [0.3.33](https://github.com/ing-bank/lion/compare/@lion/button@0.3.32...@lion/button@0.3.33) (2019-11-06)

**Note:** Version bump only for package @lion/button

## [0.3.32](https://github.com/ing-bank/lion/compare/@lion/button@0.3.31...@lion/button@0.3.32) (2019-11-01)

**Note:** Version bump only for package @lion/button

## [0.3.31](https://github.com/ing-bank/lion/compare/@lion/button@0.3.30...@lion/button@0.3.31) (2019-10-25)

**Note:** Version bump only for package @lion/button

## [0.3.30](https://github.com/ing-bank/lion/compare/@lion/button@0.3.29...@lion/button@0.3.30) (2019-10-23)

**Note:** Version bump only for package @lion/button

## [0.3.29](https://github.com/ing-bank/lion/compare/@lion/button@0.3.28...@lion/button@0.3.29) (2019-10-23)

**Note:** Version bump only for package @lion/button

## [0.3.28](https://github.com/ing-bank/lion/compare/@lion/button@0.3.27...@lion/button@0.3.28) (2019-10-21)

**Note:** Version bump only for package @lion/button

## [0.3.27](https://github.com/ing-bank/lion/compare/@lion/button@0.3.26...@lion/button@0.3.27) (2019-10-21)

### Bug Fixes

- **button:** fix form integration, fires only once, submit preventable ([d19ca7c](https://github.com/ing-bank/lion/commit/d19ca7c))

## [0.3.26](https://github.com/ing-bank/lion/compare/@lion/button@0.3.25...@lion/button@0.3.26) (2019-10-14)

**Note:** Version bump only for package @lion/button

## [0.3.25](https://github.com/ing-bank/lion/compare/@lion/button@0.3.24...@lion/button@0.3.25) (2019-10-11)

**Note:** Version bump only for package @lion/button

## [0.3.24](https://github.com/ing-bank/lion/compare/@lion/button@0.3.23...@lion/button@0.3.24) (2019-10-11)

**Note:** Version bump only for package @lion/button

## [0.3.23](https://github.com/ing-bank/lion/compare/@lion/button@0.3.22...@lion/button@0.3.23) (2019-10-10)

### Bug Fixes

- **button:** guard against \_nativeButton not defined ([1a22c9b](https://github.com/ing-bank/lion/commit/1a22c9b))

## [0.3.22](https://github.com/ing-bank/lion/compare/@lion/button@0.3.21...@lion/button@0.3.22) (2019-10-09)

**Note:** Version bump only for package @lion/button

## [0.3.21](https://github.com/ing-bank/lion/compare/@lion/button@0.3.20...@lion/button@0.3.21) (2019-10-07)

**Note:** Version bump only for package @lion/button

## [0.3.20](https://github.com/ing-bank/lion/compare/@lion/button@0.3.19...@lion/button@0.3.20) (2019-09-30)

**Note:** Version bump only for package @lion/button

## [0.3.19](https://github.com/ing-bank/lion/compare/@lion/button@0.3.18...@lion/button@0.3.19) (2019-09-27)

**Note:** Version bump only for package @lion/button

## [0.3.18](https://github.com/ing-bank/lion/compare/@lion/button@0.3.17...@lion/button@0.3.18) (2019-09-26)

### Bug Fixes

- **button:** change redispatch click logic so form submit fires properly ([94818e4](https://github.com/ing-bank/lion/commit/94818e4))
- **button:** fix implicit form submission IE11 due to visibility hidden ([a5752fc](https://github.com/ing-bank/lion/commit/a5752fc))

## [0.3.17](https://github.com/ing-bank/lion/compare/@lion/button@0.3.16...@lion/button@0.3.17) (2019-09-25)

**Note:** Version bump only for package @lion/button

## [0.3.16](https://github.com/ing-bank/lion/compare/@lion/button@0.3.15...@lion/button@0.3.16) (2019-09-20)

**Note:** Version bump only for package @lion/button

## [0.3.15](https://github.com/ing-bank/lion/compare/@lion/button@0.3.14...@lion/button@0.3.15) (2019-09-19)

**Note:** Version bump only for package @lion/button

## [0.3.14](https://github.com/ing-bank/lion/compare/@lion/button@0.3.13...@lion/button@0.3.14) (2019-09-17)

**Note:** Version bump only for package @lion/button

## [0.3.13](https://github.com/ing-bank/lion/compare/@lion/button@0.3.12...@lion/button@0.3.13) (2019-09-13)

**Note:** Version bump only for package @lion/button

## [0.3.12](https://github.com/ing-bank/lion/compare/@lion/button@0.3.11...@lion/button@0.3.12) (2019-08-29)

### Bug Fixes

- **button:** make JAWS/IE11 work with inner button ([f2c15ce](https://github.com/ing-bank/lion/commit/f2c15ce))

## [0.3.11](https://github.com/ing-bank/lion/compare/@lion/button@0.3.10...@lion/button@0.3.11) (2019-08-23)

**Note:** Version bump only for package @lion/button

## [0.3.10](https://github.com/ing-bank/lion/compare/@lion/button@0.3.9...@lion/button@0.3.10) (2019-08-21)

**Note:** Version bump only for package @lion/button

## [0.3.9](https://github.com/ing-bank/lion/compare/@lion/button@0.3.8...@lion/button@0.3.9) (2019-08-17)

**Note:** Version bump only for package @lion/button

## [0.3.8](https://github.com/ing-bank/lion/compare/@lion/button@0.3.7...@lion/button@0.3.8) (2019-08-15)

**Note:** Version bump only for package @lion/button

## [0.3.7](https://github.com/ing-bank/lion/compare/@lion/button@0.3.6...@lion/button@0.3.7) (2019-08-15)

**Note:** Version bump only for package @lion/button

## [0.3.6](https://github.com/ing-bank/lion/compare/@lion/button@0.3.5...@lion/button@0.3.6) (2019-08-14)

### Bug Fixes

- **button:** sync type property instead of delegating ([b3a1f91](https://github.com/ing-bank/lion/commit/b3a1f91))

## [0.3.5](https://github.com/ing-bank/lion/compare/@lion/button@0.3.4...@lion/button@0.3.5) (2019-08-07)

**Note:** Version bump only for package @lion/button

## [0.3.4](https://github.com/ing-bank/lion/compare/@lion/button@0.3.3...@lion/button@0.3.4) (2019-08-07)

**Note:** Version bump only for package @lion/button

## [0.3.3](https://github.com/ing-bank/lion/compare/@lion/button@0.3.2...@lion/button@0.3.3) (2019-07-30)

**Note:** Version bump only for package @lion/button

## [0.3.2](https://github.com/ing-bank/lion/compare/@lion/button@0.3.1...@lion/button@0.3.2) (2019-07-30)

**Note:** Version bump only for package @lion/button

## [0.3.1](https://github.com/ing-bank/lion/compare/@lion/button@0.3.0...@lion/button@0.3.1) (2019-07-29)

**Note:** Version bump only for package @lion/button

# [0.3.0](https://github.com/ing-bank/lion/compare/@lion/button@0.2.0...@lion/button@0.3.0) (2019-07-26)

### Bug Fixes

- **button:** click event fired twice in IE11 (fix [#179](https://github.com/ing-bank/lion/issues/179)) ([e269b5d](https://github.com/ing-bank/lion/commit/e269b5d))
- **button:** prevent unnecessary keydown/keyup handlers ([06124e0](https://github.com/ing-bank/lion/commit/06124e0))
- **button:** remove active when mouse/key up on other element (fix [#210](https://github.com/ing-bank/lion/issues/210)) ([f3303ae](https://github.com/ing-bank/lion/commit/f3303ae))

### Features

- **button:** move active to host for cross-browser support (fix [#188](https://github.com/ing-bank/lion/issues/188)) ([471d662](https://github.com/ing-bank/lion/commit/471d662))

# [0.2.0](https://github.com/ing-bank/lion/compare/@lion/button@0.1.48...@lion/button@0.2.0) (2019-07-25)

### Bug Fixes

- **button:** typo in package description ([1d4378e](https://github.com/ing-bank/lion/commit/1d4378e))

### Features

- **button:** add template hooks for before/after default slot ([f478b98](https://github.com/ing-bank/lion/commit/f478b98))
- **button:** reduce to minimal css ([d4299de](https://github.com/ing-bank/lion/commit/d4299de))
- **button:** use DisabledWithTabIndexMixin ([732411c](https://github.com/ing-bank/lion/commit/732411c))

## [0.1.48](https://github.com/ing-bank/lion/compare/@lion/button@0.1.47...@lion/button@0.1.48) (2019-07-24)

**Note:** Version bump only for package @lion/button

## [0.1.47](https://github.com/ing-bank/lion/compare/@lion/button@0.1.46...@lion/button@0.1.47) (2019-07-24)

**Note:** Version bump only for package @lion/button

## [0.1.46](https://github.com/ing-bank/lion/compare/@lion/button@0.1.45...@lion/button@0.1.46) (2019-07-23)

**Note:** Version bump only for package @lion/button

## [0.1.45](https://github.com/ing-bank/lion/compare/@lion/button@0.1.44...@lion/button@0.1.45) (2019-07-23)

**Note:** Version bump only for package @lion/button

## [0.1.44](https://github.com/ing-bank/lion/compare/@lion/button@0.1.43...@lion/button@0.1.44) (2019-07-23)

**Note:** Version bump only for package @lion/button

## [0.1.43](https://github.com/ing-bank/lion/compare/@lion/button@0.1.42...@lion/button@0.1.43) (2019-07-22)

**Note:** Version bump only for package @lion/button

## [0.1.42](https://github.com/ing-bank/lion/compare/@lion/button@0.1.41...@lion/button@0.1.42) (2019-07-19)

**Note:** Version bump only for package @lion/button

## [0.1.41](https://github.com/ing-bank/lion/compare/@lion/button@0.1.40...@lion/button@0.1.41) (2019-07-19)

**Note:** Version bump only for package @lion/button

## [0.1.40](https://github.com/ing-bank/lion/compare/@lion/button@0.1.39...@lion/button@0.1.40) (2019-07-18)

**Note:** Version bump only for package @lion/button

## [0.1.39](https://github.com/ing-bank/lion/compare/@lion/button@0.1.38...@lion/button@0.1.39) (2019-07-17)

**Note:** Version bump only for package @lion/button

## [0.1.38](https://github.com/ing-bank/lion/compare/@lion/button@0.1.37...@lion/button@0.1.38) (2019-07-16)

**Note:** Version bump only for package @lion/button

## [0.1.37](https://github.com/ing-bank/lion/compare/@lion/button@0.1.36...@lion/button@0.1.37) (2019-07-16)

**Note:** Version bump only for package @lion/button

## [0.1.36](https://github.com/ing-bank/lion/compare/@lion/button@0.1.35...@lion/button@0.1.36) (2019-07-15)

**Note:** Version bump only for package @lion/button

## [0.1.35](https://github.com/ing-bank/lion/compare/@lion/button@0.1.34...@lion/button@0.1.35) (2019-07-15)

**Note:** Version bump only for package @lion/button

## [0.1.34](https://github.com/ing-bank/lion/compare/@lion/button@0.1.33...@lion/button@0.1.34) (2019-07-12)

### Bug Fixes

- **button:** make redispatch method protected ([b7eb537](https://github.com/ing-bank/lion/commit/b7eb537))
- **button:** put host element into click event target (fix [#89](https://github.com/ing-bank/lion/issues/89)) ([59e456e](https://github.com/ing-bank/lion/commit/59e456e))
- **button:** redispatch click event with all original properties ([b71177f](https://github.com/ing-bank/lion/commit/b71177f))
- **button:** remove unnecessary instance method bind ([4a8c6eb](https://github.com/ing-bank/lion/commit/4a8c6eb))

## [0.1.33](https://github.com/ing-bank/lion/compare/@lion/button@0.1.32...@lion/button@0.1.33) (2019-07-09)

**Note:** Version bump only for package @lion/button

## [0.1.32](https://github.com/ing-bank/lion/compare/@lion/button@0.1.31...@lion/button@0.1.32) (2019-07-04)

**Note:** Version bump only for package @lion/button

## [0.1.31](https://github.com/ing-bank/lion/compare/@lion/button@0.1.30...@lion/button@0.1.31) (2019-07-02)

**Note:** Version bump only for package @lion/button

## [0.1.30](https://github.com/ing-bank/lion/compare/@lion/button@0.1.29...@lion/button@0.1.30) (2019-07-02)

**Note:** Version bump only for package @lion/button

## [0.1.29](https://github.com/ing-bank/lion/compare/@lion/button@0.1.28...@lion/button@0.1.29) (2019-07-01)

**Note:** Version bump only for package @lion/button

## [0.1.28](https://github.com/ing-bank/lion/compare/@lion/button@0.1.27...@lion/button@0.1.28) (2019-06-27)

**Note:** Version bump only for package @lion/button

## [0.1.27](https://github.com/ing-bank/lion/compare/@lion/button@0.1.26...@lion/button@0.1.27) (2019-06-27)

**Note:** Version bump only for package @lion/button

## [0.1.26](https://github.com/ing-bank/lion/compare/@lion/button@0.1.25...@lion/button@0.1.26) (2019-06-24)

**Note:** Version bump only for package @lion/button

## [0.1.25](https://github.com/ing-bank/lion/compare/@lion/button@0.1.24...@lion/button@0.1.25) (2019-06-20)

**Note:** Version bump only for package @lion/button

## [0.1.24](https://github.com/ing-bank/lion/compare/@lion/button@0.1.23...@lion/button@0.1.24) (2019-06-18)

**Note:** Version bump only for package @lion/button

## [0.1.23](https://github.com/ing-bank/lion/compare/@lion/button@0.1.22...@lion/button@0.1.23) (2019-06-13)

### Bug Fixes

- **button:** indicate visually the active state on enter/space ([d809890](https://github.com/ing-bank/lion/commit/d809890))

## [0.1.22](https://github.com/ing-bank/lion/compare/@lion/button@0.1.21...@lion/button@0.1.22) (2019-06-06)

**Note:** Version bump only for package @lion/button

## [0.1.21](https://github.com/ing-bank/lion/compare/@lion/button@0.1.20...@lion/button@0.1.21) (2019-06-04)

**Note:** Version bump only for package @lion/button

## [0.1.20](https://github.com/ing-bank/lion/compare/@lion/button@0.1.19...@lion/button@0.1.20) (2019-05-31)

**Note:** Version bump only for package @lion/button

## [0.1.19](https://github.com/ing-bank/lion/compare/@lion/button@0.1.18...@lion/button@0.1.19) (2019-05-31)

**Note:** Version bump only for package @lion/button

## [0.1.18](https://github.com/ing-bank/lion/compare/@lion/button@0.1.17...@lion/button@0.1.18) (2019-05-29)

**Note:** Version bump only for package @lion/button

## [0.1.17](https://github.com/ing-bank/lion/compare/@lion/button@0.1.16...@lion/button@0.1.17) (2019-05-29)

**Note:** Version bump only for package @lion/button

## [0.1.16](https://github.com/ing-bank/lion/compare/@lion/button@0.1.15...@lion/button@0.1.16) (2019-05-24)

**Note:** Version bump only for package @lion/button

## [0.1.15](https://github.com/ing-bank/lion/compare/@lion/button@0.1.14...@lion/button@0.1.15) (2019-05-22)

**Note:** Version bump only for package @lion/button

## [0.1.14](https://github.com/ing-bank/lion/compare/@lion/button@0.1.13...@lion/button@0.1.14) (2019-05-21)

**Note:** Version bump only for package @lion/button

## [0.1.13](https://github.com/ing-bank/lion/compare/@lion/button@0.1.12...@lion/button@0.1.13) (2019-05-17)

**Note:** Version bump only for package @lion/button

## [0.1.12](https://github.com/ing-bank/lion/compare/@lion/button@0.1.11...@lion/button@0.1.12) (2019-05-16)

**Note:** Version bump only for package @lion/button

## [0.1.11](https://github.com/ing-bank/lion/compare/@lion/button@0.1.10...@lion/button@0.1.11) (2019-05-16)

### Bug Fixes

- **button:** do not override user provided tabindex ([76ccb94](https://github.com/ing-bank/lion/commit/76ccb94))

## [0.1.10](https://github.com/ing-bank/lion/compare/@lion/button@0.1.9...@lion/button@0.1.10) (2019-05-16)

**Note:** Version bump only for package @lion/button

## [0.1.9](https://github.com/ing-bank/lion/compare/@lion/button@0.1.8...@lion/button@0.1.9) (2019-05-15)

**Note:** Version bump only for package @lion/button

## [0.1.8](https://github.com/ing-bank/lion/compare/@lion/button@0.1.7...@lion/button@0.1.8) (2019-05-13)

**Note:** Version bump only for package @lion/button

## [0.1.7](https://github.com/ing-bank/lion/compare/@lion/button@0.1.6...@lion/button@0.1.7) (2019-05-13)

### Bug Fixes

- add prepublish step to make links absolute for npm docs ([9f2c4f6](https://github.com/ing-bank/lion/commit/9f2c4f6))

## [0.1.6](https://github.com/ing-bank/lion/compare/@lion/button@0.1.5...@lion/button@0.1.6) (2019-05-08)

**Note:** Version bump only for package @lion/button

## [0.1.5](https://github.com/ing-bank/lion/compare/@lion/button@0.1.4...@lion/button@0.1.5) (2019-05-07)

**Note:** Version bump only for package @lion/button

## [0.1.4](https://github.com/ing-bank/lion/compare/@lion/button@0.1.3...@lion/button@0.1.4) (2019-04-29)

**Note:** Version bump only for package @lion/button

## [0.1.3](https://github.com/ing-bank/lion/compare/@lion/button@0.1.2...@lion/button@0.1.3) (2019-04-28)

### Bug Fixes

- update storybook/linting; adjust story labels, eslint ignores ([8d96f84](https://github.com/ing-bank/lion/commit/8d96f84))

## [0.1.2](https://github.com/ing-bank/lion/compare/@lion/button@0.1.1...@lion/button@0.1.2) (2019-04-27)

**Note:** Version bump only for package @lion/button

## [0.1.1](https://github.com/ing-bank/lion/compare/@lion/button@0.1.0...@lion/button@0.1.1) (2019-04-26)

### Bug Fixes

- add missing files to npm packages ([0e3ca17](https://github.com/ing-bank/lion/commit/0e3ca17))

# 0.1.0 (2019-04-26)

### Features

- release inital public lion version ([ec8da8f](https://github.com/ing-bank/lion/commit/ec8da8f))
