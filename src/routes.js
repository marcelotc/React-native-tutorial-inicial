import { createAppContainer, createStackNavigator } from 'react-navigation'

import Main from './pages/Main'
import User from './pages/User'

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User
    }, {
            headerLayoutPreset: 'center',
            headerBackTitleVisible: false,
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#2e9ec7'
                },
                headerTintColor: '#fff'
            }
        })
)

export default Routes    