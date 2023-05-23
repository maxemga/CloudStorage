import { SvgProps } from 'src/types'

export const DocIcon = (props: SvgProps) => (
  <svg
    xmlSpace="preserve"
    width={props.size || 80}
    height={props.size || 80}
    viewBox="0 0 550 550"
    {...props}>
    <g fillRule="evenodd" clipRule="evenodd">
      <path
        fill="#008bf5"
        d="M168.579 0h173.378l153.1 153.07v293.997c0 35.729-29.233 64.933-64.932 64.933H168.579c-35.7 0-64.933-29.204-64.933-64.933V64.933C103.646 29.203 132.88 0 168.579 0z"
        data-original="#008bf5"
      />
      <path
        fill="#006fc4"
        d="m341.957 0 153.1 153.07H358.49c-9.1 0-16.533-7.403-16.533-16.504zM31.194 218.003h352.609c7.842 0 14.28 6.408 14.28 14.251v129.368c0 7.842-6.438 14.28-14.28 14.28H31.194c-7.843 0-14.251-6.438-14.251-14.28V232.254c0-7.843 6.408-14.251 14.251-14.251z"
        data-original="#006fc4"
      />
    </g>
    <path
      fill="#fff"
      d="M207.498 244.413c-19.226 0-34.866 15.641-34.866 34.865v35.348c0 19.225 15.641 34.865 34.866 34.865s34.865-15.641 34.865-34.865v-35.348c.001-19.225-15.64-34.865-34.865-34.865zm18.333 70.213c0 10.108-8.224 18.332-18.332 18.332-10.109 0-18.333-8.224-18.333-18.332v-35.348c0-10.108 8.224-18.332 18.333-18.332 10.108 0 18.332 8.224 18.332 18.332zm104.231 0c0 19.225-15.641 34.865-34.865 34.865s-34.865-15.641-34.865-34.865v-35.348c0-19.225 15.641-34.865 34.865-34.865s34.865 15.641 34.865 34.865a8.267 8.267 0 1 1-16.533 0c0-10.108-8.224-18.332-18.332-18.332s-18.332 8.224-18.332 18.332v35.348c0 10.108 8.224 18.332 18.332 18.332s18.332-8.224 18.332-18.332a8.266 8.266 0 1 1 16.533 0zm-210.263-70.213H93.2a8.266 8.266 0 0 0-8.266 8.266v88.546a8.266 8.266 0 0 0 8.266 8.266h26.599c19.226 0 34.866-15.641 34.866-34.865v-35.348c0-19.225-15.64-34.865-34.866-34.865zm18.333 70.213c0 10.108-8.224 18.332-18.333 18.332h-18.332v-72.013h18.332c10.109 0 18.333 8.224 18.333 18.332z"
      data-original="#ffffff"
    />
  </svg>
)
