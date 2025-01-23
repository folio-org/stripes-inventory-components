import noop from 'lodash/noop';

import { REQUEST_URL_LIMIT } from '@folio/stripes/smart-components';
import stripesSmartComponentsTranslations from '@folio/stripes-smart-components/translations/stripes-smart-components/en';
import { render } from '@folio/jest-config-stripes/testing-library/react';

import { withSearchErrors } from './withSearchErrors';
import Harness from '../../../test/jest/helpers/Harness';
import { buildRecordsManifest } from '../../buildRecordsManifest';

const mockSendCallout = jest.fn();
const mockWrappedComponent = jest.fn();
mockWrappedComponent.manifest = {
  records: buildRecordsManifest(noop),
};

const SearchErrors = withSearchErrors(mockWrappedComponent);

const translations = [{
  prefix: 'stripes-smart-components',
  translations: stripesSmartComponentsTranslations,
}];
const urlLimitExceeded = `Search URI request character limit has been exceeded. The character limit is ${REQUEST_URL_LIMIT}. Please revise your search and/or facet selections.`;
const resources = {
  requestUrlQuery: 'request query',
  records: {
    failed: false,
  },
};

const getComponent = (props = {}, { showToast } = {}) => (
  <Harness
    sendCallout={mockSendCallout}
    translations={translations}
  >
    <SearchErrors
      resources={resources}
      {...props}
    />
    {showToast && (
      <div id="callout-1">
        {urlLimitExceeded}
      </div>
    )}
  </Harness>
);

const renderSearchErrors = (props, options) => render(getComponent(props, options));

describe('withSearchErrors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when error code 414', () => {
    it('should display the error message', () => {
      renderSearchErrors({
        resources: {
          records: {
            failed: {
              httpStatus: 414,
            },
          },
          requestUrlQuery: 'some long string to trigger the error',
        },
      });

      expect(mockSendCallout).toHaveBeenCalledWith({
        message: urlLimitExceeded,
        type: 'error',
      });
    });
  });

  describe('when there is the error for both records and facets', () => {
    it('should display the error message once', () => {
      renderSearchErrors({
        resources: {
          records: {
            failed: {
              httpStatus: 414,
            },
          },
          requestUrlQuery: 'some long string to trigger the error',
        },
      }, {
        showToast: true,
      });

      expect(mockSendCallout).not.toHaveBeenCalled();
    });
  });

  it('should not display an error', () => {
    renderSearchErrors({
      resources: {
        records: {
          failed: false,
        },
      },
    });

    expect(mockSendCallout).not.toHaveBeenCalled();
  });

  it('should have the same manifest as wrapped component', () => {
    renderSearchErrors();

    expect(SearchErrors.manifest).toEqual(mockWrappedComponent.manifest);
  });

  it('should pass the `isRequestUrlExceededLimit` property correctly', async () => {
    const props = {
      resources: {
        records: {
          failed: {
            httpStatus: 414,
          },
        },
        requestUrlQuery: 'some long string to trigger the error',
      },
    };
    const { rerender } = renderSearchErrors(props);

    expect(mockWrappedComponent).toHaveBeenLastCalledWith({
      ...props,
      isRequestUrlExceededLimit: true,
    }, {});

    const props2 = {
      resources: {
        records: {
          failed: false,
        },
      },
    };

    rerender(getComponent(props2));

    expect(mockWrappedComponent).toHaveBeenLastCalledWith({
      ...props2,
      isRequestUrlExceededLimit: false,
    }, {});
  });

  it('should display the default error for other errors', () => {
    const props = {
      resources: {
        records: {
          failed: {
            httpStatus: 400,
          },
        },
        requestUrlQuery: 'test',
      },
    };

    renderSearchErrors(props);

    expect(mockWrappedComponent).toHaveBeenLastCalledWith({
      ...props,
      isRequestUrlExceededLimit: false,
    }, {});

    expect(mockSendCallout).toHaveBeenCalledWith({
      message: 'Search could not be processed. Please check your query and try again.',
      type: 'error',
    });
  });
});
