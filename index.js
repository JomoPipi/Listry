// const fs = require('fs')
const D = x => document.getElementById(x)
const f = x => (console.log(x),x)
//try{
const data = {items:[],title:'List'}//JSON.parse(fs.readFileSync('data.json', 'utf8'))
const path = []//JSON.parse(fs.readFileSync('path.json', 'utf8'))
// } catch (e) {
//     fs.appendFileSync('data.json')
//     fs.appendFileSync('path.json')
//     var data = new Item('TODO')
//     var path = '[]'
// }
let list = data, editMode = false
path.forEach(x => list = list.items[x])

D('prev-entry').onclick = _ => {
    if (editMode) leaveEditMode()
    path.pop()
    list = data
    path.forEach(x => list = list.items[x])
    loadList()
    // fs.writeFileSync('path.json', JSON.stringify(path))
}
D('delete-entry').onclick = deleteEntry = _ => { 
    if (editMode) leaveEditMode()
    if (!path.length) return alert('cannot delete this!')
    if (!confirm('are you sure you want to do this?')) return;
    const todelete = list
    D('prev-entry').onclick()
    list.items.splice(list.items.findIndex(x=>x===todelete),1)
    rewrite()
    loadList()
}
D('edit-entry').onclick = _ => { 
    // window.open('edititem.html','edit','width=200,height=140')
    if (editMode) leaveEditMode(); else {
        var e = document.getElementsByTagName('h1')[0];
        var d = document.createElement('input');
        d.style.width = '100%'
        d.type = 'text'
        d.value = e.innerHTML;
        d.id = e.id;
        e.parentNode.replaceChild(d, e);
        editMode = true
    }
    rewrite()
}

function loadList() {
    const listContainer = D('list-container')
    D('prev-entry').style.display = list === data ? 'none' : 'inline'
    D('main-text').innerHTML = list.title
    while (listContainer.children[0]) listContainer.removeChild(listContainer.children[0])
    list.items.forEach(showItem)
}
loadList()
function createItem(entry) {
    const item = new Item(entry)
    showItem(item,list.items.length)
    list.items.push(item)
    rewrite()
}
function showItem(item,x) {
    const listContainer = D('list-container')
    const html = document.createElement('div')
    html.onmouseover = _ => html.className = 'table-dark';
    (html.onmouseout = _ => html.className = 'table-' + (x % 2 === 0 ? 'primary' : 'secondary'))()
    html.style.borderRadius = '2px'
    html.style.width = '100%'
    html.innerHTML = (x+1) + '. ' + item.title
    html.onclick = _ => { 
        const i = list.items.indexOf(item)
        path.push(i)
        list = list.items[i]
        loadList()
        // fs.writeFileSync('path.json', JSON.stringify(path))
    }
    listContainer.appendChild(html)
}

D('entry').oninput = function() {
    D('add').style.display = this.value === '' ? 'none' : 'block'
}
function leaveEditMode() {
    var d = document.getElementsByTagName('input')[0];
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
        console.log('here')
        leaveEditMode()
        return
    }

    const entry = D('entry')
    if ((e.keyCode && e.keyCode !== 13) || !entry.value.trim()) return;

    createItem(entry.value)
    entry.value = ''
}

function Item(text) {
    this.title = text
    this.items = []
}

function rewrite() {
    // fs.writeFileSync('data.json', JSON.stringify(data))
}