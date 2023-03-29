import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import Approve from '~/components/pending/Approve'
import SelectAll from '~/components/pending/SelectAll'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pending',
          headerLeft: () => <SelectAll />,
          headerRight: () => <Approve />,
          tabBarIcon: () => (
            <MaterialIcons
              name="pending-actions"
              size={24}
              color="black"
            />
          )
        }}
      />
      <Tabs.Screen
        name="approved/index"
        options={{
          title: 'Approved',
          headerShown: false,
          tabBarIcon: () => (
            <MaterialIcons
              name="check-circle-outline"
              size={24}
              color="black"
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
