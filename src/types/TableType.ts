export type ColumnType = "name" | "id" | "product"

export interface IItem {
    staticId: string
    id: number | null
    product: string
    name: string | null

    isBlocked: boolean
    isOpacity: boolean
    iconName: string | null
}
