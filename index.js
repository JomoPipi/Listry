'use strict'
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
function showItem(item,id) {
    const listContainer = D('list-container')
    const itemDiv = document.createElement('div')
    itemDiv.onmouseover = _ => itemDiv.className = 'table-dark';
    (itemDiv.onmouseout = _ => itemDiv.className = 'table-' + (id % 2 === 0 ? 'primary' : 'secondary'))()
    itemDiv.style.borderRadius = '2px'
    itemDiv.style.width = '100%'
    itemDiv.style.fontSize = '40px'
    itemDiv.id = id
    itemDiv.dataset.title = item.title
    itemDiv.innerHTML = (id+1) + '. ' + item.title
    itemDiv.ondragenter = function(e) {
        // console.log('e =',e)
        // console.log('toElem =',e.toElement)
        // console.log('target =',e.target)
        // console.log('srcElem =',e.srcElement)
        this.style.borderBottom = '2px solid green'
    }
    itemDiv.ondragleave = function() {
        this.style.border = ''
    }
    itemDiv.ondragend = function(e) {
        const [y,x] = [e.clientY,e.clientX]
        const arr = [...listContainer.children]
        const indexDraggedInto = 
            (arr.find(itm =>
                getOffset(itm).top + this.scrollHeight > y
            ) 
            || arr[arr.length-1]).id

        const children = [...listContainer.children]
        listContainer.innerHTML = ''
        list.items.length = 0
        const elem = children.splice(id, 1)[0]
        children.splice(indexDraggedInto, 0, elem)
        children.forEach(c => createItem(c.dataset.title))
    }
    itemDiv.draggable = true
    itemDiv.onclick = _ => { 
        const i = list.items.indexOf(item)
        User.path.push(i)
        list = list.items[i]
        loadList()
        User.save()
    }
    listContainer.appendChild(itemDiv)
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












function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
var x = getOffset( document.getElementById('yourElId') ).left;