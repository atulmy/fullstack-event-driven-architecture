// UI imports
import style from './style.module.scss'

// Component
export const Loader = ({ message = '', size = '2rem', ...props }) => (
  <div className={style.loader} {...props}>
    <svg viewBox='0 0 100 100' width={size} height={size}>
      <path d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'>
        <animateTransform
          attributeName='transform'
          attributeType='XML'
          type='rotate'
          dur='1s'
          from='0 50 50'
          to='360 50 50'
          repeatCount='indefinite'
        />
      </path>
    </svg>

    {message && <p className={style.message}>{message}</p>}
  </div>
)
