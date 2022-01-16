export interface ResourceAttributeType {
    field: string,
    label: string,
    applied: string,
    change: string | null,
    overrideApplied: string | null, 
    overrideChange: string | null, 
}

export interface ResourceItem {
    id: string,
    attrs: ResourceAttributeType[]
}

export interface ResourceItemShort {
    id: string,
    name: string,
    attrsChanged: string[],
}