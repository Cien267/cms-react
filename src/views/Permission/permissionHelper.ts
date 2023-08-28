import { abilities } from '@/constants/resources'
import { actionsInTabPermission } from '@/constants/roles'
import { mapPermissionToArray } from '@/helpers/array'

export function getInitialActiveItem({ id, havePermissionCreate }) {
  if (id) return id
  if (havePermissionCreate) return 'add'
  return 'root'
}

export function getInitialAction({ activeItem, havePermissionCreate }: { activeItem: string, havePermissionCreate: boolean }) {
  return havePermissionCreate && activeItem === 'add'
    ? actionsInTabPermission.CREATE
    : actionsInTabPermission.READ
}

export function getInitialRole({ roles, activeItem, resources }) {
  if (!roles) return
  const newRoles = roles.map(r => ({
    ...r,
    abilities: mapPermissionToArray(
      resources,
      r.abilities || [],
      resources.length,
    ),
  }))
  const initialRole = newRoles.find(role => role.id === activeItem)
  return initialRole
}

export function getActions(actions) {
  return actions.map(action => ({
    value: action,
    label: abilities[action],
  }))
}
