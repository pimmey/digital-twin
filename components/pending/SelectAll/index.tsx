import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { useTypedDispatch, useTypedSelector } from '~/data/hooks'
import { deselectAllItems, selectAllItems } from '~/data/local/items'
import { RootState } from '~/data/store'
import commonStyles from '~/styles/common'

const SelectAll = () => {
  const dispatch = useTypedDispatch()
  const areAllItemsSelected = useTypedSelector(
    state => state.areAllItemsSelected
  )
  const pendingItems = useSelector(
    (state: RootState) => state.pendingItems
  )
  const isDisabled = pendingItems.length === 0

  return (
    <View style={styles.container}>
      <Pressable
        disabled={isDisabled}
        onPress={() =>
          dispatch(
            (areAllItemsSelected
              ? deselectAllItems
              : selectAllItems)()
          )
        }
      >
        <Text
          style={
            isDisabled
              ? commonStyles.textDisabled
              : commonStyles.textActive
          }
        >
          {areAllItemsSelected ? 'Deselect' : 'Select'} all
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16
  }
})

export default SelectAll
