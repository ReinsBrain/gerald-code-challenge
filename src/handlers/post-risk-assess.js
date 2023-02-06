
import { RiskAssess } from "../common/riskAssess";

export const handler = async ( event ) => {
	let riskProfile;
	const headers = { "Content-Type":'application/json' };
	try {
		riskProfile = JSON.parse(event.body);
	} catch ( error ) {
		let { message, code, hint } = error;
		return {
			isBase64Encoded: false,
			statusCode: '400',
			headers,
			body: JSON.stringify ( { error: { message, code, hint } } )
		};
	}
	try {
		return {
			isBase64Encoded: false,
			statusCode: '200',
			headers,
			body: JSON.stringify ( RiskAssess.assess( riskProfile ) )
		};
	} catch ( error ) {
		return {
			isBase64Encoded: false,
			statusCode: '500',
			headers,
			body: JSON.stringify ({ error: { message: 'A server error occurred. Please contact administrator.' } })
		}
	}
};
