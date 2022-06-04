import { App } from 'vue'
import { CdnImageOptions } from './types'
import { netflexCdnUrlPlugin } from '@apility/vue-netflex-cdn-url'
import { breakpointsPlugin } from '@apility/vue-breakpoints-plugin'

export const netflexCdnImagePlugin = (
  app: App,
  { cdnUrl, breakpoints }: CdnImageOptions
) => {
  app.use(netflexCdnUrlPlugin, { cdnUrl })
  app.use(breakpointsPlugin, { breakpoints })
}
