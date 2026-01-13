import cn from 'classnames'

import { Button } from '../Button'

export default function Select({ btnProps = {}, value = 'Select' }) {
  return (
    <Button
      {...btnProps}
      className={cn('flex items-center gap-3', btnProps.className)}
    >
      <span>{value}</span>
      <span>{'>'}</span>
    </Button>
  )
}
