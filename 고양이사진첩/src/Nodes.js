export default function Nodes({ $target, paths, onClick, onPrevClick }) {
  const $nodeList = document.createElement('div')
  $nodeList.className = 'Nodes'
  $target.appendChild($nodeList)

  this.state = {
    data: [],
    paths: paths,
  }

  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    this.render()
  }

  this.render = () => {
    $nodeList.innerHTML = `
              ${
                this.state.paths.length === 1
                  ? ''
                  : `<div class="Node">
              <img src="./assets/prev.png">
            </div>`
              }
              ${this.state.data
                .map(
                  (data) => `<div class="Node" id=${data.id}>                  
                  <img src="./assets/${
                    data.type === 'DIRECTORY' ? 'directory.png' : 'file.png'
                  }">
                  <div>${data.name}</div>
              </div>
            `
                )
                .join('')}
          `
  }

  $nodeList.addEventListener('click', (e) => {
    const $node = e.target.closest('.Node')
    const { id } = $node
    const node = this.state.data.find((data) => data.id === id)
    if (node) {
      onClick(node)
    } else {
      onPrevClick()
    }
  })

  this.render()
}
