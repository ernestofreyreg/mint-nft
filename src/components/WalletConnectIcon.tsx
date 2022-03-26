import * as React from 'react'
import { SVGProps } from 'react'

export const WalletConnectIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 824 618'
    xmlSpace='preserve'
    width='1em'
    height='1em'
    {...props}
  >
    <radialGradient
      id='a'
      cx={13.279}
      cy={609.416}
      r={1}
      gradientTransform='matrix(512 0 0 -512 -6643 312330)'
      gradientUnits='userSpaceOnUse'
    >
      <stop
        offset={0}
        style={{
          stopColor: '#5d9df6',
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: '#006fff',
        }}
      />
    </radialGradient>
    <path
      d='M412 53c141.4 0 256 114.6 256 256S553.4 565 412 565 156 450.4 156 309 270.6 53 412 53z'
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        fill: 'url(#a)',
      }}
    />
    <path
      d='M318.7 250.7c51.5-50.3 135.1-50.3 186.6 0l6.2 6.1c2.6 2.5 2.6 6.6 0 9.1l-21.2 20.7a3.32 3.32 0 0 1-4.7 0l-8.5-8.3c-36-35.1-94.2-35.1-130.2 0l-9.1 8.9a3.32 3.32 0 0 1-4.7 0l-21.2-20.7c-2.6-2.5-2.6-6.6 0-9.1l6.8-6.7zm230.5 42.8 18.9 18.4c2.6 2.5 2.6 6.6 0 9.1L483 404.1c-2.6 2.5-6.8 2.5-9.3 0l-60.4-59c-.6-.6-1.7-.6-2.3 0l-60.4 59c-2.6 2.5-6.8 2.5-9.3 0L255.9 321c-2.6-2.5-2.6-6.6 0-9.1l18.9-18.4c2.6-2.5 6.8-2.5 9.3 0l60.4 59c.6.6 1.7.6 2.3 0l60.4-59c2.6-2.5 6.8-2.5 9.3 0l60.4 59c.6.6 1.7.6 2.3 0l60.4-59c2.8-2.5 7-2.5 9.6 0z'
      style={{
        fill: '#fff',
      }}
    />
  </svg>
)
