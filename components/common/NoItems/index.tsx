import { StyleSheet, Text, View } from 'react-native'

type NoItemsProps = {
  text: string
}

const NoItems = ({ text }: NoItemsProps) => (
  <View style={styles.container}>
    <Text>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default NoItems
