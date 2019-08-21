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

export const UpdateDatabaseWithScore = (user, game ,score) => {
    Firebase.database().ref('/users/'+`${user}`+'/'+`${game}`).push(score)
    let gameRef = Firebase.database().ref('/game/'+`${game}`).push()
    gameRef.set({
        user:user,
        score: score
    });

    return true
}

export const  LocalHighscore = (user,game)=> {
    console.log(user)    
    let scoreArray = []
    Firebase.database().ref('/users/'+`${user}`).child(`${game}`).orderByValue().limitToLast(5).once('value')
    .then(function(snapshot) {
        console.log(snapshot)
      snapshot.forEach(function(temp){
        // console.log(temp.val())
        scoreArray.push(temp.val())
      })
      let reversed = scoreArray.reverse()
      console.log(scoreArray)
      return scoreArray
    })
  }

export const GlobalHighscore= async(game)=> {
    let scoreArray = []
    let snapshot = await Firebase.database().ref('/game/'+`${game}`).orderByChild('score').limitToLast(5).once('value')
    console.log(snapshot)
    snapshot.forEach(temp => {
        scoreArray.push(temp.val())    
    })
    scoreArray.reverse()
    console.log(scoreArray);
    return scoreArray;
  }