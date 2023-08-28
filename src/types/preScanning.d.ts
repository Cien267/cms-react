export type ConfigObjectProps = {
	required: boolean,
	pattern: string
}
export type PreScanningConfigProps = {
	businessAge: ConfigObjectProps,
	lastTxnMonth: ConfigObjectProps,
	activeDay3months?: ConfigObjectProps,
	activeDay6months?: ConfigObjectProps,
	noDayRemain?: ConfigObjectProps,
	revenue3months?: ConfigObjectProps,
	revenue6months: ConfigObjectProps,
}