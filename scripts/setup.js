function D (x) { return document.getElementById(x) }
function E (x) { return document.createElement(x) }

const pages = [
  LIST,SIGNUP,LOGIN
] = 'list,signup,login'.split`,`.map(s => D(s + '-page'))

function gotoLIST(){ gotoPage(LIST) }
function gotoLOGIN(){ gotoPage(LOGIN) }
function gotoSIGNUP(){ gotoPage(SIGNUP) }

function gotoPage(page, options) {
  if (!page) return
  currentPage = page
  if (options) var { n, preventURL } = options
  pages.forEach(q => q.style.display = q === page ? 'block' : 'none')
  // if (!preventURL) {
  //   const url = page.id
  //   history.pushState({url,n}, url, url.split`-`[0] + (n == null ? '' : '?number=' + n))
  // }
}

// var currentProblemId, currentPage
const User = { reset: _ => (User.data=null,User.path=null,User.save=_=>_) }
//   loggedIn: false,
//   path:[],
//   data:{items:[],title:"List"},
//   // store: _ => localStorage.setItem('User',JSON.stringify([User.completions,User.submissions])),
//   save: _ => _,
//   reset: _ => (
//     // localStorage.clear(),
//     // User.path = [], 
//     // User.data = {},
//     // User.loggedIn = false,
//     User.save = _ => _
//   )
// }

// window.onload = e => {
//   e.preventDefault()
//   const s = localStorage.getItem('User')
//   if (s) {
//     try {
//       [User.completions,User.submissions] = JSON.parse(s)
//     } catch(e) { 
//       User.reset() // value was garbage and not JSON
//     }
//     colorAllButtons()
//   }
//   const x = location.pathname.slice(1) || 'home'
//   if (x === 'problem') 
//     gotoQuestion(location.search.slice(1).split`&`.find(s => s.startsWith('number')).split`=`[1])
//   else
//     gotoPage(D(x + '-page'))
//   return false
// }

// window.onpopstate = e => {
//   e.preventDefault()
//   if (e.state) { 
//     if (e.state.n) 
//       gotoQuestion(e.state.n, true)
//     else {
//       gotoPage(D(e.state.url), {preventURL: true})
//     }
//   }
//   return false
// }





// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAUwGE-nsj3EBj1ApIobgnMKSqW4brUNZA",
  authDomain: "listre-318b2.firebaseapp.com",
  databaseURL: "https://listre-318b2.firebaseio.com",
  projectId: "listre-318b2",
  storageBucket: "",
  messagingSenderId: "245334827282",
  appId: "1:245334827282:web:cbe2e7c92cce41420053cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Make auth and firestore references
const auth = firebase.auth()
const db = firebase.firestore()


// const pages = [
//     HOME,ABOUT,LOGIN,SIGNUP,PROBLEM
// ] = 'home,about,login,signup,problem'.split`,`.map(s => D(s + '-page'))


// PROBLEM.onkeydown = function(e) { e.ctrlKey && (e.keyCode === 13 || e.keyCode === 83) && runTests() }