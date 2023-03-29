import { SplashScreen, Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '~/data/store'

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<SplashScreen />}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal'
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  )
}

export default RootLayout
