import { useRouter } from 'expo-router'
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { useTypedDispatch, useTypedSelector } from '~/data/hooks'
import { approveItems } from '~/data/local/items'
import commonStyles from '~/styles/common'

const Approve = () => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const selectedItems = useTypedSelector(state =>
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
              text: 'OK'
            },
            {
              text: 'See my stuff',
              onPress: () => router.push('/approved')
            }
          ])
        }}
      >
        <Text
          style={
            isDisabled
              ? commonStyles.textDisabled
              : commonStyles.textActive
          }
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
  }
})

export default Approve
