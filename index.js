var assert = require('assert')

module.exports = redirect

// Redirect a view to another view
// (str, str) -> HTMLNode
function redirect (url, rootSelector) {
  rootSelector = rootSelector || 'body'

  assert.equal(typeof url, 'string')
  assert.equal(typeof rootSelector, 'string')

  return function redirectView (state, prev, send) {
    send('location:set', url)

    // return the exact same tree that's being rendered right now so nothing is
    // changed :tada:
    var tree = document.querySelector(rootSelector)
    var node = document.createElement('div')
    node.isSameNode = function (el) {
      return el === tree
    }
    return node
  }
}
