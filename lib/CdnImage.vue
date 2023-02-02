<script
  setup
  lang="ts"
>
import type { FilePath, Mode, Parameter, Size } from '@apility/netflex-cdn-url'
import { createCdnMediaUrl } from '@apility/netflex-cdn-url'
import type { Breakpoint, PixelDensity } from './types'
import { useCdnUrl } from '@apility/vue-netflex-cdn-url'
import { useBreakpoints } from '@apility/vue-breakpoints-plugin'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  responsive?: boolean,
  path: FilePath,
  mode?: Mode,
  size?: Size,
  parameter?: Parameter,
  pixelDensities?: PixelDensity[],
  breakpoints?: Record<string, Partial<Breakpoint>>,
}>(), {
  responsive: true,
  mode: 'o',
  pixelDensities: () => (['1x', '2x', '3x']),
  breakpoints: () => ({}),
})

const cdnUrl = useCdnUrl()
const breakpointsDefinition = useBreakpoints()

const mediaSrc = computed(() => (
  createCdnMediaUrl(cdnUrl, props.path, props.mode, props.size, props.parameter)
))

const srcset = computed(() => (
  props.pixelDensities
    .map((pixelDensity) => (
      `${mediaSrc.value}?res=${pixelDensity} ${pixelDensity}`
    ))
    .join(', ')
))

const sources = computed(() => (
  Object.entries(breakpointsDefinition)
    .map(([breakpointName], i, breakpoints) => {
      const [, nextBreakpoint] = breakpoints[i + 1] ?? []

      if (!nextBreakpoint) {
        return undefined
      }

      const breakpoint = props.breakpoints[breakpointName] ?? {}

      return {
        path: props.path,
        mode: props.mode,
        size: props.size,
        parameter: props.parameter,
        pixelDensities: props.pixelDensities,
        ...breakpoint,
        width: nextBreakpoint - 1,
      }
    })
    .filter(<T> (breakpoint: T): breakpoint is NonNullable<T> => (breakpoint !== undefined))
    .map((breakpoint) => {
      const url = createCdnMediaUrl(cdnUrl, breakpoint.path, breakpoint.mode, breakpoint.size, breakpoint.parameter)

      return {
        srcset: breakpoint.pixelDensities
          .map((pixelDensity) => (`${url}?src=${breakpoint.width}&res=${pixelDensity} ${pixelDensity}`))
          .join(', '),
        media: `(max-width: ${breakpoint.width}px)`,
      }
    })
))

const imgAttrs = computed(() => ({
  src: mediaSrc.value,
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
