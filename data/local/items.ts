import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import mockData from '../mock.json'

export type Item = {
  id: string
  name: string
  brand: string
  price: number
  description: string
  image_url: string
  status: string
  isSelected?: boolean
  isApproved?: boolean
}

export type State = {
  pendingItems: Item[]
  approvedItems: Item[]
  areAllItemsSelected: boolean
  pickedItemForModal: Item | null
}

const initialState: State = {
  pendingItems: mockData,
  approvedItems: [],
  areAllItemsSelected: false,
  pickedItemForModal: null
}

export const itemsSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<number>) => {
      const index = action.payload
      const item = state.pendingItems[index]
      item.isSelected = !item.isSelected
      state.areAllItemsSelected = !state.pendingItems.some(
        item => !item.isSelected
      )
    },
    selectAllItems: state => {
      state.pendingItems.map(item => (item.isSelected = true))
      state.areAllItemsSelected = true
    },
    deselectAllItems: state => {
      state.pendingItems.map(item => (item.isSelected = false))
      state.areAllItemsSelected = false
    },
    discardItem: (state, action: PayloadAction<number>) => {
      const index = action.payload
      state.pendingItems.splice(index, 1)
    },
    approveItems: (state, action: PayloadAction<Item[]>) => {
      const items = action.payload
      items.forEach(item => {
        state.approvedItems.push(item)
        const index = state.pendingItems.findIndex(
          _item => _item.id === item.id
        )
        state.pendingItems.splice(index, 1)
      })
    },
    pickItemForModal: (state, action: PayloadAction<Item>) => {
      state.pickedItemForModal = action.payload
    }
  }
})

export const {
  selectItem,
  selectAllItems,
  deselectAllItems,
  discardItem,
  approveItems,
  pickItemForModal
} = itemsSlice.actions

export default itemsSlice.reducer
