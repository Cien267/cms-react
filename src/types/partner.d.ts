export type PartnerRuleType = {
	businessAge: ConfigObjectProps,
	revenue6months: ConfigObjectProps,
	lastTxnMonth: ConfigObjectProps,
}

export type UpdatePartnerRuleType = {
	partnerRule: PartnerRuleType
}

export type PartnerTargetLeadType = {
	id: string,
	target: number
}

export type PartnerExpectationType = {
	id: string
	expectation: number
}

export type CreatePackageLoanType = {
	name: string,
	partner: string,
	partnerRule: PartnerRuleType,
	iconUrl: string,
}

export type UpdatePartnerTargetType = {
	month: number,
	targetLeads: Array<PartnerTargetLeadType>
}

export type UpdatePartnerExpectationType = {
	expectations: Array<PartnerExpectationType>
}

export type UpdatePartnerPriorityType = {
	priority: boolean
}