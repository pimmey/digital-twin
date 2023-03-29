import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Item } from '~/data/local/items'
import { IMAGE_MAP } from '~/utils/image-map'

const ITEM_HEIGHT = 80
const ITEM_VERTICAL_MARGIN = 4
const DISCARD_BUTTON_WIDTH = 100

type ListItemProps = {
  item: Item
}

const ListItem = ({ item }: ListItemProps) => {
  return (
    <Pressable onPress={() => {}}>
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
              <Text>{item.name}</Text>
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

const styles = StyleSheet.create({
  root: {
    height: ITEM_HEIGHT,
    marginVertical: ITEM_VERTICAL_MARGIN,
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
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    borderRadius: 8
  },
  textContainer: { flexShrink: 1 }
})

export default ListItem
