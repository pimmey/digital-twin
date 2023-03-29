import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { deselectAllItems, selectAllItems } from '~/data/local/items'
import { RootState } from '~/data/store'

const SelectAll = () => {
  const dispatch = useDispatch()
  const areAllItemsSelected = useSelector(
    (state: RootState) => state.areAllItemsSelected
  )

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          dispatch(
            (areAllItemsSelected
              ? deselectAllItems
              : selectAllItems)()
          )
        }
      >
        <Text>{areAllItemsSelected ? 'Deselect' : 'Select'} all</Text>
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
