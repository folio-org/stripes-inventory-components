import stripesComponentsTranslations from '@folio/stripes-components/translations/stripes-components/en';
import stripesSmartComponentsTranslations from '@folio/stripes-smart-components/translations/stripes-smart-components/en';
import stripesCoreTranslations from '@folio/stripes-core/translations/stripes-core/en';
import stripesAcqComponentsTranslations from '@folio/stripes-acq-components/translations/stripes-acq-components/en';
import translations from '../../../translations/stripes-inventory-components/en';

const translationsProperties = [
  {
    prefix: 'stripes-inventory-components',
    translations,
  },
  {
    prefix: 'stripes-components',
    translations: stripesComponentsTranslations,
  },
  {
    prefix: 'stripes-smart-components',
    translations: stripesSmartComponentsTranslations,
  },
  {
    prefix: 'stripes-core',
    translations: stripesCoreTranslations,
  },
  {
    prefix: 'stripes-acq-components',
    translations: stripesAcqComponentsTranslations,
  }
];

export default translationsProperties;
