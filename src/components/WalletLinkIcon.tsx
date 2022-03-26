import * as React from 'react'
import { SVGProps } from 'react'

export const WalletLinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 150 150'
    xmlSpace='preserve'
    width='1em'
    height='1em'
    {...props}
  >
    <linearGradient
      id='a'
      gradientUnits='userSpaceOnUse'
      x1={75}
      y1={149}
      x2={75}
      y2={1}
    >
      <stop
        offset={0}
        style={{
          stopColor: '#1447ea',
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: '#2b65fb',
        }}
      />
    </linearGradient>
    <path
      d='M75 1C34.1 1 1 34.1 1 75s33.1 74 74 74 74-33.1 74-74S115.9 1 75 1zm0 117.3c-23.9 0-43.3-19.4-43.3-43.3S51.1 31.7 75 31.7s43.3 19.4 43.3 43.3-19.4 43.3-43.3 43.3z'
      style={{
        fill: 'url(#a)',
      }}
    />
    <path
      d='M85.5 88.9h-21c-1.8 0-3.3-1.5-3.3-3.3V64.5c0-1.8 1.5-3.3 3.3-3.3h21.1c1.8 0 3.3 1.5 3.3 3.3v21.1c0 1.8-1.5 3.3-3.4 3.3z'
      style={{
        fill: '#2059eb',
      }}
    />
  </svg>
)
