import React from 'react'
import { allSidebars } from '@/constants/sidebar'

import useCurrentPath from './useCurrentPath'

function isActiveLink(currentPath, link) {
  if (link === '/') return currentPath === '/'
  return currentPath.includes(link)
}

export default function useMenuKey() {
  const currentPath = useCurrentPath()

  const { selectedKey, openKey } = React.useMemo(() => {
    for (let i = 0; i < allSidebars.length; i += 1) {
      const pItem = allSidebars[i]
      if (pItem.children) {
        for (let j = 0; j < pItem.children.length; j += 1) {
          const cItem = pItem.children[j]

          if (isActiveLink(currentPath, cItem.link)) {
            return {
              selectedKey: cItem.key,
              openKey: pItem.key,
            }
          }
        }
      } else if (isActiveLink(currentPath, pItem.link)) {
        return {
          selectedKey: pItem.key,
          openKey: pItem.key,
        }
      }
    }
    return {
      selectedKey: '',
      openKey: '',
    }
  }, [currentPath])

  return { selectedKey, openKey, currentPath }
}
