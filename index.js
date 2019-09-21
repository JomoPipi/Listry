// const fs = require('fs')
const f = x => (console.log(x),x)
//try{
// const data = {items:[],title:'List'}//JSON.parse(fs.readFileSync('User.data.json', 'utf8'))
// const User.path = []//JSON.parse(fs.readFileSync('User.path.json', 'utf8'))
// } catch (e) {
//     fs.appendFileSync('User.data.json')
//     fs.appendFileSync('User.path.json')
//     var User.data = Item('TODO')
//     var User.path = '[]'
// }
let list, editMode = false
function populateList() {
    list = User.data
    User.path.forEach(x => list = list.items[x])
    loadList()
}

D('prev-entry').onclick = _ => {
    if (editMode) leaveEditMode()
    User.path.pop()
    list = User.data
    User.path.forEach(x => list = list.items[x])
    loadList()
    // fs.writeFileSync('User.path.json', JSON.stringify(User.path))
}
D('delete-entry').onclick = _ => { 
    if (editMode) leaveEditMode()
    if (!User.path.length) return alert('cannot delete this!')
    if (!confirm('are you sure you want to do this?')) return;
    const todelete = list
    D('prev-entry').onclick()
    list.items.splice(list.items.findIndex(x=>x===todelete),1)
    User.save()
    loadList()
}
D('edit-entry').onclick = _ => { 
    // window.open('edititem.html','edit','width=200,height=140')
    if (editMode) leaveEditMode(); else {
        var e = D('main-text')
        var d = document.createElement('input');
        d.style.width = '100%'
        d.type = 'text'
        d.value = e.innerHTML;
        d.id = e.id;
        e.parentNode.replaceChild(d, e);
        editMode = true
    }
    User.save()
}

function loadList() {
    const listContainer = D('list-container')
    D('prev-entry').style.display = list === User.data ? 'none' : 'inline'
    D('main-text').innerHTML = list.title
    while (listContainer.children[0]) listContainer.removeChild(listContainer.children[0])
    list.items.forEach(showItem)
}

function createItem(entry) {
    const item = Item(entry)
    showItem(item,list.items.length)
    list.items.push(item)
    User.save()
}
function showItem(item,x) {
    const listContainer = D('list-container')
    const html = document.createElement('div')
    html.onmouseover = _ => html.className = 'table-dark';
    (html.onmouseout = _ => html.className = 'table-' + (x % 2 === 0 ? 'primary' : 'secondary'))()
    html.style.borderRadius = '2px'
    html.style.width = '100%'
    html.style.font = '30px Arial black'
    html.innerHTML = (x+1) + '. ' + item.title
    html.onclick = _ => { 
        const i = list.items.indexOf(item)
        User.path.push(i)
        list = list.items[i]
        loadList()
        User.save()
    }
    listContainer.appendChild(html)
}

D('entry').oninput = function() {
    D('add').style.display = this.value === '' ? 'none' : 'block'
}
function leaveEditMode() {
    var d = document.getElementById('main-text');
    var e = document.createElement('h1');
    e.style.width = '100%'
    e.type = 'text'
    list.title = e.innerHTML = d.value;
    e.id = d.id;
    d.parentNode.replaceChild(e, d);
    editMode = false
}
D('add').onmousedown = document.onkeypress = function(e) {
    if (e.keyCode && e.keyCode === 13 && editMode) {
        leaveEditMode()
        return
    }

    const entry = D('entry')
    if ((e.keyCode && e.keyCode !== 13) || !entry.value || !entry.value.trim()) return;

    createItem(entry.value)
    entry.value = ''
}

function Item(text) {
    return {
        title: text,
        items: []
    }
}