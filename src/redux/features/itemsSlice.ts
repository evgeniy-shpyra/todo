import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import { ColumnType, IItem } from "../../types/TableType"

interface IInitialState {
    items: IItem[]
    selectedItemsId: string[]
    companyIcons: { name: string; isUsed: boolean }[]
}

const initialState: IInitialState = {
    items: [
        {
            staticId: nanoid(),
            id: 1,
            product: "XXXX-",
            name: "Синий",
            isOpacity: false,
            isBlocked: false,

            iconName: "delivery.svg",
        },
        {
            staticId: nanoid(),
            id: 75,
            product: "XXXX-",
            name: "41-й размерр...",
            isOpacity: false,
            isBlocked: false,

            iconName: "ua.svg",
        },
        {
            staticId: nanoid(),
            id: 7,
            product: "XXXX-",
            name: "8Gb",
            isOpacity: false,
            isBlocked: false,

            iconName: "shop-logistics.svg",
        },
        {
            staticId: nanoid(),
            id: 215,
            product: "XXXX-",
            name: "Silver",
            isOpacity: false,
            isBlocked: false,

            iconName: "rozetka.svg",
        },
        {
            staticId: nanoid(),
            id: 75,
            product: "XXXX-",
            name: "Rose gold",
            isOpacity: false,
            isBlocked: false,

            iconName: "flag.svg",
        },
        {
            staticId: nanoid(),
            id: 45,
            product: "XXXX-",
            name: "32Gb",
            isOpacity: false,
            isBlocked: false,

            iconName: "amazon.svg",
        },
    ],
    companyIcons: [
        { name: "amazon.svg", isUsed: true },
        { name: "delivery.svg", isUsed: true },
        { name: "flag.svg", isUsed: true },
        { name: "kyivstar.svg", isUsed: false },
        { name: "shop-logistics.svg", isUsed: true },
        { name: "fotos.svg", isUsed: false },
        { name: "rozetka.svg", isUsed: true },
        { name: "ua.svg", isUsed: true },
        { name: "ups.svg", isUsed: false },
    ],
    selectedItemsId: [],
}

const itemsSlice = createSlice({
    name: "itemsSlice",
    initialState,
    reducers: {
        onChangeRowValue: (
            state,
            action: PayloadAction<{
                type: ColumnType
                value: string
                staticId: string
            }>
        ) => {
            const index = state.items.findIndex(
                (item) => item.staticId === action.payload.staticId
            )

            switch (action.payload.type) {
                case "id":
                    state.items[index].id = Number(action.payload.value)
                    break
                case "name":
                    state.items[index].name = action.payload.value
                    break
                case "product":
                    state.items[index].product = action.payload.value
                    break
            }
        },

        addItem: (state, action: PayloadAction<void>) => {
            const newStaticId = nanoid()
            state.items.unshift({
                staticId: newStaticId,
                id: null,
                product: "XXXX-",
                name: null,
                isOpacity: false,
                isBlocked: false,
                iconName: null,
            })
        },

        deleteItem: (state, action: PayloadAction<{ staticId: string }>) => {
            const index = state.items.findIndex(
                (item) => item.staticId === action.payload.staticId
            )

            const iconIndex = state.companyIcons.findIndex(
                (item) => item.name === state.items[index].iconName
            )
            if (iconIndex >= 0)
                state.companyIcons[iconIndex].isUsed = false 

            state.items.splice(index, 1)
        },

        changeCompanyIcon: (
            state,
            action: PayloadAction<{ staticId: string; iconName: string }>
        ) => {
            const itemIndex = state.items.findIndex(
                (item) => item.staticId === action.payload.staticId
            )

            const oldIconIndex = state.companyIcons.findIndex(
                (item) => item.name === state.items[itemIndex].iconName
            )
            if (oldIconIndex >= 0)
                state.companyIcons[oldIconIndex].isUsed = false

            const newIconIndex = state.companyIcons.findIndex(
                (item) => item.name === action.payload.iconName
            )
            if (newIconIndex >= 0)
                state.companyIcons[newIconIndex].isUsed = true

            state.items[itemIndex].iconName = action.payload.iconName
        },

        toggleBlockItem: (
            state,
            action: PayloadAction<{ staticId: string; value: boolean }>
        ) => {
            const index = state.items.findIndex(
                (item) => item.staticId === action.payload.staticId
            )
            state.items[index].isBlocked = !action.payload.value
        },
        toggleOpacityItem: (
            state,
            action: PayloadAction<{ staticId: string; value: boolean }>
        ) => {
            const index = state.items.findIndex(
                (item) => item.staticId === action.payload.staticId
            )
            state.items[index].isOpacity = action.payload.value
        },

        toggleSelectItem: (
            state,
            action: PayloadAction<{ staticId: string }>
        ) => {
            const indexOfExisting = state.selectedItemsId.indexOf(
                action.payload.staticId
            )
            if (indexOfExisting >= 0) {
                state.selectedItemsId.splice(indexOfExisting, 1)
            } else {
                state.selectedItemsId.push(action.payload.staticId)
            }
        },

        selectAll: (state, action: PayloadAction<void>) => {
            const allStaticId = state.items.map((item) => item.staticId)

            state.selectedItemsId = allStaticId
        },

        cancelSelection: (state, action: PayloadAction<void>) => {
            state.selectedItemsId = []
        },
    },
})

export const {
    addItem,
    deleteItem,
    selectAll,
    toggleSelectItem,
    toggleBlockItem,
    toggleOpacityItem,
    changeCompanyIcon,
    onChangeRowValue,
    cancelSelection,
} = itemsSlice.actions

export default itemsSlice.reducer
