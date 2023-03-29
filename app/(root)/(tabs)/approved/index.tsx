import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native'
import { useSelector } from 'react-redux'

import ListItem from '~/components/approved/ListItem'
import NoItems from '~/components/common/NoItems'
import { RootState } from '~/data/store'

export default function Approved() {
  const approvedItems = useSelector(
    (state: RootState) => state.approvedItems
  )
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={approvedItems}
        renderItem={({ item, index }) => <ListItem item={item} />}
        ListHeaderComponent={() => (
          <Text style={styles.header}>Your stuff</Text>
        )}
        ListEmptyComponent={() => (
          <NoItems text="Nothing approved yet, check out the pending items 🤙" />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    paddingHorizontal: 16,
    marginBottom: 16
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eee'
  },
  list: {
    paddingTop: 12
  }
})
