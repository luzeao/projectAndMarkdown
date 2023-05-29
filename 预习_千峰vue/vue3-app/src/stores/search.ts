import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearch = defineStore('search', () => {

  const wordsList = ref<string[]>([])

  // 每次搜索添加关键词 => 不存在就新增 存在就略过
  const addWord = (word: string) => {
    if (!wordsList.value.includes(word) && word != '' && word != undefined) {
      wordsList.value.push(word)
    }
  }

  // 删除关键词 [华为,一加,苹果]
  const delWord = (word: string) => {
    const index = wordsList.value.findIndex(v => v == word)
    wordsList.value.splice(index, 1)
  }

  // 清空关键词
  const clear = () => {
    wordsList.value = []
  }

  return { wordsList, addWord, delWord, clear }

}, {
  persist: true
})
