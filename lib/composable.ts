import { cdnImageInjectionKey } from './injectionKey'
import { inject } from 'vue'

export const useCdnImage = () => {
  const cdnImageInjection = inject(cdnImageInjectionKey)

  if (cdnImageInjection === undefined) {
    throw new Error('Cdn image injection was not provided')
  }

  return cdnImageInjection
}
