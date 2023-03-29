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

export interface State {
  pendingItems: Item[]
  approvedItems: Item[]
  areAllItemsSelected: boolean
}

const initialState: State = {
  pendingItems: mockData,
  approvedItems: [],
  areAllItemsSelected: false
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
      state.pendingItems.splice(action.payload, 1)
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
    }
  }
})

export const {
  selectItem,
  selectAllItems,
  deselectAllItems,
  discardItem,
  approveItems
} = itemsSlice.actions

export default itemsSlice.reducer
