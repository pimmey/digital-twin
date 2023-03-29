import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import NoItems from '~/components/common/NoItems'
import ListItem from '~/components/pending/ListItem'
import { discardItem, selectItem } from '~/data/local/items'
import { RootState } from '~/data/store'

export default function Index() {
  const items = useSelector((state: RootState) => state.pendingItems)
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            onDismiss={() => dispatch(discardItem(index))}
            onSelect={() => dispatch(selectItem(index))}
          />
        )}
        ListEmptyComponent={() => (
          <NoItems text="No pending items, you're all set 😊" />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eee'
  },
  list: {
    paddingTop: 12
  }
})
