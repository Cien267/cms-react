import { Skeleton } from 'antd'

export default function SkeletonTag() {
  return (
    <Skeleton.Input size="small" style={{ minWidth: 60, width: 60 }} active />
  )
}
