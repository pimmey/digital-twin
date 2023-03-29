import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useTypedDispatch } from '~/data/hooks'
import { Item, pickItemForModal } from '~/data/local/items'
import { IMAGE_MAP } from '~/utils/image-map'

type ListItemProps = {
  item: Item
}

const ListItem = ({ item }: ListItemProps) => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  return (
    <Pressable
      onPress={() => {
        dispatch(pickItemForModal(item))
        router.push('/modal')
      }}
    >
      <View style={styles.root}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={IMAGE_MAP[item.id]}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.brand}>{item.brand}</Text>
            </View>
          </View>
          <View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="black"
            />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const ITEM_SIZE = 80

const styles = StyleSheet.create({
  root: {
    height: ITEM_SIZE,
    marginVertical: 4,
    opacity: 1
  },
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderRadius: 16
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 16
  },
  imageContainer: {},
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 8
  },
  textContainer: { flexShrink: 1 },
  name: {
    marginBottom: 4,
    fontWeight: '500'
  },
  brand: {
    textTransform: 'uppercase'
  }
})

export default ListItem
