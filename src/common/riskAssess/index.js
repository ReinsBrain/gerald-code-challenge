
export class RiskAssess {

	/** getScoreCode
	 * @static @member @function getScoreCode
	 * @param {number} score 
	 * @returns {Scorecode}
	 */
	static getScoreCode ( score ) {
		switch ( true ) {
			case ( score === null ) : return 'ineligible';
			case ( score >= 3     ) : return 'responsible';
			case ( score < 1      ) : return 'economic';
			default : return 'regular';
		}
	}

	/** assessBase
	 * @static @member @function assessBase
	 * @param {RiskProfile} profile 
	 * @returns {PosInt}
	 */
	static assessBase ( profile ) {
		if ( profile.risk_questions ) {
			return profile.risk_questions.reduce( ( a,b ) => a + b, 0 );
		} else return 0;
	}

	/** assessAuto
	 * @static @member @function assessAuto
	 * @param {RiskProfile} profile 
	 * @returns {Integer}
	 */
	static assessAuto ( profile ) {
		let score = RiskAssess.assessBase( profile );
		let yearBar = new Date().getFullYear() - 5;
		if ( profile.vehicle == null              ) return null;
		if ( profile.age < 30                     ) score = score - 2;
		if ( profile.age > 30 && profile.age < 40 ) score = score - 1;
		if ( profile.income > 200_000             ) score = score - 1;
		if ( profile.vehicle?.year > yearBar      ) score = score + 1;
		return score;
	}

	/** assessDisability
	 * @static @member @function assessDisability
	 * @param {RiskProfile} profile 
	 * @returns {Integer}
	 */
	static assessDisability ( profile ) {
		let score = RiskAssess.assessBase( profile );
		if ( profile.income === 0                            ) return null;
		if ( profile.age > 60                                ) return null;
		if ( profile.age < 30                                ) score = score - 2;
		if ( profile.age >= 30 && profile.age < 40           ) score = score - 1;
		if ( profile.income > 200_000                        ) score = score - 1;
		if ( profile.house?.ownership_status === 'mortgaged' ) score = score + 1;
		if ( profile.dependents > 0                          ) score = score + 1;
		if ( profile.marital_status === 'married'            ) score = score - 1;
		return score;
	}

	/** assessHome
	 * @static @member @function assessHome
	 * @param {RiskProfile} profile 
	 * @returns {Integer}
	 */
	static assessHome ( profile ) {
		let score = RiskAssess.assessBase( profile );
		if ( profile.house == null                           ) return null;
		if ( profile.age < 30                                ) score = score - 2;
		if ( profile.age > 30 && profile.age < 40            ) score = score - 1;
		if ( profile.income > 200_000                        ) score = score - 1;
		if ( profile.house?.ownership_status === 'mortgaged' ) score = score + 1;
		return score;
	}

	/** assessLife
	 * @static @member @function assessLife
	 * @param {RiskProfile} profile 
	 * @returns {Integer}
	 */
	static assessLife ( profile ) {
		let score = RiskAssess.assessBase( profile );
			if ( profile.age > 60                     ) return null;
			if ( profile.age < 30                     ) score = score - 2;
			if ( profile.age > 30 && profile.age < 40 ) score = score - 1;
			if ( profile.dependents > 0               ) score = score + 1;
			if ( profile.income > 200_000             ) score = score - 1;
			if ( profile.marital_status === 'married' ) score = score + 1;
		return score;
	}

	/** assess
	 * @static @member assess
	 * @param {RiskProfile} profile 
	 * @returns {RiskAssessment}
	 */
	static assess ( profile ) {
		return {
			auto      : RiskAssess.getScoreCode( RiskAssess.assessAuto( profile )       ),
			disability: RiskAssess.getScoreCode( RiskAssess.assessDisability( profile ) ),
			home      : RiskAssess.getScoreCode( RiskAssess.assessHome( profile )       ),
			life      : RiskAssess.getScoreCode( RiskAssess.assessLife( profile )       )
		};
	}
}
