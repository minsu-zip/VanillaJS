export const API_END_POINT =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      return await res.json()
    }

    throw new Error('API 처리중 오류 발생')
  } catch (error) {
    console.log(error)
  }
}
