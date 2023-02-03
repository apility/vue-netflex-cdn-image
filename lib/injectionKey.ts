import { InjectionKey } from 'vue'
import { CdnImageInjection } from './types'

export const cdnImageInjectionKey: InjectionKey<CdnImageInjection> = Symbol('cdnImageInjection')
