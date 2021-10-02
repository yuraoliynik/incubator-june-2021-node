const Collector = require('./collector/Collector');

const ageLine = 20;

const manOlder = new Collector(`manOlder${ageLine}`, __dirname);
const manYounger = new Collector(`manYounger${ageLine}`, __dirname);
const womanOlder = new Collector(`womanOlder${ageLine}`, __dirname);
const womanYounger = new Collector(`womanYounger${ageLine}`, __dirname);

const users = [
    {name: 'Olia', gender: 'female', age: 20},
    {name: 'Kolia', gender: 'male', age: 18},
    {name: 'Sania', gender: 'male', age: 24},
    {name: 'Ira', gender: 'female', age: 19},
    {name: 'Vika', gender: 'female', age: 17},
    {name: 'Yura', gender: 'male', age: 25},
    {name: 'Petro', gender: 'male', age: 30},
    {name: 'Natalia', gender: 'female', age: 16},
    {name: 'Dima', gender: 'male', age: 17},
    {name: 'Vira', gender: 'female', age: 20},
];

users.forEach(user => {
    manOlder.collect(user, user.name,() => {
        return user.gender === 'male' && user.age >= ageLine;
    });

    manYounger.collect(user, user.name,() => {
        return user.gender === 'male' && user.age < ageLine;
    });

    womanOlder.collect(user, user.name,() => {
        return user.gender === 'female' && user.age >= ageLine;
    });

    womanYounger.collect(user, user.name,() => {
        return user.gender === 'female' && user.age < ageLine;
    });
})