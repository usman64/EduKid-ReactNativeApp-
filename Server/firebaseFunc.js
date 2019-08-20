import Firebase from './firebase'

export const Login = async(email, password) => {
    try {
        response = await Firebase.auth().signInWithEmailAndPassword(email,password)
        return response.user
    }

    catch(err) {
        console.log(err)
    }
}   

export const SignUp = async(email, password, name) => {
    try{
        const response= await Firebase.auth().createUserWithEmailAndPassword(email,password)
        if(response) {
            Firebase.database().ref('users/' + response.user.uid).set({
                email:email,
                name:name
            })
        }
    }
    
    catch(err) {
        return err;
    }
}

export const ChangePass = async(password) => {
    try {
        await Firebase.auth().currentUser.updatePassword(password)
    }

    catch(err) {
        console.log(err)
    }
}

export const Logout = async() => {
    try {
        await Firebase.auth().signOut()
    }
    
    catch(err) {
        console.log(err)
    }
    
}

export const ForgotPassword = async(email) => {
    try {
        await Firebase.auth().sendPasswordResetEmail(email)
        return 1
    }

    catch(err) {
        console.log(err)
        return 0
    }
}

export const StorePoints = async(points, game) => {
    try {
        const user= await Firebase.auth().currentUser()
        if(user) {
            Firebase.database().ref('users/' + user.uid).set({
                
            })
        }
    }

    catch(err) {
        console.log(err)
    }
    // var uidRef = key.child(user).push().key
    //Save the points to users/user.uid/game
}

export const HighScore = game => {
    var key = firebase.database().ref()
    const arranged = key.child('users').orderByChild('points').limitToFirst(5)
    return arranged
    //extract top 5 users with high scores of that game and return array of users and 
    //scores in descending order
}