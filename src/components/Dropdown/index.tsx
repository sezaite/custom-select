import React, {useEffect, useState} from "react";
import { useDropdownContext } from "../../App";
import styled from 'styled-components';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import { SingleOption } from "./SingleOption";


interface DropdownProps extends React.InputHTMLAttributes<HTMLIFrameElement> {
    id: string;
    isGrouped: boolean;
}

interface SelectMenuProps {
    isOpen: boolean,
}

export const Dropdown: React.FC<DropdownProps> = ({id, isGrouped}) => {
    const {options, placeholder} = useDropdownContext();
    const [selectMenu, setSelectMenu] = useState(options);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        return;
    }
    const onSelect = (id: number | string, groupID: number | string) => {
            const newState = selectMenu;
            const newArr = newState.map(group => {
                if (group.groupID === groupID){
                       const newList = group.groupList.map(option=>{
                        if (option.id === id) {
                            option.isSelected = !option.isSelected;
                            return option;
                        } else {
                            return option;
                        }
                        
                    });
                    return {groupName: group.groupName, groupID: group.groupID, groupList: newList}
                } else {
                    return group;
                }
            });
            setSelectMenu(newArr);
        }
    
    return <DropdownWrap id={id}>
        <DropdownToggler type="button" onClick={handleClick}>
            {placeholder}
            <Image src={ChevronDown} alt="arrow down" isOpen={isOpen}/>
        </DropdownToggler>

        <SelectMenu isOpen={isOpen}>
        {
            selectMenu.map(({groupName, groupID, groupList})=> (
               <div key={groupID}>
                {
                    isGrouped ?  <GroupNameLabel>{groupName}</GroupNameLabel> : ""
                }
                {
                    groupList.map((item) => (
                        <SingleOption key={item.id} optionValue={item} group={groupID} onSelect={onSelect}/>
                            
                    ))
                }
               </div>
                
            ))
        }
        </SelectMenu>
    </DropdownWrap>
}

const DropdownWrap = styled.div`
    position: relative;
    width: 200px;
    margin: 30px auto;
`

const DropdownToggler = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 15px;
    border-radius: 0;
    border: 1px solid #333;
    background-color: transparent;
    cursor: pointer;
`

const SelectMenu = styled.div<SelectMenuProps>`
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    display:${({isOpen})=>isOpen ? "block" : "none" };
    border: 1px solid #333;
    border-top: none;
    max-height: 160px;
    overflow-y: auto;
`
const Image = styled.img<SelectMenuProps>`
    transform: ${({isOpen})=>isOpen ? "rotate(-180deg)" : "rotate(0)" };
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

