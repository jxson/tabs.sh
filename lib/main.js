const document = require('global/document')
const domready = require('domready')
const h = require('mercury').h
const hg = require('mercury')

domready(function ondomready() {
  let state = hg.state({ tabs: hg.varhash({}) })

  hg.app(document.body, state, render)

  chrome.tabs.query({}, function(tabs) {
    let length = tabs.length
    for (var i = 0; i < length; i++) {
      let tab = tabs[i]
      state.tabs.put(tab.id, tab)
    }
  })
})

function render(state) {
  return h('div.tabs', [
    h('h1.title', 'TABS'),
    h('div.collection', toArray(state.tabs).map(renderTab))
  ])
}

function renderTab(tab) {
  return h('div.tab', [
    h('.title', tab.title)
  ])
}

function toArray(object) {
  var keys = Object.keys(object);
  var array = keys.map(toItem);

  return array;

  function toItem(key, index) {
    return object[key];
  }
}
