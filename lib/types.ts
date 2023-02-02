import { CdnUrl, Mode, Size, Parameter, FilePath } from '@apility/netflex-cdn-url'
import type { Breakpoints } from '@apility/vue-breakpoints-plugin'

export interface CdnImageOptions {
  cdnUrl: CdnUrl,
  breakpoints: Breakpoints
}

export type PixelDensity = `${number}x`

export interface Breakpoint {
  path: FilePath,
  mode: Mode,
  size?: Size,
  parameter?: Parameter,
  pixelDensities?: PixelDensity[],
}
