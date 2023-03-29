import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRef } from 'react'
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler
} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import { Item } from '~/data/local/items'
import { IMAGE_MAP } from '~/utils/image-map'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.5
const ITEM_SIZE = 80
const ITEM_VERTICAL_MARGIN = 4
const DISCARD_BUTTON_WIDTH = 100
const MARGIN = 8
const DISCARD_BUTTON_WITH_MARGIN = DISCARD_BUTTON_WIDTH + MARGIN

type ListItemProps = {
  item: Item
  onDismiss: () => void
  onSelect: () => void
}

const ListItem = ({ item, onDismiss, onSelect }: ListItemProps) => {
  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(ITEM_SIZE)
  const opacity = useSharedValue(1)
  const marginVertical = useSharedValue(ITEM_VERTICAL_MARGIN)
  const offset = useSharedValue(0)
  const zIndex = useSharedValue(-1)

  const dismiss = () => {
    translateX.value = withTiming(-SCREEN_WIDTH)
    itemHeight.value = withTiming(0)
    marginVertical.value = withTiming(0)
    opacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        runOnJS(onDismiss)()
      }
    })
  }

  const panGesture =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: e => {
        translateX.value = e.translationX + offset.value
        zIndex.value = -1
      },
      onEnd: () => {
        const shouldBeDismissed =
          translateX.value < TRANSLATE_X_THRESHOLD

        const shouldSnap =
          translateX.value > TRANSLATE_X_THRESHOLD &&
          translateX.value < -DISCARD_BUTTON_WIDTH * 0.5

        switch (true) {
          case shouldSnap:
            translateX.value = withTiming(
              -DISCARD_BUTTON_WITH_MARGIN,
              undefined,
              isFinished => {
                if (isFinished) {
                  zIndex.value = 1
                }
              }
            )
            offset.value = -DISCARD_BUTTON_WITH_MARGIN
            break
          case shouldBeDismissed:
            runOnJS(dismiss)()
            break
          default:
            translateX.value = withTiming(0)
            offset.value = 0
        }
      }
    })

  const animatedItemContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value
      }
    ]
  }))

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    const width =
      translateX.value + MARGIN > -(SCREEN_WIDTH - MARGIN * 2)
        ? -(translateX.value + MARGIN)
        : -(SCREEN_WIDTH + MARGIN * 2)
    return { width, height: itemHeight.value, zIndex: zIndex.value }
  })

  const animatedIconContainerContentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  const animatedOuterContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value
  }))

  const panRef = useRef(null)

  return (
    <>
      <Animated.View
        style={[styles.root, animatedOuterContainerStyle]}
      >
        <PanGestureHandler onGestureEvent={panGesture} ref={panRef}>
          <Animated.View>
            <TapGestureHandler
              onActivated={onSelect}
              waitFor={panRef}
            >
              <Animated.View
                style={[
                  styles.outerContainer,
                  animatedItemContainerStyle
                ]}
              >
                <MaterialIcons
                  name={
                    item.isSelected
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={24}
                  color="black"
                />
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
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <Animated.View
        style={[
          styles.deleteIconContainer,
          animatedIconContainerStyle
        ]}
      >
        <Pressable onPress={dismiss}>
          <Animated.View
            style={[
              styles.deleteContainerContent,
              animatedIconContainerContentStyle
            ]}
          >
            <MaterialIcons
              name="delete-forever"
              size={24}
              color="white"
            />
            <Text style={styles.deleteText}>Discard</Text>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    height: ITEM_SIZE,
    marginVertical: ITEM_VERTICAL_MARGIN,
    opacity: 1
  },
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 16
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 16,
    marginLeft: 16
  },
  imageContainer: {},
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE
  },
  textContainer: { flexShrink: 1 },
  deleteIconContainer: {
    position: 'absolute',
    zIndex: -1,
    top: 4,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: DISCARD_BUTTON_WIDTH,
    minWidth: DISCARD_BUTTON_WIDTH,
    height: ITEM_SIZE,
    paddingHorizontal: 8,
    backgroundColor: 'tomato',
    borderRadius: 16
  },
  deleteContainerContent: {
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteText: {
    color: 'white'
  }
})

export default ListItem
