import {
  expect,
  fixture as _fixture,
  fixtureSync as _fixtureSync,
  html,
  defineCE,
  unsafeStatic,
  aTimeout,
} from '@open-wc/testing';
import sinon from 'sinon';
// @ts-ignore
import { PhoneUtilManager } from '@lion/input-tel';
// @ts-ignore
import { mockPhoneUtilManager, restorePhoneUtilManager } from '@lion/input-tel/test-helpers';
import { LionInputTelDropdown } from '../src/LionInputTelDropdown.js';

/**
 * @typedef {import('@lion/core').TemplateResult} TemplateResult
 * @typedef {HTMLSelectElement|HTMLElement & {modelValue:string}} DropdownElement
 * @typedef {import('../types').TemplateDataForDropdownInputTel} TemplateDataForDropdownInputTel
 */

const fixture = /** @type {(arg: string | TemplateResult) => Promise<LionInputTelDropdown>} */ (
  _fixture
);
const fixtureSync = /** @type {(arg: string | TemplateResult) => LionInputTelDropdown} */ (
  _fixtureSync
);

/**
 * @param {DropdownElement} dropdownEl
 * @returns {string}
 */
function getDropdownValue(dropdownEl) {
  if ('modelValue' in dropdownEl) {
    return dropdownEl.modelValue;
  }
  return dropdownEl.value;
}

/**
 * @param {DropdownElement} dropdownEl
 * @param {string} value
 */
function mimicUserChangingDropdown(dropdownEl, value) {
  if ('modelValue' in dropdownEl) {
    // eslint-disable-next-line no-param-reassign
    dropdownEl.modelValue = value;
    dropdownEl.dispatchEvent(
      new CustomEvent('model-value-changed', { detail: { isTriggeredByUser: true } }),
    );
  } else {
    // eslint-disable-next-line no-param-reassign
    dropdownEl.value = value;
    dropdownEl.dispatchEvent(new Event('change'));
  }
}

/**
 * @param {{ klass:LionInputTelDropdown }} config
 */
// @ts-expect-error
export function runInputTelDropdownSuite({ klass } = { klass: LionInputTelDropdown }) {
  // @ts-ignore
  const tagName = defineCE(/** @type {* & HTMLElement} */ (class extends klass {}));
  const tag = unsafeStatic(tagName);

  describe('LionInputTelDropdown', () => {
    beforeEach(async () => {
      // Wait till PhoneUtilManager has been loaded
      await PhoneUtilManager.loadComplete;
    });

    describe('Dropdown display', () => {
      it('calls `templates.dropdown` with TemplateDataForDropdownInputTel object', async () => {
        const el = fixtureSync(html` <${tag}
          .modelValue="${'+31612345678'}"
          .allowedRegions="${['NL', 'PH']}"
          .preferredRegions="${['PH']}"
          ></${tag}> `);
        const spy = sinon.spy(
          /** @type {typeof LionInputTelDropdown} */ (el.constructor).templates,
          'dropdown',
        );
        await el.updateComplete;
        const dropdownNode = el.refs.dropdown.value;
        const templateDataForDropdown = /** @type {TemplateDataForDropdownInputTel} */ (
          spy.args[0][0]
        );
        expect(templateDataForDropdown).to.eql(
          /** @type {TemplateDataForDropdownInputTel} */ ({
            data: {
              activeRegion: 'NL',
              regionMetaList: [
                {
                  countryCode: 31,
                  flagSymbol: '🇳🇱',
                  nameForLocale: 'Netherlands',
                  nameForRegion: 'Nederland',
                  regionCode: 'NL',
                },
              ],
              regionMetaListPreferred: [
                {
                  countryCode: 63,
                  flagSymbol: '🇵🇭',
                  nameForLocale: 'Philippines',
                  nameForRegion: 'Philippines',
                  regionCode: 'PH',
                },
              ],
            },
            refs: {
              dropdown: {
                labels: { selectCountry: 'Select country' },
                listeners: {
                  // @ts-expect-error [allow-protected]
                  change: el._onDropdownValueChange,
                  // @ts-expect-error [allow-protected]
                  'model-value-changed': el._onDropdownValueChange,
                },
                props: { style: 'height: 100%;' },
                ref: { value: dropdownNode },
              },
            },
          }),
        );
      });

      it('syncs dropdown value initially from activeRegion', async () => {
        const el = await fixture(html` <${tag} .allowedRegions="${['DE']}"></${tag}> `);
        expect(getDropdownValue(/** @type {DropdownElement} */ (el.refs.dropdown.value))).to.equal(
          'DE',
        );
      });

      it('syncs disabled attribute to dropdown', async () => {
        const el = await fixture(html` <${tag} disabled></${tag}> `);
        expect(el.refs.dropdown.value?.hasAttribute('disabled')).to.be.true;
      });

      it('disables dropdown on readonly', async () => {
        const el = await fixture(html` <${tag} readonly></${tag}> `);
        expect(el.refs.dropdown.value?.hasAttribute('disabled')).to.be.true;
      });

      it('renders to prefix slot in light dom', async () => {
        const el = await fixture(html` <${tag} .allowedRegions="${['DE']}"></${tag}> `);
        const prefixSlot = /** @type {HTMLElement} */ (
          /** @type {HTMLElement} */ (el.refs.dropdown.value).parentElement
        );
        expect(prefixSlot.getAttribute('slot')).to.equal('prefix');
        expect(prefixSlot.slot).to.equal('prefix');
        expect(prefixSlot.parentElement).to.equal(el);
      });

      it('rerenders light dom when PhoneUtil loaded', async () => {
        const { resolveLoaded } = mockPhoneUtilManager();
        const el = await fixture(html` <${tag} .allowedRegions="${['DE']}"></${tag}> `);
        // @ts-ignore
        const spy = sinon.spy(el, '_scheduleLightDomRender');
        resolveLoaded(undefined);
        await aTimeout(0);
        expect(spy).to.have.been.calledOnce;
        restorePhoneUtilManager();
      });
    });

    describe('On dropdown value change', () => {
      it('changes the currently active country code in the textbox', async () => {
        const el = await fixture(
          html` <${tag} .allowedRegions="${[
            'NL',
            'BE',
          ]}" .modelValue="${'+31612345678'}"></${tag}> `,
        );
        // @ts-ignore
        mimicUserChangingDropdown(el.refs.dropdown.value, 'BE');
        await el.updateComplete;
        expect(el.activeRegion).to.equal('BE');
        expect(el.modelValue).to.equal('+32612345678');
        await el.updateComplete;
        expect(el.value).to.equal('+32612345678');
      });

      it('focuses the textbox right after selection', async () => {
        const el = await fixture(
          html` <${tag} .allowedRegions="${[
            'NL',
            'BE',
          ]}" .modelValue="${'+31612345678'}"></${tag}> `,
        );
        // @ts-ignore
        mimicUserChangingDropdown(el.refs.dropdown.value, 'BE');
        await el.updateComplete;
        // @ts-expect-error
        expect(el._inputNode).to.equal(document.activeElement);
      });

      it('prefills country code when textbox is empty', async () => {
        const el = await fixture(html` <${tag} .allowedRegions="${['NL', 'BE']}"></${tag}> `);
        // @ts-ignore
        mimicUserChangingDropdown(el.refs.dropdown.value, 'BE');
        await el.updateComplete;
        await el.updateComplete;
        expect(el.value).to.equal('+32');
      });
    });

    describe('On activeRegion change', () => {
      it('updates dropdown value ', async () => {
        const el = await fixture(html` <${tag} .modelValue="${'+31612345678'}"></${tag}> `);
        expect(el.activeRegion).to.equal('NL');
        // @ts-expect-error [allow protected]
        el._setActiveRegion('BE');
        await el.updateComplete;
        expect(getDropdownValue(/** @type {DropdownElement} */ (el.refs.dropdown.value))).to.equal(
          'BE',
        );
      });
    });
  });
}
