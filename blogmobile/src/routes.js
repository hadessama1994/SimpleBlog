import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Post from './pages/Post'

const Routes = createAppContainer(
    createSwitchNavigator({
        Post,
        Dashboard,
        Login        
        
    })
)

export default Routes;