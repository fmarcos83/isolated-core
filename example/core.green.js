import { coreInit, currentScript } from 'isolated-core'

coreInit({
  scripts: [currentScript.src],
  run: core => {
    const React = require('react')
    const DemoUI = require('./DemoUI').default

    // Monkeypatch in some extra render nodes.
    const origRender = DemoUI.prototype.render
    DemoUI.prototype.render = function render() {
      return (
        <div>
          {origRender.apply(this)}
          <style>{'body { background: lightgreen }'}</style>
        </div>
      )
    }

    require('./').init(core)
  },
})
