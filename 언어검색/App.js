import { request } from './api.js'
import { getItem, setItem } from './storage.js'
import debounce from './debounce.js'
import Suggestion from './Suggestion.js'
import SearchInput from './SearchInput.js'
import SelectedLanguage from './SelectedLanguage.js'

export default function App({ $target }) {
  // App state
  this.state = {
    inputValue: '',
    suggestionList: [],
    seletedList: [],
  }

  // 세션 스토리지
  this.cache = getItem('keywords_cache', {})

  const selectedLanguage = new SelectedLanguage({
    $target,
  })

  const searchInput = new SearchInput({
    $target,
    onKeyPress: debounce((value) => {
      if (value.length > 0) {
        // 세션 스토리지에 있는 경우
        if (this.cache[value]) {
          this.setState({
            inputValue: value,
            suggestionList: this.cache[value],
          })
        }
        // 세션 스토리지에 없는 경우
        else {
          this.setState({
            inputValue: value,
          })
          getApi(value)
        }
      } else {
        this.setState({
          inputValue: '',
          suggestionList: [],
        })
      }
    }, 500),
  })

  const suggestion = new Suggestion({
    $target,
    onEnter: (value) => {
      const nextList = [...this.state.seletedList]
      const index = nextList.indexOf(value)
      // 있는 경우
      if (index !== -1) {
        nextList.splice(index, 1)
      }
      // 없는 경우
      else {
        if (nextList.length >= 5) nextList.shift()
      }
      nextList.push(value)
      this.setUpdate(nextList)
    },
  })

  // Suggestion 커서 위치 초기화 회피 setState
  this.setUpdate = (nextList) => {
    ;(this.state = {
      ...this.state,
      seletedList: nextList,
    }),
      selectedLanguage.setState({
        data: this.state.seletedList,
      })
  }

  // App 컴포넌트 state 변경
  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    suggestion.setState({
      data: this.state.suggestionList,
      inputValue: this.state.inputValue,
      selectedNumber: 0,
    })
    selectedLanguage.setState({
      data: this.state.seletedList,
    })
  }

  // 데이터 불러오기
  const getApi = async (keyword) => {
    const data = await request(keyword)
    this.setState({
      suggestionList: data,
    })

    // 세션 스토리지에 값 저장
    this.cache[keyword] = data
    setItem('keywords_cache', this.cache)
  }
}
