import get from 'lodash/get'
import en, { BaseLanguage } from './languages/en'
import zhCN from './languages/zh-CN'

const languages = {
  en: en,
  'zh-CN': zhCN
}

type Flat<T extends Record<string, any>, P extends string = ''> =(
  {
    [K in keyof T as (
      T[K] extends string
      ? (K extends string ? (P extends '' ? K : `${P}.${K}`) : never)
      : (K extends string ? keyof Flat<T[K], P extends '' ? K : `${P}.${K}`> : never)
    )]: never
  }
)

export type Language = keyof typeof languages
export type MsgPath = keyof Flat<BaseLanguage>

export function translate (lang: Language, path: MsgPath, ...args: string[]) {
  const language = languages[lang] || en

  const text: string = get(language, path, get(en, path, ''))
  if (args.length < 1) {
    return text
  }

  let idx = -1
  return text.replace(/%s/g, () => {
    idx++
    return args[idx] || ''
  })
}
