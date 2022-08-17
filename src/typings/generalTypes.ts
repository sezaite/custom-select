export interface OptionValues {
    id: string | number,
    value: string | number,
    isSelected: boolean,
}

export interface SelectOption {
    groupName: string | number,
    groupID: string | number,
    groupList: Array<OptionValues>
}

export interface SelectGrouped {
    id: string | number,
    placeholder?: string, 
    options: Array<SelectOption>,
}