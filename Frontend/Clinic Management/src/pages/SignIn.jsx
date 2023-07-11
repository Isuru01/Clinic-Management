import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential != null) {
          const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
          console.log(USER_CREDENTIAL);
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default SignIn;
