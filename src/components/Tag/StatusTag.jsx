import { Badge } from 'antd'

export default function StatusTag({
  color,
  textColor,
  count = 0,
  onClick,
  label,
}) {
  const hasOnClick = typeof onClick === 'function'

  const text = count > 0 ? `${count} ${label}` : label
  return (
    <Badge
      color={color}
      text={text}
      onClick={() => {
        if (hasOnClick) {
          onClick()
        }
      }}
      style={{ color: textColor, cursor: hasOnClick ? 'pointer' : 'initial' }}
    />
  )
}
