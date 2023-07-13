import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';



function SignupScreen() {

  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuth(true);

    try{
      const token = await createUser(email, password);
      authCtx.authentificate(token);
    } catch(error){
      Alert.alert('Failed','Check email and password')
      setIsAuth(false);
    }

  }

  if(isAuth) {
    return <LoadingOverlay message='Waiting... =)'/>
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
