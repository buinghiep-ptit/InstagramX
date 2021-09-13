import {auth} from '../config';

export const SignUpUser=(email: string, password: string) => {
    return new Promise((resolve, reject) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(snapshot =>{
                resolve('Sign up successfully')
            })
            .catch( error => {
                reject(error);
            })
    });
}