// import React, { createContext, useContext } from 'react';
import React from 'react'
import { Dropdown } from './components/Dropdown'

export type GroupedListType = typeof GROUPED_LIST

const GROUPED_LIST = {
  id: 'test-grouped',
  placeholder: 'Select a few',
  options: [
    {
      groupName: 'Group-1',
      groupID: 'group1',
      groupList: [
        {
          id: 1,
          value: 'Tree',
          isSelected: false,
        },
        {
          id: 2,
          value: 'Cat',
          isSelected: false,
        },
        {
          id: 3,
          value: 89.39,
          isSelected: false,
        },
      ],
    },
    {
      groupName: 'Group-2',
      groupID: 'group2',
      groupList: [
        {
          id: 1,
          value: 'Cloud',
          isSelected: false,
        },
        {
          id: 2,
          value: 19,
          isSelected: false,
        },
      ],
    },
  ],
}

// export const DropdownContext = createContext<GroupedListType>(GROUPED_LIST);
// export const useDropdownContext = () => useContext(DropdownContext);
const App = () => {
  return (
  // <DropdownContext.Provider value={GROUPED_LIST}>
    <Dropdown id="test-id" isGrouped={false} data={GROUPED_LIST} dropdownMenuHeight="220px" width="250px" />
  // </DropdownContext.Provider>
  )
}

export default App
