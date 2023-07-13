import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen({}) {
  
  const [isAuth, setIsAuth] = useState(false);

  const AuthCtx = useContext(AuthContext)

  async function loginHandler({ email, password }) {
      setIsAuth(true);
      try{
        const token = await login(email, password);
        AuthCtx.authentificate(token);
      } catch(error){
        Alert.alert('Failed','Check email and password');
        setIsAuth(false);
      }

  }

  if(isAuth) {
    return <LoadingOverlay message="It`s still login..."/>
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
