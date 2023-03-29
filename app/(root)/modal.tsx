import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { useTypedSelector } from '~/data/hooks'
import { IMAGE_MAP } from '~/utils/image-map'

const Modal = () => {
  const pickedItem = useTypedSelector(
    state => state.pickedItemForModal
  )

  if (pickedItem === null) {
    return null
  }

  const { id, brand, name, price, description } = pickedItem

  return (
    <View style={styles.container}>
      <Image source={IMAGE_MAP[id]} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>kr {price}</Text>
        <Text>{description}</Text>
      </View>
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
    </View>
  )
}

const IMAGE_SIZE = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: 16
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  name: {
    fontSize: 36,
    marginBottom: 8
  },
  brand: {
    textTransform: 'uppercase'
  },
  price: {
    marginBottom: 16,
    color: 'gray'
  }
})

export default Modal
