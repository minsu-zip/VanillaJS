export default function Serve({ $target }) {
  const $ = document.createElement('div')
  $.className = ''
  // $.setAttribute("droppable", "true");
  $target.appendChild($)

  this.state = {
    data: [],
  }

  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    this.render()
  }

  this.render = () => {
    $.innerHTML = ``
    // ${$.map((e)=> `<div id=${e.id} class="Node"></div>`).join("")}
  }

  // 클릭 이벤트
  // $.addEventListener('click', (e) => {

  //   if(event.target.className === '') 일떄만 동작

  //   이벤트가 발생한 지점에서 가장 가까운 li태그 html로 가져옴
  //   const $li = e.target.closest('li')
  //   li html의 id값을 가져옴
  //   const id2 = $li.dataset

  //   const $node = e.target.closest('.Node') // 이벤트가 발생한 .Node 클래스 Item의 HTML을 가져옴
  //   const { id } = $node //해당 HTML 노드의 id값 추출
  //   const node = this.state.data.find((data) => data.id === id) //원본 배열에서 찾은 id값에 해당하는 노드 찾기
  // })

  // 키보드 이벤트
  // window.addEventListener('keydown', (event) => {
  //   // if(event.target.className === '') 일떄만 동작

  //   const key = event.key // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

  //   switch (key) {
  //     case 'ArrowUp':
  //       break
  //     case 'ArrowDown':
  //       break
  //     case 'Enter':
  //     default:
  //       break
  //   }
  // })

  this.render()
}
