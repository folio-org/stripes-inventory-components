import { create } from 'zustand';

/*
  Is used for:
- reset `value` from a facet's input field when a reset button is clicked, a segment is changed, or a redirect occurs
- use `facetStates` in `useEffect` without adding it as a dependency, so as not to trigger the effect becaouse of it
 */

const facetsStore = create((set) => ({
  facetStates: [],
  setFacetStates: (newState) => set({
    facetStates: newState,
  }),
  setFacetStatesByName: (name, value) => set((state) => ({
    facetStates: state.facetStates.map(facet => {
      if (facet.name === name) {
        return {
          ...facet,
          ...value,
        };
      }
      return facet;
    })
  })),
  resetFacetStates: ({ isBrowseLookup } = {}) => set(state => {
    if (isBrowseLookup) {
      return {
        facetStates: state.facetStates.map(facet => ({
          name: facet.name,
          isOpen: false,
          isFocused: false,
          isMoreClicked: false,
          value: '',
        })),
      };
    }

    return {
      facetStates: state.facetStates.map(facet => ({
        name: facet.name,
        isOpen: facet.isOpen,
        isFocused: false,
        isMoreClicked: false,
        value: '',
      })),
    };
  }),
  resetFacetSearchValue: (name) => set(state => ({
    facetStates: state.facetStates.map(facet => {
      if (facet.name === name) {
        return {
          ...facet,
          value: '',
        };
      }
      return facet;
    }),
  })),
  deleteFacetStates: () => set({
    facetStates: [],
  }),
}));

// selectors
const getSearchTerm = (name) => {
  return facetsStore.getState().facetStates.find(facet => facet.name === name)?.value ?? '';
};
const resetFacetStates = (params) => facetsStore.getState().resetFacetStates(params);
const resetFacetSearchValue = (name) => facetsStore.getState().resetFacetSearchValue(name);
const deleteFacetStates = () => facetsStore.getState().deleteFacetStates();

// hooks
const useFacetStates = () => facetsStore(store => ({
  facetStates: store.facetStates,
  setFacetStatesByName: store.setFacetStatesByName,
  setFacetStates: store.setFacetStates,
}));
const useResetFacetStates = () => facetsStore(store => store.resetFacetStates);
const useSearchValue = name => facetsStore(store => store.facetStates.find(facet => facet.name === name)?.value);

export {
  getSearchTerm,
  deleteFacetStates,
  resetFacetStates,
  resetFacetSearchValue,
  useFacetStates,
  useResetFacetStates,
  useSearchValue,
};
