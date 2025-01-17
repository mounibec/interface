// Unidex aggregates many aggregators but their api only supports fantom
// Source: https://unidexexchange.gitbook.io/unidex/api-information/swap-aggregator/quote-swap
// IMPORTANT: their api is broken, this integration is disabled since it doesnt work

import BigNumber from 'bignumber.js';

export const chainToId = {
	fantom: 250
};

export const name = 'UniDex';
export const token = 'UNIDX';

export function approvalAddress() {
	return '0x216b4b4ba9f3e719726886d34a177484278bfcae';
}

export async function getQuote(chain: string, from: string, to: string, amount: string) {
	const data = await fetch(
		`https://unidexmirai.org/swap/v1/quote?sellToken=${from}&buyToken=${to}&sellAmount=${amount}`
	).then((r) => r.json());

	const estimatedGas = chain === 'optimism' ? BigNumber(2).times(data.estimatedGas).toFixed(0, 1) : data.estimatedGas;

	return {
		amountReturned: data.buyAmount,
		estimatedGas,
		tokenApprovalAddress: data.allowanceTarget
	};
}
