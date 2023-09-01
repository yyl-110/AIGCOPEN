import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state() {
    return {
      setting: {
        temperature: 0.7,
        topP: 1,
        maxTokens: 4096,
        frequencyPenalty: 0,
        presencePenalty: 0,
        model: 'gpt-3.5-turbo',
      },
    }
  },
  actions: {
    setChatConfig(val) {
      this.setting = { ...val }
    },
  },
})
