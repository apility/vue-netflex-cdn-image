import { CdnUrl, Mode, Size, Parameter, FilePath } from '@apility/netflex-cdn-url'
import type { Breakpoints } from '@apility/vue-breakpoints-plugin'

export type Compressor = 'lambda' | 'kraken' | 'local'
export type Resampler =
  | 'box'
  | 'catmullrom'
  | 'gaussian'
  | 'lanczos'
  | 'linear'
  | 'mitchell_netravali'
  | 'nearest_neighbor'

export type PixelDensity = `${number}x`

export interface CdnImageInjection {
  cdnUrl: CdnUrl,
  breakpoints: Breakpoints,
  pixelDensities: PixelDensity[],
  compressor?: Compressor,
}

export type CdnImageOptions =
  Pick<CdnImageInjection, 'cdnUrl' | 'breakpoints'>
  & Partial<Pick<CdnImageInjection, 'pixelDensities' | 'compressor'>>

export type SearchParams = {
  compressor?: Compressor,
  resampler?: Resampler,
  speed?: number,
  /** Number between 1 and 101 */
  quality?: number,
  alias?: string,
} & {
  [key: string]: string | number | undefined,
}

export interface Breakpoint {
  path: FilePath,
  mode: Mode,
  size?: Size,
  parameter?: Parameter,
  pixelDensities?: PixelDensity[],
  searchParams?: SearchParams,
}
