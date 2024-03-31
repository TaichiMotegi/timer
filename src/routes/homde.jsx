import { getAuth, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavButton } from "../components/navButton";

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div className="flex flex-col items-center justify-evenly font-bold h-screen">
        {user ? (
          <>
            <NavButton flag={true} />
            <div class="home-user-info">
              <UserInfo />
              <SignOutButton />
            </div>
          </>
        ) : (
          <>
            <NavButton flag={false} />
            <SighnInButton />
          </>
        )}
      </div>
    </div>
  );
}
export default Home;

function SighnInButton() {
  const sighInWithGoogel = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("signIn success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:${errorMessage}`);
      });
  };

  return (
    <div className="text-center">
      <button
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
        onClick={sighInWithGoogel}
      >
        <p>Googelでサインイン</p>
      </button>
    </div>
  );
}

function SignOutButton() {
  return (
    <div className="text-center">
      <button
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
        onClick={() => auth.signOut()}
      >
        <p>サインアウト</p>
      </button>
    </div>
  );
}

function UserInfo() {
  return (
    <div className="text-center mb-10">
      <img className="m-auto" src={auth.currentUser.photoURL} alt="" />
      <p>{auth.currentUser.displayName}</p>
    </div>
  );
}
