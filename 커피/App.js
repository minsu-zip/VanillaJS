import { request } from './api.js'
import ProductListPage from './ProductListPage.js'
import ProductDetailPage from './ProductDetailPage.js'

export default function App({ $target }) {
  // App state
  this.state = {
    productList: [],
    productId: {},
  }

  // 하위 컴포넌트 생성 로직
  const productListPage = new ProductListPage({
    $target,
    onClick: async (productId) => {
      const data = await request(`/${productId}`)
      this.setState({
        productId: data,
      })
    },
  })

  const productDetailPage = new ProductDetailPage({
    $target,
  })

  // App 컴포넌트 state 변경
  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    productListPage.setState({
      productList: this.state.productList,
    })
    productDetailPage.setState({
      productId: this.state.productId,
      selectedOptions: [],
    })
  }

  // 데이터 불러오기
  const getData = async () => {
    const data = await request('')
    this.setState({
      productList: data,
    })
  }

  getData()
}
