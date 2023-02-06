
/** Integer
 * @typedef Integer - an integer
 * @type {number}
 */

/** PosInt
 * @typedef PosInt - a positive integer
 * @type {Integer}
 */

/** Bit
 * @typedef Bit - 0 or 1
 * @type {0|1}
 */

/** Scorecode
 * @typedef Scorecode - enum type representing Scorecode
 * @type {'ineligible'|'responsible'|'economic'|'regular'}
 */

/** RiskQuestions
 * @typedef RiskQuestions - a tuple with 3 bits
 * @type {[Bit,Bit,Bit]}
 */

/** MaritalStatus
 * @typedef MaritalStatus - enum type representing marital status
 * @type {'married'|'single'}
 */

/** Vehicle
 * @typedef Vehicle - an object representing a Vehicle for Risk Assessment
 * @type {object}
 * @property {PosInt} year
 */

/** House
 * @typedef House - an object representing a House for Risk Assessment
 * @type {object}
 * @property {'owned'|'mortgaged'} ownership_status
 */

/** RiskProfile
 * @typedef RiskProfile
 * @type     {object}
 * @property {PosInt}        age
 * @property {PosInt}        dependents
 * @property {PosInt}        income
 * @property {House}         house
 * @property {MaritalStatus} marital_status
 * @property {RiskQuestions} risk_questions
 */

/** RiskAssessment
 * @typedef RiskAssessment
 * @type     {object}
 * @property {Scorecode} auto
 * @property {Scorecode} disability
 * @property {Scorecode} home
 * @property {Scorecode} life
 */
