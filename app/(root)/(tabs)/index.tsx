import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import NoItems from '~/components/common/NoItems'
import ListItem from '~/components/pending/ListItem'
import { useTypedDispatch, useTypedSelector } from '~/data/hooks'
import { discardItem, selectItem } from '~/data/local/items'

const Index = () => {
  const items = useTypedSelector(state => state.pendingItems)
  const dispatch = useTypedDispatch()

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
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <NoItems text="No pending items, you're all set 🎉" />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
    backgroundColor: '#eee'
  },
  list: {
    paddingTop: 12
  }
})

export default Index
