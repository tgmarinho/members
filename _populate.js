/**
 * - run: node _populate.js
 * - Go to file SQL_insert_members.sql, copy inserts and paste it on hasura SQL for create members
 */
const {formatISO} = require('date-fns');
const {ptBr} = require('date-fns/locale');
const faker = require('faker');
faker.locale = 'pt_BR';

const fs = require('fs');

function populate(gender = 'masculino', memberOrAssist = 'Assistente') {
    const member = {
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        status: faker.random.boolean(),
        gender: gender,
        birth: formatISO(faker.date.between(new Date(01, 01, 1940), new Date()), 'yyyy-MM-dd'),
        cellphone: '67998882011',
        obs: faker.lorem.sentence(),
        last_update_at: formatISO(new Date(), 'yyyy-MM-dd'),
        member_at: formatISO(new Date(), 'yyyy-MM-dd'),
        is_member_or_assist: memberOrAssist,
    };

    return member;
}

function createMembers() {
    let a = 0;
    const members = [];
    while (a < 400) {
        const member = a % 2 === 0 ? populate() : populate('feminino', 'Membro');

        members.push(member);
        a++;
    }
    return members;
}

function generateSQLInsert() {
    const members = createMembers();

    const sqlAppended = members.reduce(
        (
            acc,
            {
                name,
                email,
                obs,
                member_at,
                last_update_at,
                cellphone,
                gender,
                birth,
                status,
                is_member_or_assist,
                address,
            }
        ) => {
            const SQL = `INSERT INTO members(name,address,email,status,birth,cellphone,obs,member_at,gender,last_update_at,is_member_or_assist) VALUES ('${name}','${address}','${email}','${status}','${birth}','${cellphone}','${obs}','${member_at}','${gender}','${last_update_at}','${is_member_or_assist}'); \n`;
            return acc + SQL;
        },
        ''
    );

    fs.appendFile('SQL_insert_members.sql', sqlAppended, function (err) {
        if (err) return console.log(err);
        console.log('Fie Created!');
    });
}

generateSQLInsert();
