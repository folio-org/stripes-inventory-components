import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import noop from 'lodash/noop';

import {
  fireEvent,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { TagsFacet } from './TagsFacet';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import { FACETS } from '../../constants';

const TAGS = [{
  'id': 'd3c8b511-41e7-422e-a483-18778d0596e5',
  'label': 'important',
  'metadata': {
    'createdDate': '2020-11-23T03:21:03.915+00:00',
    'updatedDate': '2020-11-23T03:21:03.915+00:00'
  }
}, {
  'id': 'b822d5a8-1750-4b5f-92bd-9fc73a05ddda',
  'label': 'new',
  'description': 'new',
  'metadata': {
    'createdDate': '2020-11-23T11:10:48.413+00:00',
    'createdByUserId': 'f40d6d27-8af3-5718-9eb1-5046622e5f8c',
    'updatedDate': '2020-11-23T11:10:48.413+00:00',
    'updatedByUserId': 'f40d6d27-8af3-5718-9eb1-5046622e5f8c'
  }
}, {
  'id': 'c3799dc5-500b-44dd-8e17-2f2354cc43e3',
  'label': 'urgent',
  'description': 'Requires urgent attention',
  'metadata': {
    'createdDate': '2020-11-23T03:21:03.894+00:00',
    'updatedDate': '2020-11-23T03:21:03.894+00:00'
  }
}];

const filterAccordionTitle = 'Tags';
const mockOnChange = jest.fn();
const mockOnClear = jest.fn();

const renderFilter = (props) => (renderWithIntl(
  <Router>
    <TagsFacet
      name={FACETS.INSTANCES_TAGS}
      facetOptions={{ instanceTags: [] }}
      activeFilters={{}}
      getIsLoading={() => false}
      onChange={mockOnChange}
      onClear={mockOnClear}
      onFetch={noop}
      onSearch={noop}
      {...props}
    />
  </Router>,
  translationsProperties,
));

describe('TagsFilter component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display filter without tags', () => {
    renderFilter();
    expect(screen.getByText(filterAccordionTitle)).toBeDefined();
  });

  it('should display filter accordion with tags', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
    });
    expect(screen.getByText(filterAccordionTitle)).toBeDefined();
    expect(screen.getByText(TAGS[0].label)).toBeDefined();
  });

  it('should display filter accordion with tags and selected values', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
      activeFilters: {
        [FACETS.INSTANCES_TAGS]: ['urgent'],
      },
    });
    expect(screen.getByText('new')).toBeDefined();
  });

  it('should call onChange handler if new tag is clicked', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
    });

    fireEvent.click(screen.getByText('new'));

    expect(mockOnChange).toHaveBeenCalledWith({
      name: 'instancesTags',
      values: ['new'],
    });
  });

  it('should call onChange handler if selected tag is clicked', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
      activeFilters: {
        [FACETS.INSTANCES_TAGS]: ['urgent'],
      },
    });

    fireEvent.click(screen.queryByText('urgent'));

    expect(mockOnChange).toHaveBeenCalledWith({
      name: 'instancesTags',
      values: [],
    });
  });

  it('should call onClear handler if clear btn is clicked', () => {
    renderFilter({
      facetOptions: {
        instanceTags: TAGS,
      },
      activeFilters: {
        [FACETS.INSTANCES_TAGS]: ['urgent'],
      },
    });

    fireEvent.click(screen.getAllByLabelText('Clear selected filters for "Tags"')[0]);

    expect(mockOnClear).toHaveBeenCalledWith('instancesTags');
  });


  it('should display filter accordion without tags and selected values', () => {
    renderFilter({
      activeFilters: {
        [FACETS.INSTANCES_TAGS]: ['urgent'],
      },
    });
    expect(screen.getByText('No matching options')).toBeDefined();
  });
});
