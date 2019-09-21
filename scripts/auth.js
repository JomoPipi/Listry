// get data
// db.collection('users').get().then(snapshot => {
//     console.log(snapshot.docs)
// })








// listen for auth status changes
auth.onAuthStateChanged(user => {
    // const [login,signup] = ['login','signup'].map(x => D(x + '-page-button').style)
    // login.display = signup.display = user ? 'none' : 'block'
    // D('logout-form').style.display = user ? 'block' : 'none'

    if (user) { 
        console.log('logged in!')
        gotoPage(LIST)
        db.collection('users').doc(user.uid).get().then(async doc => {
            const d = await doc.data()
            User.save = async _ => {
                db.collection('users').doc(user.uid).set({
                    data: User.data,
                    path: User.path
                })
            }
            if (d && d.data) {
                User.data = d.data
                User.path = d.path
            } else {
                User.data = Item('List')
                User.path = []
            }
        }).then(_ => {
            // if (currentPage === SIGNUP) goHome()
            populateList()
            User.save()
        }).catch(e => console.log(e))
    } else {
        gotoPage(LOGIN)
    }
})








// create account
D('signup-form').onsubmit = function(e) {
    e.preventDefault()

    const message = msg => 
        D('signup-msg').innerHTML = '<span style="color:red;">' + msg + '</span>'

    const [email,pw,pw2] = ['email','pw','pw2'].map(x => this['signup-'+x].value)

    if (pw !== pw2) return message('The passwords don\'t match. Please try again.')

    auth.createUserWithEmailAndPassword(email, pw).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            data: Item('List'),
            path: []
        })
    }).then(_ => this.reset(), populateList()).catch(e => message(e))
}








// logout
D('logout').onclick = function(e) {
    e.preventDefault()
    User.loggedIn = false
    User.save().then(_=>{
        User.reset()
        gotoPage(LOGIN)
        auth.signOut()
    })
}








// login 
D('login-form').onsubmit = function(e) {
    e.preventDefault()

    const message = msg => 
        D('login-msg').innerHTML = '<span style="color:red;">' + msg + '</span>'

    const [email,pw] = ['email','pw'].map(x => this['login-'+x].value)

    auth.signInWithEmailAndPassword(email,pw).then(cred => 
        this.reset(), gotoPage(LIST) ).catch(e => message(e.message),  gotoPage(LOGIN))
}