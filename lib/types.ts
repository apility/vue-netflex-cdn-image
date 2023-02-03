import { CdnUrl, Mode, Size, Parameter, FilePath } from '@apility/netflex-cdn-url'
import type { Breakpoints } from '@apility/vue-breakpoints-plugin'

export type Compressor = 'lambda' | 'kraken' | 'local' | undefined

export type PixelDensity = `${number}x`

export interface CdnImageInjection {
  cdnUrl: CdnUrl,
  breakpoints: Breakpoints,
  pixelDensities: PixelDensity[],
  compressor: Compressor,
}

export type CdnImageOptions =
  Pick<CdnImageInjection, 'cdnUrl' | 'breakpoints'>
  & Partial<Pick<CdnImageInjection, 'pixelDensities' | 'compressor'>>

export interface Breakpoint {
  path: FilePath,
  mode: Mode,
  size?: Size,
  parameter?: Parameter,
  pixelDensities?: PixelDensity[],
  compressor?: Compressor,
}
