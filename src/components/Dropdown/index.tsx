import React, { useState } from 'react'
// import { GroupedListType, useDropdownContext } from "../../App";
import { GroupedListType } from '../../App'
import styled from 'styled-components'
import ChevronDown from '../../assets/icons/chevronDown.svg'
import { SingleOption } from './SingleOption'

interface DropdownProps extends DropdownStyledProps, SelectButtonStyledProps, SelectMenuStyledProps {
  id: string
  isGrouped: boolean
  data: GroupedListType
  chevron?: string

}

interface DropdownStyledProps {
  width?: string
}

interface SelectButtonStyledProps {
  border?: string
  buttonHeight?: string
}

interface SelectMenuStyledProps {
  dropdownMenuHeight?: string
}

interface SelectMenuProps extends SelectMenuStyledProps{
  isOpen: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({ id, isGrouped, data, border, width, chevron = ChevronDown, buttonHeight, dropdownMenuHeight }) => {
  const [selectMenu, setSelectMenu] = useState(data.options)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  const onSelect = (id: number | string, groupID: number | string) => {
    const newState = selectMenu
    const newArr = newState.map(group => {
      if (group.groupID === groupID) {
        const newList = group.groupList.map(option => {
          if (option.id === id) {
            option.isSelected = !option.isSelected
            return option
          } else {
            return option
          }
        })
        return { groupName: group.groupName, groupID: group.groupID, groupList: newList }
      } else {
        return group
      }
    })
    setSelectMenu(newArr)
  }

  return (
    <DropdownWrap id={id} width={width}>
      <DropdownToggler border={border} type="button" onClick={handleClick} buttonHeight={buttonHeight}>
        { data.placeholder }
        <Image src={chevron} alt="arrow down" isOpen={isOpen} />
      </DropdownToggler>

      <SelectMenu isOpen={isOpen} dropdownMenuHeight={dropdownMenuHeight}>
        {
            selectMenu.map(({ groupName, groupID, groupList }) => (
              <div key={groupID}>
                {
                    isGrouped ? <GroupNameLabel>{ groupName }</GroupNameLabel> : ''
                }
                {
                    groupList.map((item) => (
                      <SingleOption key={item.id} optionValue={item} group={groupID} onSelect={onSelect} />

                    ))
                }
              </div>

            ))
        }
      </SelectMenu>
    </DropdownWrap>
  )
}

const DropdownWrap = styled.div<DropdownStyledProps>`
    position: relative;
    width: ${({ width }) => width ?? '200px'};
    margin: 30px auto;
`

const DropdownToggler = styled.button<SelectButtonStyledProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 15px;
    height: ${({ buttonHeight }) => buttonHeight ?? '42px'};
    border-radius: 0;
    border: ${({ border }) => border ?? '1px solid #333'};
    background-color: transparent;
    cursor: pointer;
`

const SelectMenu = styled.div<SelectMenuProps>`
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    display:${({ isOpen }) => isOpen ? 'block' : 'none'};
    border: 1px solid #333;
    border-top: none;
    max-height: ${({ dropdownMenuHeight }) => dropdownMenuHeight ?? '160px'};
    overflow-y: auto;
`
const Image = styled.img<SelectMenuProps>`
    transform: ${({ isOpen }) => isOpen ? 'rotate(-180deg)' : 'rotate(0)'};
    transition: all 0.2s ease-in-out
`

const GroupNameLabel = styled.h6`
    opacity: 0.7;
    font-size: 0.9rem;
    font-weight: 400;
    background-color: #0f0f12;
    color: #ffffff;
    padding: 8px 15px;
`
