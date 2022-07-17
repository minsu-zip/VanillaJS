import Breadcrumb from './Breadcrumb.js'
import Nodes from './Nodes.js'
import ImageView from './ImageView.js'
import IsLoading from './IsLoading.js'
import { request } from './api.js'

export default function App({ $target }) {
  this.state = {
    nodeData: [],
    nodId: null,
    paths: [{ name: 'root' }],
    isLoading: false,
  }

  const breadcrumb = new Breadcrumb({
    $target,
    paths: this.state.paths,
    onClick: async (id) => {
      if (id === 'undefined') {
        this.getDate()
        this.setState({
          paths: [{ name: 'root' }],
        })
      } else {
        if (id !== this.state.paths[this.state.paths.length - 1].id) {
          const nextPath = this.state.paths.findIndex((item) => item.id === id)

          this.setState({
            paths: this.state.paths.slice(0, nextPath + 1),
          })
          this.getDate(id)
        }
      }
    },
  })

  const nodes = new Nodes({
    $target,
    paths: this.state.paths,
    onClick: async (node) => {
      if (node.type === 'FILE') {
        imageView.setState(node.filePath)
      } else {
        this.setState({
          paths: [...this.state.paths, node],
        })
        await this.getDate(node.id)
      }
    },
    onPrevClick: async () => {
      const prevPaths = [...this.state.paths]
      prevPaths.pop()
      this.setState({
        paths: prevPaths,
      })

      if (prevPaths.length === 0) {
        await this.getDate()
      } else {
        await this.getDate(prevPaths[prevPaths.length - 1].id)
      }
    },
  })
  const imageView = new ImageView({ $target })
  const isLoading = new IsLoading({ $target })

  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    nodes.setState({
      data: this.state.nodeData,
      paths: this.state.paths,
    })
    breadcrumb.setState(this.state.paths)
    isLoading.setState(this.state.isLoading)
  }

  this.getDate = async (id) => {
    this.setState({
      isLoading: true,
    })

    const data = await request(id ? `/${id}` : '')

    this.setState({
      nodeData: data,
      nodId: id,
      paths: [...this.state.paths],
      isLoading: false,
    })
  }

  this.getDate(null)
}
