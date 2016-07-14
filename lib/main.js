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
  return h('div.tabs', {
    style: {
      padding: '1.125em'
    }
  }, [
    h('h1.title', {
      style: {
        'margin-bottom': '1.125em'
      }
    }, 'TABS'),
    h('div.collection', toArray(state.tabs).map(renderTab))
  ])
}

function renderTab(tab) {
  return h('div.tab', [
    h('a.title', {
      style: {
        display: 'block',
        border: '1px solid black',
        margin: '1.125em',
        padding: '1.125em'
      },
      href: tab.url
    }, tab.title)
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
