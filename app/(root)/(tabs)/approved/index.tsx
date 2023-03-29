import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native'

import ListItem from '~/components/approved/ListItem'
import NoItems from '~/components/common/NoItems'
import { useTypedSelector } from '~/data/hooks'

const Approved = () => {
  const approvedItems = useTypedSelector(state => state.approvedItems)
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={approvedItems}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={() => (
          <Text style={styles.header}>My stuff</Text>
        )}
        contentContainerStyle={{ flex: 1 }}
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
    marginTop: StatusBar.currentHeight ?? 0,
    backgroundColor: '#eee'
  },
  list: {
    paddingTop: 12
  }
})

export default Approved
