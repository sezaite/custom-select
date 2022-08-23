import React from 'react'
import styled from 'styled-components'
import { OptionValues } from '../../typings/generalTypes'
import check from '../../assets/icons/checkLg.svg'

export interface OptionStyledProps {
  optionValue: OptionValues
}

export interface OptionProps extends OptionStyledProps {
  onSelect: (id: number | string, groupID: number | string) => void
  group: number | string
}

export const SingleOption: React.FC<OptionProps> = ({ optionValue, onSelect, group }) => {
  const handleClick = () => {
    onSelect(optionValue.id, group)
  }
  return (
    <StyledOption onClick={() => handleClick()} optionValue={optionValue}>{ optionValue.value }

    </StyledOption>
  )
}

const StyledOption = styled.div<OptionStyledProps>`
    position: relative;
    color: #000;
    cursor: pointer;
    padding: 8px 15px;
    font-size: 0.8rem;
    background-color:${({ optionValue }) => optionValue.isSelected ? '#b6bbbd' : '#ffffff'};
    &:hover {
        background-color: #dbdfe1;
    }
    &:after {
        content: "";
        position: absolute;
        background-image: url(${check});
        background-repeat: no-repeat;
        background-position: right;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: ${({ optionValue }) => optionValue.isSelected ? '100%' : '0'};
        height: 8px;
    }
`
