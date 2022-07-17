export default function Breadcrumb({ $target, paths, onClick }) {
  const $nav = document.createElement('nav')
  $nav.className = 'Breadcrumb'
  $target.appendChild($nav)

  this.state = paths

  this.setState = (next) => {
    this.state = next
    this.render()
  }

  this.render = () => {
    $nav.innerHTML = `
              ${this.state
                .map(
                  (data) => `<div class="item" id=${data.id}>${data.name}</div>`
                )
                .join('')}
          `
  }

  $nav.addEventListener('click', (e) => {
    const $breadcrumbItem = e.target.closest('.item')
    const { id } = $breadcrumbItem

    if (id) {
      onClick(id)
    }
  })

  this.render()
}
