import React from 'react'

// will add when overview define requirement
const Overview = () => import('@/views/Overview')
const ListUser = () => import('@/views/User/ListUser')
const Permission = () => import('@/views/Permission')
const DetailMerchantLoan = () =>
  import('@/views/MerchantLoan/DetailMerchantLoan')
const MerchantLoan = () => import('@/views/MerchantLoan/ListMerchantLoan')
const MerchantTest = () => import('@/views/ConfigMerchantTest')
const PreScanning = () => import('@/views/PreScanning')
const PartnerBusinessEffectiveness = () =>
  import('@/views/Partner/BusinessEffectiveness')
const PartnerManageLoanPackage = () =>
  import('@/views/Partner/ManageLoanPackage')
const PartnerConfigPriority = () => import('@/views/Partner/ConfigPriority')

const routeMap = {
  '/': Overview,
  '/user': ListUser,
  '/permission': Permission,
  '/merchant-loan/:id': DetailMerchantLoan,
  '/merchant-loan': MerchantLoan,
  '/merchant-test': MerchantTest,
  '/partner/business-effectiveness': PartnerBusinessEffectiveness,
  '/partner/manage-loan-package': PartnerManageLoanPackage,
  '/partner/config-priority': PartnerConfigPriority,
  '/pre-scanning': PreScanning,
}

export const routeAbilities = {
  '/': null,
  '/user': 'user.read',
  '/permission': 'role.read',
  '/merchant-loan/:id': 'loan_merchant.view',
  '/merchant-loan': 'loan_merchant.view',
  '/merchant-test': 'test.list',
  '/pre-scanning': 'pre_scanning.read',
  '/partner/business-effectiveness': true,
  '/partner/manage-loan-package': true,
  '/partner/config-priority': true,
}

const routes = Object.keys(routeMap).map(route => {
  return {
    path: route,
    element: React.lazy(routeMap[route]),
    preload: routeMap[route],
    ability: routeAbilities[route],
  }
})

export default routes
