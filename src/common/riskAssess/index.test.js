import {jest} from '@jest/globals';
import { RiskAssess } from ".";

describe('RiskAssess.assessBase()', () => {
	it('should sum all risk values', () => {
		expect( RiskAssess.assessBase( { risk_questions: [0,0,1] } ) ).toBe(1);
	});
	it('should return 0 when risk_questions is undefined', ()=>{
		expect( RiskAssess.assessBase({})).toBe(0);
	});
});

describe('RiskAssess.getScoreCode()', () => {
	it('should return "ineligible" when score is null',() => {
		expect(RiskAssess.getScoreCode(null)).toBe("ineligible");
	});
	it('should return "responsible" when score >= 3',() => {
		expect(RiskAssess.getScoreCode(3)).toBe("responsible");
	});
	it('should return "economic" when score < 1',() => {
		expect(RiskAssess.getScoreCode(0)).toBe("economic");
	});
	it('should return "regular" when score is 0,1 or 2',() => {
		expect(RiskAssess.getScoreCode(2)).toBe("regular");
	});
});


describe('RiskAssess.assessAuto()',() => {
	let year = new Date().getFullYear() - 6;
	it('should return null when vehicle is undefined', ()=>{
		expect( RiskAssess.assessAuto({})).toBe(null);
	});
	it('should return -2 when age < 30',()=>{
		expect( RiskAssess.assessAuto({age:29, vehicle:{year}})).toBe(-2);
	});
	it('should return -1 when age >= 30 && age < 40',()=>{
		expect (RiskAssess.assessAuto({age:39, vehicle:{year}})).toBe(-1);
	});
	it('should return -1 when income > 200_000',()=>{
		expect( RiskAssess.assessAuto({income:200_001, age:50, vehicle:{year}})).toBe(-1);
	});
	it('should return +1 when vehicle.year less than 5 years',()=>{
		expect( RiskAssess.assessAuto({age:50, vehicle:{year:year+5}})).toBe(1);
	});
	it('should return +3 when risk_questions are true',()=>{
		expect( RiskAssess.assessAuto({age:50, vehicle:{year}, risk_questions:[1,1,1]})).toBe(3);
	});
	it('should return sum of non-null combined states',()=>{
		expect( RiskAssess.assessAuto({
			age:40, income:200_001, vehicle:{year:2001}, risk_questions:[1,1,1]
		})).toBe(2);
	});
});

describe('RiskAssess.assessDisability()',() =>{
	it('should return null when income === 0', () =>{
		expect(RiskAssess.assessDisability({income:0})).toBe(null);
	});
	it('should return null when age > 60', () =>{
		expect(RiskAssess.assessDisability({income:1,age:61})).toBe(null);
	});
	it('should return -2 when age < 30',()=>{
		expect(RiskAssess.assessDisability({income:1,age:29})).toBe(-2);
	});
	it('should return -1 when age > 30 && profile.age < 40',()=>{
		expect(RiskAssess.assessDisability({income:1,age:39})).toBe(-1);
	});
	it('should return -1 when income > 200_000',()=>{
		expect(RiskAssess.assessDisability({income:200_001})).toBe(-1);
	});
	it('should return +1 when house.ownership_status === "mortgaged"', () =>{
		expect(RiskAssess.assessDisability({house:{ownership_status:"mortgaged"}})).toBe(1);
	});
	it('should return +1 when dependents greater than 0', () =>{
		expect(RiskAssess.assessDisability({dependents:1})).toBe(1)
	});
	it('should return -1 when marital_statis is "married"', () =>{
		expect(RiskAssess.assessDisability({marital_status:"married"}));
	});
});

describe('RiskAssess.assessHome()',() => {
	let house = {ownership_status:"owned"};
	it('should return null when house property is undefined', () => {
		expect(RiskAssess.assessHome({})).toBe(null);
	});
	it('should return -2 when age < 30', () => {
		expect(RiskAssess.assessHome({age:29,house})).toBe(-2);
	});
	it('should return -1 when age > 30 && profile.age < 40', () => {
		expect(RiskAssess.assessHome({age:39,house})).toBe(-1);
	});
	it('should return -1 when income > 200_000', () => {
		expect(RiskAssess.assessHome({income:200_001,house})).toBe(-1);
	});
	it('should return +1 when house.ownership_status === "mortgaged" ' , () => {
		expect(RiskAssess.assessHome({house:{ownership_status:"mortgaged"}}));
	});
});

describe('RiskAssess.assessLife()',() =>{
	it('should return null when age > 60', () => {
		expect(RiskAssess.assessLife({age:61})).toBe(null);
	});
	it('should return -2 when age < 30', () => {
		expect(RiskAssess.assessLife({age:29})).toBe(-2);
	});
	it('should return -1 when age > 30 && profile.age < 40', () => {
		expect(RiskAssess.assessLife({age:39})).toBe(-1);
	});
	it('should return +1 when dependents > 0', () => {
		expect(RiskAssess.assessLife({dependents:1})).toBe(1);
	});
	it('should return -1 when income > 200_000', () => {
		expect(RiskAssess.assessLife({income:200_001})).toBe(-1);
	});
	it('should return +1 when marital_status === "married"', () => {
		expect(RiskAssess.assessLife({marital_status:"married"}));
	});
});

describe('RiskAssess.assess()',() =>{
	it('should return correct values when passed scenario A', ()=> {
		expect(RiskAssess.assess({ age:61, income:0 })).toEqual({
			auto:"ineligible",
			disability:"ineligible",
			home:"ineligible",
			life:"ineligible"
		});
	});
	// TODO: more scenarios please
});
