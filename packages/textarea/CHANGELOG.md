# Change Log

## 0.15.0

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

- Updated dependencies [9c1dfdcd]
- Updated dependencies [3772c943]
- Updated dependencies [66531e3c]
- Updated dependencies [672c8e99]
- Updated dependencies [7016a150]
- Updated dependencies [aa8b8916]
- Updated dependencies [f408f6f8]
  - @lion/form-core@0.17.0
  - @lion/core@0.22.0

## 0.14.0

### Minor Changes

- 683d5c1c: Upgrade to latest Typescript. Keep in mind, some @ts-ignores were necessary, also per TS maintainer's advice. Use skipLibCheck in your TSConfig to ignore issues coming from Lion, the types are valid.

  **We also unfixed lion's dependencies (now using caret ^) on its own packages**, because it caused a lot of problems with duplicate installations for end users as well as subclassers and its end users. Both of these changes may affect subclassers in a breaking manner, hence the minor bump.

  Be sure to [read our Rationale on this change](https://lion-web.netlify.app/docs/rationales/versioning/) and what this means for you as a user.

### Patch Changes

- Updated dependencies [683d5c1c]
  - @lion/core@0.21.0
  - @lion/form-core@0.16.0

## 0.13.8

### Patch Changes

- 30805edf: Replace deprecated node folder exports with wildcard exports for docs
- 2bd3c521: Rename customElementsManifest to customElements in package.json
- Updated dependencies [30805edf]
- Updated dependencies [495cb0c5]
- Updated dependencies [2bd3c521]
- Updated dependencies [2b583ee7]
- Updated dependencies [83011918]
  - @lion/core@0.20.0
  - @lion/form-core@0.15.5

## 0.13.7

### Patch Changes

- 5f3ef98a: Temporary fix for a bug in FireFox where disabled textareas can crash the browser if dragged (resized).
- Updated dependencies [9b81b69e]
- Updated dependencies [a2c66cd9]
- Updated dependencies [c4562f7e]
- Updated dependencies [c55d4566]
  - @lion/core@0.19.0
  - @lion/form-core@0.15.4

## 0.13.6

### Patch Changes

- Updated dependencies [bcf68ceb]
- Updated dependencies [d963e74e]
  - @lion/core@0.18.4
  - @lion/form-core@0.15.3

## 0.13.5

### Patch Changes

- Updated dependencies [ec03d209]
  - @lion/core@0.18.3
  - @lion/form-core@0.15.2

## 0.13.4

### Patch Changes

- Updated dependencies [04874352]
  - @lion/form-core@0.15.1

## 0.13.3

### Patch Changes

- e87b6293: only preserve caret if value changed, which fixes a safari bug
- Updated dependencies [8c06302e]
- Updated dependencies [8a766644]
- Updated dependencies [e87b6293]
  - @lion/core@0.18.2
  - @lion/form-core@0.15.0

## 0.13.2

### Patch Changes

- Updated dependencies [84131205]
  - @lion/form-core@0.14.2
  - @lion/core@0.18.1

## 0.13.1

### Patch Changes

- Updated dependencies [f320b8b4]
  - @lion/form-core@0.14.1

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
  - @lion/form-core@0.14.0

## 0.12.1

### Patch Changes

- Updated dependencies [0ddd38c0]
- Updated dependencies [0ddd38c0]
  - @lion/form-core@0.13.0

## 0.12.0

### Minor Changes

- 02e4f2cb: add simulator to demos

### Patch Changes

- Updated dependencies [11ec31c6]
- Updated dependencies [15146bf9]
- Updated dependencies [02e4f2cb]
- Updated dependencies [c6fbe920]
  - @lion/form-core@0.12.0
  - @lion/core@0.17.0

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
- Updated dependencies [38297d07]
- Updated dependencies [3b5ed322]
- Updated dependencies [77a04245]
- Updated dependencies [53167fd2]
- Updated dependencies [181a1d45]
- Updated dependencies [fb1522dd]
- Updated dependencies [75af80be]
- Updated dependencies [0e910e3f]
- Updated dependencies [991f1f54]
- Updated dependencies [cc02ae24]
- Updated dependencies [43e4bb81]
- Updated dependencies [6ae7a5e3]
  - @lion/form-core@0.11.0
  - @lion/core@0.16.0

## 0.10.3

### Patch Changes

- 6ea02988: Always use ...styles and [css``] everywhere consistently, meaning an array of CSSResult. Makes it easier on TSC.
- Updated dependencies [6ea02988]
  - @lion/form-core@0.10.2

## 0.10.2

### Patch Changes

- Updated dependencies [72a6ccc8]
  - @lion/form-core@0.10.1

## 0.10.1

### Patch Changes

- Updated dependencies [13f808af]
- Updated dependencies [aa478174]
- Updated dependencies [a809d7b5]
  - @lion/form-core@0.10.0

## 0.10.0

### Minor Changes

- f3e54c56: Publish documentation with a format for Rocket
- 5db622e9: BREAKING: Align exports fields. This means no more wildcards, meaning you always import with bare import specifiers, extensionless. Import components where customElements.define side effect is executed by importing from '@lion/package/define'. For multi-component packages this defines all components (e.g. radio-group + radio). If you want to only import a single one, do '@lion/radio-group/define-radio' for example for just lion-radio.

### Patch Changes

- Updated dependencies [f3e54c56]
- Updated dependencies [af90b20e]
- Updated dependencies [5db622e9]
  - @lion/core@0.15.0
  - @lion/form-core@0.9.0

## 0.9.5

### Patch Changes

- dbacafa5: Type static get properties as {any} since the real class fields are typed separately and lit properties are just "configuring". Remove expect error.
- Updated dependencies [dbacafa5]
  - @lion/form-core@0.8.5

## 0.9.4

### Patch Changes

- Updated dependencies [6b91c92d]
- Updated dependencies [701aadce]
  - @lion/form-core@0.8.4
  - @lion/core@0.14.1

## 0.9.3

### Patch Changes

- Updated dependencies [b2a1c1ef]
  - @lion/form-core@0.8.3

## 0.9.2

### Patch Changes

- Updated dependencies [d0b37e62]
  - @lion/form-core@0.8.2

## 0.9.1

### Patch Changes

- Updated dependencies [deb95d13]
  - @lion/form-core@0.8.1

## 0.9.0

### Minor Changes

- b2f981db: Add exports field in package.json

  Note that some tools can break with this change as long as they respect the exports field. If that is the case, check that you always access the elements included in the exports field, with the same name which they are exported. Any item not exported is considered private to the package and should not be accessed from the outside.

### Patch Changes

- Updated dependencies [b2f981db]
  - @lion/core@0.14.0
  - @lion/form-core@0.8.0

## 0.8.16

### Patch Changes

- Updated dependencies [a7b27502]
  - @lion/form-core@0.7.3

## 0.8.15

### Patch Changes

- Updated dependencies [77114753]
- Updated dependencies [f98aab23]
- Updated dependencies [f98aab23]
  - @lion/form-core@0.7.2

## 0.8.14

### Patch Changes

- Updated dependencies [8fb7e7a1]
- Updated dependencies [9112d243]
  - @lion/core@0.13.8
  - @lion/form-core@0.7.1

## 0.8.13

### Patch Changes

- 5302ec89: Minimise dependencies by removing integration demos to form-integrations and form-core packages.
- 98f1bb7e: Ensure all lit imports are imported from @lion/core. Remove devDependencies in all subpackages and move to root package.json. Add demo dependencies as real dependencies for users that extend our docs/demos.
- Updated dependencies [5302ec89]
- Updated dependencies [98f1bb7e]
- Updated dependencies [a8cf4215]
  - @lion/form-core@0.7.0
  - @lion/core@0.13.7

## 0.8.12

### Patch Changes

- Updated dependencies [9fba9007]
  - @lion/core@0.13.6
  - @lion/form-core@0.6.14

## 0.8.11

### Patch Changes

- Updated dependencies [41edf033]
  - @lion/core@0.13.5
  - @lion/form-core@0.6.13

## 0.8.10

### Patch Changes

- Updated dependencies [5553e43e]
  - @lion/form-core@0.6.12

## 0.8.9

### Patch Changes

- Updated dependencies [aa8ad0e6]
- Updated dependencies [4bacc17b]
  - @lion/form-core@0.6.11

## 0.8.8

### Patch Changes

- Updated dependencies [c5c4d4ba]
  - @lion/form-core@0.6.10

## 0.8.7

### Patch Changes

- Updated dependencies [cf0967fe]
  - @lion/form-core@0.6.9

## 0.8.6

### Patch Changes

- Updated dependencies [b222fd78]
  - @lion/form-core@0.6.8

## 0.8.5

### Patch Changes

- cfbcccb5: Fix type imports to reuse lion where possible, in case Lit updates with new types that may break us.
- Updated dependencies [cfbcccb5]
  - @lion/core@0.13.4
  - @lion/form-core@0.6.7

## 0.8.4

### Patch Changes

- Updated dependencies [e2e4deec]
  - @lion/core@0.13.3
  - @lion/form-core@0.6.6

## 0.8.3

### Patch Changes

- Updated dependencies [20ba0ca8]
- Updated dependencies [618f2698]
  - @lion/core@0.13.2
  - @lion/form-core@0.6.5

## 0.8.2

### Patch Changes

- c3a581e2: Added Intersection Observer to ensure textarea gets recalculated on visibility changes, e.g. when it is inside a dialog, tabs, or accordion when they are hidden initially.
- Updated dependencies [2907649b]
- Updated dependencies [68e3e749]
- Updated dependencies [fd297a28]
- Updated dependencies [9fcb67f0]
- Updated dependencies [247e64a3]
- Updated dependencies [e92b98a4]
  - @lion/form-core@0.6.4
  - @lion/core@0.13.1

## 0.8.1

### Patch Changes

- 0aa4480e: Refactor of some fields to ensure that \_inputNode has the right type. It starts as HTMLElement for LionField, and all HTMLInputElement, HTMLSelectElement and HTMLTextAreaElement logic, are moved to the right places.
- Updated dependencies [d5faa459]
- Updated dependencies [0aa4480e]
  - @lion/form-core@0.6.3

## 0.8.0

### Minor Changes

- 98fa7ad6: Add types for textarea package

### Patch Changes

- Updated dependencies [4b7bea96]
- Updated dependencies [01a798e5]
- Updated dependencies [a31b7217]
- Updated dependencies [85720654]
- Updated dependencies [32202a88]
- Updated dependencies [b9327627]
- Updated dependencies [02145a06]
  - @lion/form-core@0.6.2
  - @lion/core@0.13.0

## 0.7.23

### Patch Changes

- Updated dependencies [75107a4b]
- Updated dependencies [60d5d1d3]
  - @lion/core@0.12.0
  - @lion/form-core@0.6.1

## 0.7.22

### Patch Changes

- Updated dependencies [874ff483]
  - @lion/form-core@0.6.0
  - @lion/core@0.11.0

## 0.7.21

### Patch Changes

- Updated dependencies [65ecd432]
- Updated dependencies [4dc621a0]
  - @lion/core@0.10.0
  - @lion/form-core@0.5.0

## 0.7.20

### Patch Changes

- Updated dependencies [c347fce4]
  - @lion/form-core@0.4.4

## 0.7.19

### Patch Changes

- Updated dependencies [4b3ac525]
  - @lion/core@0.9.1
  - @lion/form-core@0.4.3

## 0.7.18

### Patch Changes

- Updated dependencies [dd021e43]
- Updated dependencies [07c598fd]
  - @lion/form-core@0.4.2

## 0.7.17

### Patch Changes

- Updated dependencies [fb236975]
  - @lion/form-core@0.4.1

## 0.7.16

### Patch Changes

- Updated dependencies [3c61fd29]
- Updated dependencies [9ecab4d5]
  - @lion/form-core@0.4.0
  - @lion/core@0.9.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.7.15](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.14...@lion/textarea@0.7.15) (2020-07-28)

**Note:** Version bump only for package @lion/textarea

## [0.7.14](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.13...@lion/textarea@0.7.14) (2020-07-27)

**Note:** Version bump only for package @lion/textarea

## [0.7.13](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.12...@lion/textarea@0.7.13) (2020-07-16)

**Note:** Version bump only for package @lion/textarea

## [0.7.12](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.11...@lion/textarea@0.7.12) (2020-07-13)

**Note:** Version bump only for package @lion/textarea

## [0.7.11](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.10...@lion/textarea@0.7.11) (2020-07-09)

**Note:** Version bump only for package @lion/textarea

## [0.7.10](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.9...@lion/textarea@0.7.10) (2020-07-09)

**Note:** Version bump only for package @lion/textarea

## [0.7.9](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.8...@lion/textarea@0.7.9) (2020-07-09)

**Note:** Version bump only for package @lion/textarea

## [0.7.8](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.7...@lion/textarea@0.7.8) (2020-07-07)

**Note:** Version bump only for package @lion/textarea

## [0.7.7](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.6...@lion/textarea@0.7.7) (2020-07-06)

**Note:** Version bump only for package @lion/textarea

## [0.7.6](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.5...@lion/textarea@0.7.6) (2020-06-18)

**Note:** Version bump only for package @lion/textarea

## [0.7.5](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.4...@lion/textarea@0.7.5) (2020-06-10)

**Note:** Version bump only for package @lion/textarea

## [0.7.4](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.3...@lion/textarea@0.7.4) (2020-06-09)

**Note:** Version bump only for package @lion/textarea

## [0.7.3](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.2...@lion/textarea@0.7.3) (2020-06-08)

**Note:** Version bump only for package @lion/textarea

## [0.7.2](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.1...@lion/textarea@0.7.2) (2020-06-08)

**Note:** Version bump only for package @lion/textarea

## [0.7.1](https://github.com/ing-bank/lion/compare/@lion/textarea@0.7.0...@lion/textarea@0.7.1) (2020-06-03)

### Bug Fixes

- remove all stories folders from npm ([1e04d06](https://github.com/ing-bank/lion/commit/1e04d06921f9d5e1a446b6d14045154ff83771c3))

# [0.7.0](https://github.com/ing-bank/lion/compare/@lion/textarea@0.6.1...@lion/textarea@0.7.0) (2020-05-29)

### Features

- merge field/validate/choice-input/form-group into @lion/form-core ([6170374](https://github.com/ing-bank/lion/commit/6170374ee8c058cb95fff79b4953b0535219e9b4))
- use markdown javascript (mdjs) for documentation ([bcd074d](https://github.com/ing-bank/lion/commit/bcd074d1fbce8754d428538df723ba402603e2c8))

## [0.6.1](https://github.com/ing-bank/lion/compare/@lion/textarea@0.6.0...@lion/textarea@0.6.1) (2020-05-27)

**Note:** Version bump only for package @lion/textarea

# [0.6.0](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.23...@lion/textarea@0.6.0) (2020-05-18)

### Features

- use singleton manager to support nested npm installations ([e2eb0e0](https://github.com/ing-bank/lion/commit/e2eb0e0077b9efed9382701461753778f63cad48))

## [0.5.23](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.22...@lion/textarea@0.5.23) (2020-04-29)

**Note:** Version bump only for package @lion/textarea

## [0.5.22](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.21...@lion/textarea@0.5.22) (2020-04-02)

**Note:** Version bump only for package @lion/textarea

## [0.5.21](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.20...@lion/textarea@0.5.21) (2020-03-25)

**Note:** Version bump only for package @lion/textarea

## [0.5.20](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.19...@lion/textarea@0.5.20) (2020-03-19)

**Note:** Version bump only for package @lion/textarea

## [0.5.19](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.18...@lion/textarea@0.5.19) (2020-03-05)

**Note:** Version bump only for package @lion/textarea

## [0.5.18](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.17...@lion/textarea@0.5.18) (2020-03-04)

**Note:** Version bump only for package @lion/textarea

## [0.5.17](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.16...@lion/textarea@0.5.17) (2020-03-02)

**Note:** Version bump only for package @lion/textarea

## [0.5.16](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.15...@lion/textarea@0.5.16) (2020-03-01)

**Note:** Version bump only for package @lion/textarea

## [0.5.15](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.14...@lion/textarea@0.5.15) (2020-02-26)

**Note:** Version bump only for package @lion/textarea

## [0.5.14](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.13...@lion/textarea@0.5.14) (2020-02-20)

**Note:** Version bump only for package @lion/textarea

## [0.5.13](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.12...@lion/textarea@0.5.13) (2020-02-19)

### Bug Fixes

- **textarea:** support placeholder ([#578](https://github.com/ing-bank/lion/issues/578)) ([79c5176](https://github.com/ing-bank/lion/commit/79c51767af528ed3d4054d2211f50621e0e15546))
- reduce storybook chunck sizes for more performance ([9fc5606](https://github.com/ing-bank/lion/commit/9fc560605f5dcf6e9abcf8d58079c59f12750046))

## [0.5.12](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.11...@lion/textarea@0.5.12) (2020-02-10)

**Note:** Version bump only for package @lion/textarea

## [0.5.11](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.10...@lion/textarea@0.5.11) (2020-02-06)

**Note:** Version bump only for package @lion/textarea

## [0.5.10](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.9...@lion/textarea@0.5.10) (2020-02-06)

**Note:** Version bump only for package @lion/textarea

## [0.5.9](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.8...@lion/textarea@0.5.9) (2020-02-06)

**Note:** Version bump only for package @lion/textarea

## [0.5.8](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.7...@lion/textarea@0.5.8) (2020-02-05)

**Note:** Version bump only for package @lion/textarea

## [0.5.7](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.6...@lion/textarea@0.5.7) (2020-02-05)

**Note:** Version bump only for package @lion/textarea

## [0.5.6](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.5...@lion/textarea@0.5.6) (2020-02-03)

**Note:** Version bump only for package @lion/textarea

## [0.5.5](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.4...@lion/textarea@0.5.5) (2020-01-23)

### Bug Fixes

- update links in stories ([0c53b1d](https://github.com/ing-bank/lion/commit/0c53b1d4bb4fa51820656bacfc2aece653d03182))

## [0.5.4](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.3...@lion/textarea@0.5.4) (2020-01-23)

**Note:** Version bump only for package @lion/textarea

## [0.5.3](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.2...@lion/textarea@0.5.3) (2020-01-20)

**Note:** Version bump only for package @lion/textarea

## [0.5.2](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.1...@lion/textarea@0.5.2) (2020-01-17)

### Bug Fixes

- unregister form element when disconnected ([60284d7](https://github.com/ing-bank/lion/commit/60284d79bc538632661e2f00ef47aeb191988a91))

## [0.5.1](https://github.com/ing-bank/lion/compare/@lion/textarea@0.5.0...@lion/textarea@0.5.1) (2020-01-17)

### Bug Fixes

- update storybook and use main.js ([e61e0b9](https://github.com/ing-bank/lion/commit/e61e0b938ff72cc18cc0b3aa1560f2cece0c9fe6))

# [0.5.0](https://github.com/ing-bank/lion/compare/@lion/textarea@0.4.2...@lion/textarea@0.5.0) (2020-01-13)

### Features

- improved storybook demos ([89b835a](https://github.com/ing-bank/lion/commit/89b835a79998c45a28093de01f69216c35009a40))

## [0.4.2](https://github.com/ing-bank/lion/compare/@lion/textarea@0.4.1...@lion/textarea@0.4.2) (2020-01-08)

**Note:** Version bump only for package @lion/textarea

## [0.4.1](https://github.com/ing-bank/lion/compare/@lion/textarea@0.4.0...@lion/textarea@0.4.1) (2019-12-13)

**Note:** Version bump only for package @lion/textarea

# [0.4.0](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.8...@lion/textarea@0.4.0) (2019-12-04)

### Features

- integrate and pass automated a11y testing ([e1a417b](https://github.com/ing-bank/lion/commit/e1a417b041431e4e25a5b6a63e23ba0a3974f5a5))

## [0.3.8](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.7...@lion/textarea@0.3.8) (2019-12-03)

### Bug Fixes

- let lerna publish fixed versions ([bc7448c](https://github.com/ing-bank/lion/commit/bc7448c694deb3c05fd3d083a9acb5365b26b7ab))

## [0.3.7](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.6...@lion/textarea@0.3.7) (2019-12-02)

### Bug Fixes

- use strict versions to get correct deps on older versions ([8645c13](https://github.com/ing-bank/lion/commit/8645c13b1d77e488713f2e5e0e4e00c4d30ea1ee))

## [0.3.6](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.5...@lion/textarea@0.3.6) (2019-12-01)

**Note:** Version bump only for package @lion/textarea

## [0.3.5](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.4...@lion/textarea@0.3.5) (2019-11-28)

**Note:** Version bump only for package @lion/textarea

## [0.3.4](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.3...@lion/textarea@0.3.4) (2019-11-27)

**Note:** Version bump only for package @lion/textarea

## [0.3.3](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.2...@lion/textarea@0.3.3) (2019-11-27)

**Note:** Version bump only for package @lion/textarea

## [0.3.2](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.1...@lion/textarea@0.3.2) (2019-11-26)

**Note:** Version bump only for package @lion/textarea

## [0.3.1](https://github.com/ing-bank/lion/compare/@lion/textarea@0.3.0...@lion/textarea@0.3.1) (2019-11-22)

**Note:** Version bump only for package @lion/textarea

# [0.3.0](https://github.com/ing-bank/lion/compare/@lion/textarea@0.2.1...@lion/textarea@0.3.0) (2019-11-18)

### Features

- finalize validation and adopt it everywhere ([396deb2](https://github.com/ing-bank/lion/commit/396deb2e3b4243f102a5c98e9b0518fa0f31a6b1))

## [0.2.1](https://github.com/ing-bank/lion/compare/@lion/textarea@0.2.0...@lion/textarea@0.2.1) (2019-11-15)

**Note:** Version bump only for package @lion/textarea

# [0.2.0](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.68...@lion/textarea@0.2.0) (2019-11-13)

### Features

- remove all deprecations from lion ([66d3d39](https://github.com/ing-bank/lion/commit/66d3d390aebeaa61b6effdea7d5f7eea0e89c894))

## [0.1.68](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.67...@lion/textarea@0.1.68) (2019-11-06)

**Note:** Version bump only for package @lion/textarea

## [0.1.67](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.66...@lion/textarea@0.1.67) (2019-11-01)

**Note:** Version bump only for package @lion/textarea

## [0.1.66](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.65...@lion/textarea@0.1.66) (2019-10-25)

### Bug Fixes

- **textarea:** delegate readonly to the native element ([d78f600](https://github.com/ing-bank/lion/commit/d78f600))

## [0.1.65](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.64...@lion/textarea@0.1.65) (2019-10-23)

**Note:** Version bump only for package @lion/textarea

## [0.1.64](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.63...@lion/textarea@0.1.64) (2019-10-23)

**Note:** Version bump only for package @lion/textarea

## [0.1.63](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.62...@lion/textarea@0.1.63) (2019-10-21)

**Note:** Version bump only for package @lion/textarea

## [0.1.62](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.61...@lion/textarea@0.1.62) (2019-10-14)

**Note:** Version bump only for package @lion/textarea

## [0.1.61](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.60...@lion/textarea@0.1.61) (2019-10-11)

**Note:** Version bump only for package @lion/textarea

## [0.1.60](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.59...@lion/textarea@0.1.60) (2019-10-09)

**Note:** Version bump only for package @lion/textarea

## [0.1.59](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.58...@lion/textarea@0.1.59) (2019-10-07)

**Note:** Version bump only for package @lion/textarea

## [0.1.58](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.57...@lion/textarea@0.1.58) (2019-09-30)

**Note:** Version bump only for package @lion/textarea

## [0.1.57](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.56...@lion/textarea@0.1.57) (2019-09-27)

**Note:** Version bump only for package @lion/textarea

## [0.1.56](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.55...@lion/textarea@0.1.56) (2019-09-25)

**Note:** Version bump only for package @lion/textarea

## [0.1.55](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.54...@lion/textarea@0.1.55) (2019-09-20)

**Note:** Version bump only for package @lion/textarea

## [0.1.54](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.53...@lion/textarea@0.1.54) (2019-09-19)

**Note:** Version bump only for package @lion/textarea

## [0.1.53](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.52...@lion/textarea@0.1.53) (2019-09-13)

**Note:** Version bump only for package @lion/textarea

## [0.1.52](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.51...@lion/textarea@0.1.52) (2019-08-23)

**Note:** Version bump only for package @lion/textarea

## [0.1.51](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.50...@lion/textarea@0.1.51) (2019-08-17)

**Note:** Version bump only for package @lion/textarea

## [0.1.50](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.49...@lion/textarea@0.1.50) (2019-08-15)

**Note:** Version bump only for package @lion/textarea

## [0.1.49](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.48...@lion/textarea@0.1.49) (2019-08-15)

**Note:** Version bump only for package @lion/textarea

## [0.1.48](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.47...@lion/textarea@0.1.48) (2019-08-14)

### Bug Fixes

- **field:** move type property to input & add step property to input ([5d893f3](https://github.com/ing-bank/lion/commit/5d893f3))
- **textarea:** sync rows property instead of delegating ([7ac9d88](https://github.com/ing-bank/lion/commit/7ac9d88))

## [0.1.47](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.46...@lion/textarea@0.1.47) (2019-08-07)

**Note:** Version bump only for package @lion/textarea

## [0.1.46](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.45...@lion/textarea@0.1.46) (2019-08-07)

**Note:** Version bump only for package @lion/textarea

## [0.1.45](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.44...@lion/textarea@0.1.45) (2019-07-30)

**Note:** Version bump only for package @lion/textarea

## [0.1.44](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.43...@lion/textarea@0.1.44) (2019-07-30)

**Note:** Version bump only for package @lion/textarea

## [0.1.43](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.42...@lion/textarea@0.1.43) (2019-07-29)

### Bug Fixes

- **textarea:** wait for textarea slot before init autoresize (fix [#203](https://github.com/ing-bank/lion/issues/203)) ([2f2a42a](https://github.com/ing-bank/lion/commit/2f2a42a))

## [0.1.42](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.41...@lion/textarea@0.1.42) (2019-07-25)

**Note:** Version bump only for package @lion/textarea

## [0.1.41](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.40...@lion/textarea@0.1.41) (2019-07-24)

**Note:** Version bump only for package @lion/textarea

## [0.1.40](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.39...@lion/textarea@0.1.40) (2019-07-24)

### Bug Fixes

- **textarea:** disable user resize behavior (fix [#165](https://github.com/ing-bank/lion/issues/165)) ([9988e07](https://github.com/ing-bank/lion/commit/9988e07))

## [0.1.39](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.38...@lion/textarea@0.1.39) (2019-07-23)

**Note:** Version bump only for package @lion/textarea

## [0.1.38](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.37...@lion/textarea@0.1.38) (2019-07-23)

**Note:** Version bump only for package @lion/textarea

## [0.1.37](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.36...@lion/textarea@0.1.37) (2019-07-23)

**Note:** Version bump only for package @lion/textarea

## [0.1.36](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.35...@lion/textarea@0.1.36) (2019-07-22)

### Bug Fixes

- **textarea:** calculate max-height based on empty state (fix [#184](https://github.com/ing-bank/lion/issues/184)) ([8853435](https://github.com/ing-bank/lion/commit/8853435))

## [0.1.35](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.34...@lion/textarea@0.1.35) (2019-07-19)

**Note:** Version bump only for package @lion/textarea

## [0.1.34](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.33...@lion/textarea@0.1.34) (2019-07-19)

**Note:** Version bump only for package @lion/textarea

## [0.1.33](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.32...@lion/textarea@0.1.33) (2019-07-18)

**Note:** Version bump only for package @lion/textarea

## [0.1.32](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.31...@lion/textarea@0.1.32) (2019-07-17)

**Note:** Version bump only for package @lion/textarea

## [0.1.31](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.30...@lion/textarea@0.1.31) (2019-07-16)

**Note:** Version bump only for package @lion/textarea

## [0.1.30](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.29...@lion/textarea@0.1.30) (2019-07-16)

**Note:** Version bump only for package @lion/textarea

## [0.1.29](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.28...@lion/textarea@0.1.29) (2019-07-15)

**Note:** Version bump only for package @lion/textarea

## [0.1.28](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.27...@lion/textarea@0.1.28) (2019-07-15)

**Note:** Version bump only for package @lion/textarea

## [0.1.27](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.26...@lion/textarea@0.1.27) (2019-07-09)

**Note:** Version bump only for package @lion/textarea

## [0.1.26](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.25...@lion/textarea@0.1.26) (2019-07-04)

**Note:** Version bump only for package @lion/textarea

## [0.1.25](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.24...@lion/textarea@0.1.25) (2019-07-02)

**Note:** Version bump only for package @lion/textarea

## [0.1.24](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.23...@lion/textarea@0.1.24) (2019-07-02)

**Note:** Version bump only for package @lion/textarea

## [0.1.23](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.22...@lion/textarea@0.1.23) (2019-06-27)

**Note:** Version bump only for package @lion/textarea

## [0.1.22](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.21...@lion/textarea@0.1.22) (2019-06-24)

**Note:** Version bump only for package @lion/textarea

## [0.1.21](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.20...@lion/textarea@0.1.21) (2019-06-20)

**Note:** Version bump only for package @lion/textarea

## [0.1.20](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.19...@lion/textarea@0.1.20) (2019-06-18)

**Note:** Version bump only for package @lion/textarea

## [0.1.19](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.18...@lion/textarea@0.1.19) (2019-06-06)

**Note:** Version bump only for package @lion/textarea

## [0.1.18](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.17...@lion/textarea@0.1.18) (2019-06-04)

**Note:** Version bump only for package @lion/textarea

## [0.1.17](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.16...@lion/textarea@0.1.17) (2019-05-31)

**Note:** Version bump only for package @lion/textarea

## [0.1.16](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.15...@lion/textarea@0.1.16) (2019-05-31)

**Note:** Version bump only for package @lion/textarea

## [0.1.15](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.14...@lion/textarea@0.1.15) (2019-05-29)

**Note:** Version bump only for package @lion/textarea

## [0.1.14](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.13...@lion/textarea@0.1.14) (2019-05-29)

**Note:** Version bump only for package @lion/textarea

## [0.1.13](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.12...@lion/textarea@0.1.13) (2019-05-24)

**Note:** Version bump only for package @lion/textarea

## [0.1.12](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.11...@lion/textarea@0.1.12) (2019-05-22)

**Note:** Version bump only for package @lion/textarea

## [0.1.11](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.10...@lion/textarea@0.1.11) (2019-05-17)

**Note:** Version bump only for package @lion/textarea

## [0.1.10](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.9...@lion/textarea@0.1.10) (2019-05-16)

**Note:** Version bump only for package @lion/textarea

## [0.1.9](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.8...@lion/textarea@0.1.9) (2019-05-16)

**Note:** Version bump only for package @lion/textarea

## [0.1.8](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.7...@lion/textarea@0.1.8) (2019-05-13)

**Note:** Version bump only for package @lion/textarea

## [0.1.7](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.6...@lion/textarea@0.1.7) (2019-05-13)

### Bug Fixes

- add prepublish step to make links absolute for npm docs ([9f2c4f6](https://github.com/ing-bank/lion/commit/9f2c4f6))

## [0.1.6](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.5...@lion/textarea@0.1.6) (2019-05-08)

**Note:** Version bump only for package @lion/textarea

## [0.1.5](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.4...@lion/textarea@0.1.5) (2019-05-07)

**Note:** Version bump only for package @lion/textarea

## [0.1.4](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.3...@lion/textarea@0.1.4) (2019-04-29)

**Note:** Version bump only for package @lion/textarea

## [0.1.3](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.2...@lion/textarea@0.1.3) (2019-04-28)

### Bug Fixes

- update storybook/linting; adjust story labels, eslint ignores ([8d96f84](https://github.com/ing-bank/lion/commit/8d96f84))

## [0.1.2](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.1...@lion/textarea@0.1.2) (2019-04-27)

**Note:** Version bump only for package @lion/textarea

## [0.1.1](https://github.com/ing-bank/lion/compare/@lion/textarea@0.1.0...@lion/textarea@0.1.1) (2019-04-26)

### Bug Fixes

- add missing files to npm packages ([0e3ca17](https://github.com/ing-bank/lion/commit/0e3ca17))

# 0.1.0 (2019-04-26)

### Features

- release inital public lion version ([ec8da8f](https://github.com/ing-bank/lion/commit/ec8da8f))
