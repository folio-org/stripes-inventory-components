import { create } from 'zustand';

/*
  Is used for:
- reset `value` from a facet's input field when a reset button is clicked, a segment is changed, or a redirect occurs
- use `facetStates` in `useEffect` without adding it as a dependency, so as not to trigger the effect becaouse of it
 */

const facetsStore = create((set) => ({
  setFacetStates: (newState, namespace) => set({
    [namespace]: newState,
  }),
  setFacetStatesByName: (name, value, namespace) => set((state) => ({
    [namespace]: state[namespace].map(facet => {
      if (facet.name === name) {
        return {
          ...facet,
          ...value,
        };
      }
      return facet;
    })
  })),
  resetFacetStates: ({ isBrowseLookup, namespace }) => set(state => {
    if (isBrowseLookup) {
      return {
        [namespace]: state[namespace].map(facet => ({
          name: facet.name,
          isOpen: false,
          isFocused: false,
          isMoreClicked: false,
          value: '',
        })),
      };
    }

    return {
      [namespace]: state[namespace].map(facet => ({
        name: facet.name,
        isOpen: facet.isOpen,
        isFocused: false,
        isMoreClicked: false,
        value: '',
      })),
    };
  }),
  resetFacetSearchValue: (name, namespace) => set(state => ({
    [namespace]: state[namespace].map(facet => {
      if (facet.name === name) {
        return {
          ...facet,
          value: '',
        };
      }
      return facet;
    }),
  })),
  deleteFacetStates: (namespace) => set({
    [namespace]: [],
  }),
}));

// selectors
const getSearchTerm = (name, namespace) => {
  return facetsStore.getState()[namespace]?.find(facet => facet.name === name)?.value ?? '';
};
const resetFacetStates = (params) => facetsStore.getState().resetFacetStates(params);
const resetFacetSearchValue = (name, namespace) => facetsStore.getState().resetFacetSearchValue(name, namespace);
const deleteFacetStates = (namespace) => facetsStore.getState().deleteFacetStates(namespace);

// hooks
const useFacetStates = (namespace) => facetsStore(store => ({
  facetStates: store[namespace] || [],
  setFacetStatesByName: (name, value) => store.setFacetStatesByName(name, value, namespace),
  setFacetStates: (newState) => store.setFacetStates(newState, namespace),
}));
const useResetFacetStates = (namespace) => facetsStore(store => {
  return ({ isBrowseLookup } = {}) => store.resetFacetStates({ namespace, isBrowseLookup });
});
const useSearchValue = (name, namespace) => facetsStore(store => store[namespace]?.find(facet => facet.name === name)?.value ?? '');

export {
  getSearchTerm,
  deleteFacetStates,
  resetFacetStates,
  resetFacetSearchValue,
  useFacetStates,
  useResetFacetStates,
  useSearchValue,
};
