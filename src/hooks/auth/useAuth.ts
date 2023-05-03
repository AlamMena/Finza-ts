import { auth } from "@/auth/firebaseApp";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

interface LoginResponse {
    userCredential?: UserCredential,
    isError: boolean,
    message: string
}
export default function useAuth() {

    const signInAsync = async (email: string, password: string): Promise<LoginResponse> => {
        let response: LoginResponse = { isError: false, message: 'success' };
        try {
            response.userCredential = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            const fbError = error as FirebaseError;
            response.isError = true;
            console.log(fbError)
            // handling error message from firebase
            response.message =
                fbError.code === 'auth/invalid-email' ? 'Invalid email'
                    : fbError.code === 'auth/invalid-password' ? 'Invalid password'
                        : fbError.code === 'auth/user-not-found' ? 'User not found'
                            : fbError.code === 'auth/wrong-password' ? 'Wrong password'
                                : "An error has ocurred";
        }
        return response;

    }


    const signUpAsync = async (email: string, password: string): Promise<LoginResponse> => {
        let response: LoginResponse = { isError: false, message: 'success' };
        try {
            response.userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return response;
        } catch (error) {
            const fbError = error as FirebaseError;
            response.isError = true;
            console.log(fbError)
            // handling error message from firebase
            response.message =
                fbError.code === 'auth/invalid-email' ? 'Invalid email'
                    : fbError.code === 'auth/invalid-password' ? 'Invalid password'
                        : "An error has ocurred";
        }
        return response;
    }
    return { signInAsync, signUpAsync };

}