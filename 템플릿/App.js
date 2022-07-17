import { request } from './api.js'

export default function App({ $target }) {
  // App state
  this.state = {
    data: [],
  }

  // 하위 컴포넌트 생성 로직
  // const serve = new Serve({
  //   $target,
  //   // paths: this.state.paths, // 초기값이 필요한 경우만
  //   onClick: () => {}, // 함수
  // })

  // App 컴포넌트 state 변경
  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }

    // 하위 컴포넌트 변경

    // serve.setState({
    //   data: this.state.nodeData,
    //   paths: this.state.paths,
    // })
  }

  // 데이터 불러오기
  const getData = async () => {
    // const todos = await request('')
    // this.setState({
    //   data: todos,
    // })
  }

  getData()
}
