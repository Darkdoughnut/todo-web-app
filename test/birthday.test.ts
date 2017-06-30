import { expect } from 'chai';
import { birthday } from '../src/person';

describe("Greeter Class", () => {
    it("Should increment the age by one", () => {
        let person = { name: "Caleb", age: 19 };
        expect(birthday(person).age).eql(20);
    });

    it("Should preserve the name", () => {
        let person = { name: "Justin", age: 20 };
        expect(birthday(person).name).eql("Justin");
    })
});