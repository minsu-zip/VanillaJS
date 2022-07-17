const API_END_POINT =
  'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword='

export const request = async (url, option) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, option)

    if (!res.ok) {
      throw new Error('API 호출 실패')
    }

    return await res.json()
  } catch (error) {
    console.log(error)
  }
}
