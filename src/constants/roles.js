export const roleOptions = [
  {
    label: 'User',
    value: 'user',
  },
  {
    label: 'Super admin',
    value: 'super admin',
  },
]

export const actionsInTabPermission = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  READ: 'READ',
  DELETE: 'DELETE',
}

export const AllAbilities = [
  ['loan_merchant.view'],
  ['test.list', 'test.update'],
  ['role.read', 'role.create', 'role.update', 'role.delete'],
  ['user.read', 'user.create', 'user.update', 'user.delete'],
  ['pre_scanning.read', 'pre_scanning.update'],
  ['logs.read'],
]

export const RootAdmin = {
  name: 'Root Admin',
  status: true,
  abilities: AllAbilities,
}
