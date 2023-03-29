import { useRouter } from 'expo-router'
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { approveItems } from '~/data/local/items'
import { RootState } from '~/data/store'

const Approve = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const selectedItems = useSelector((state: RootState) =>
    state.pendingItems.filter(item => item.isSelected)
  )
  const isDisabled = selectedItems.length === 0

  return (
    <View style={styles.container}>
      <Pressable
        disabled={isDisabled}
        onPress={() => {
          dispatch(approveItems(selectedItems))
          Alert.alert('Items approved!', '', [
            {
              text: 'See my stuff',
              onPress: () => router.push('/approved'),
              style: 'cancel'
            },
            {
              text: 'OK'
            }
          ])
        }}
      >
        <Text
          style={isDisabled ? styles.textDisabled : styles.textActive}
        >
          Approve
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 16
  },
  textActive: {
    color: 'black'
  },
  textDisabled: {
    color: 'lightgray'
  }
})

export default Approve
