import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { StatusBar } from 'react-native';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: () => (<IconButton onPress={authCtx.logout}>Log Out 🚪</IconButton>)
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);


  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack/>}
    </NavigationContainer>
  );
}

function Root() {

  const authCtx = useContext(AuthContext);

  useEffect(()=>{

    async function fechToken() {

      const storedToken = await AsyncStorage.getItem('token');

      if(storedToken) {
        authCtx.authentificate(storedToken)
      }
    }
    fechToken();
    
  },[])

  return <Navigation/>
}

export default function App() {
  

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}
