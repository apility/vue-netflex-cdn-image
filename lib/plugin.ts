import { App } from 'vue'
import { CdnImageOptions } from './types'
import { netflexCdnUrlPlugin } from '@apility/vue-netflex-cdn-url'
import { breakpointsPlugin } from '@apility/vue-breakpoints-plugin'
import { cdnImageInjectionKey } from './injectionKey'

export const netflexCdnImagePlugin = (
  app: App,
  { cdnUrl, breakpoints, pixelDensities = ['1x', '2x', '3x'], compressor }: CdnImageOptions,
) => {
  app.use(netflexCdnUrlPlugin, { cdnUrl })
  app.use(breakpointsPlugin, { breakpoints })

  app.provide(cdnImageInjectionKey, { cdnUrl, breakpoints, pixelDensities, compressor })
}
