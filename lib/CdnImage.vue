<script
  setup
  lang="ts"
>
import type { FilePath, Mode, Parameter, Size } from '@apility/netflex-cdn-url'
import { createCdnMediaUrl } from '@apility/netflex-cdn-url'
import type { Breakpoint, SearchParams, PixelDensity } from './types'
import { computed } from 'vue'
import { useCdnImage } from './composable'

const props = withDefaults(defineProps<{
  responsive?: boolean,
  path: FilePath,
  mode?: Mode,
  size?: Size,
  parameter?: Parameter,
  pixelDensities?: PixelDensity[],
  searchParams?: SearchParams,
  breakpoints?: Record<string, Partial<Breakpoint>>,
}>(), {
  responsive: true,
  mode: 'o',
})

defineSlots<{
  default (props: {
    attrs: {
      src: string,
      srcset: string,
    }
  }): any
}>()

const {
  cdnUrl,
  breakpoints: breakpointsDefinition,
  pixelDensities: defaultPixelDensitites,
  compressor: defaultCompressor,
} = useCdnImage()

const searchParams = computed(() => ({
  compressor: props.searchParams?.compressor ?? defaultCompressor,
  ...props.searchParams,
}))

const pixelDensities = computed(() => (
  props.pixelDensities ?? defaultPixelDensitites
))

const prepareUrl = (url: string, searchParams: SearchParams = {}): URL => {
  const preparedUrl = new URL(url)

  Array.from(Object.entries<SearchParams[keyof SearchParams]>(searchParams))
    .forEach(([key, value]) => {
      if (value !== undefined) {
        preparedUrl.searchParams.set(key, String(value))
      }
    })

  return preparedUrl
}

const mediaUrl = computed(() => (
  prepareUrl(
    createCdnMediaUrl(cdnUrl, props.path, props.mode, props.size, props.parameter),
    searchParams.value,
  )
))

const createSrcset = (baseUrl: URL, pixelDensities: PixelDensity[]) => (
  pixelDensities
    .map((pixelDensity) => {
      const url = new URL(baseUrl)
      url.searchParams.set('res', pixelDensity)

      return `${url} ${pixelDensity}`
    })
    .join(', ')
)

const srcset = computed(() => (
  createSrcset(
    mediaUrl.value,
    pixelDensities.value,
  )
))

const sources = computed(() => (
  Object.entries(breakpointsDefinition)
    .map(([breakpointName], i, breakpoints) => {
      const [, nextBreakpoint] = breakpoints[i + 1] ?? []

      if (!nextBreakpoint) {
        return undefined
      }

      const breakpoint = props.breakpoints?.[breakpointName] ?? {}

      return {
        path: props.path,
        mode: props.mode,
        size: props.size,
        parameter: props.parameter,
        pixelDensities: pixelDensities.value,
        searchParams: searchParams.value,
        ...breakpoint,
        width: nextBreakpoint - 1,
      }
    })
    .filter(<T> (breakpoint: T): breakpoint is NonNullable<T> => (breakpoint !== undefined))
    .map((breakpoint) => {
      const url = prepareUrl(
        createCdnMediaUrl(cdnUrl, breakpoint.path, breakpoint.mode, breakpoint.size, breakpoint.parameter),
        breakpoint.searchParams,
      )
      url.searchParams.set('src', String(breakpoint.width))

      return {
        srcset: createSrcset(url, breakpoint.pixelDensities),
        media: `(max-width: ${breakpoint.width}px)`,
      }
    })
))

const imgAttrs = computed(() => ({
  src: mediaUrl.value.toString(),
  srcset: srcset.value,
}))
</script>

<template>
  <picture v-if="responsive">
    <source
      v-for="source in sources"
      :srcset="source.srcset"
      :media="source.media"
    >

    <slot :attrs="imgAttrs">
      <img v-bind="imgAttrs">
    </slot>
  </picture>

  <img
    v-else
    v-bind="imgAttrs"
  >
</template>
