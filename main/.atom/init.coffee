atom.workspace.observeTextEditors (editor) ->
  editorComponent = atom.views.getView(editor).component
  {scrollViewNode} = editorComponent
  scrollViewNode.removeEventListener 'mousedown', editorComponent.onMouseDown
  scrollViewNode.addEventListener 'mousedown', (event) ->
    return if event.button is 1
    editorComponent.onMouseDown event
