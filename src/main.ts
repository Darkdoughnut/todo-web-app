import { birthday } from './person';

let people = [
    { name: "Justin", age: 20 },
    { name: "Caleb", age: 19 },
];

document.write("<ol>");
for (let person of people) {
    document.write(`<li>${JSON.stringify(birthday(person))}</li>`);
}
document.write("</ol>");
