import clsx from 'clsx'

interface Props {
  children: JSX.Element | JSX.Element[]
  onClick?: () => void
  type?: 'button' | 'submit'
  size?: 'mini'| 'thin' | 'small' | 'medium' | 'large'
}

export const Button = ({
  children,
  onClick = () => {},
  type = 'button',
  size = 'medium',
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        'm-0 bg-next-blue rounded-md shadow-blue-next text-white capitalize text-center font-uberText text-base',
        {
          'px-2 py-2': size === 'mini',
          'px-4 py-2': size === 'thin',
          'px-8 py-4': size === 'small',
          'px-14 py-5': size === 'medium',
        }
      )}
    >
      {children}
    </button>
  )
}
