let jsPDF = null;

if (typeof window !== 'undefined') {
    import('jspdf').then((module) => {
        jsPDF = module.default;
    });
}

import 'jspdf-autotable';
import {format, parseISO} from 'date-fns';

const titlesDefault = [
    {title: 'Nr', dataKey: 'nr'},
    {title: 'Nome', dataKey: 'name'},
    {title: 'Celular', dataKey: 'cellphone'},
    {title: 'Email', dataKey: 'email'},
    {title: 'Endereço', dataKey: 'address'},
    {title: 'Observação', dataKey: 'obs'},
    {title: 'Sexo', dataKey: 'gender'},
    {title: 'Status', dataKey: 'status'},
    {title: 'Aniversário', dataKey: 'birth'},
    {title: 'Tipo de Membresia', dataKey: 'is_member_or_assist'},
    {title: 'Membro desde', dataKey: 'member_at'},
];

const getFields = (state) =>
    Object.entries(state)
        .filter((item) => item[1])
        .map((item) => item[0]);

const populateRows = (members) =>
    members
        .filter((member) => member.status)
        .map((member, index) => ({
            nr: index + 1,
            name: member.name,
            cellphone: member.cellphone,
            phone: member.phone,
            email: member.email,
            address: member.address,
            obs: member.obs,
            birth: member.birth && format(parseISO(member.birth), 'dd/MM/yyyy'),
            member_at: member.member_at && format(parseISO(member.member_at), 'dd/MM/yyyy'),
            is_member_or_assist: member.is_member_or_assist,
            gender: member.gender,
        }));

const getColumnsHeaderBy = (fields) =>
    fields.map((attribute) => ({
        title: titlesDefault.filter((elem) => elem.dataKey === attribute).map((item) => item.title),
        dataKey: attribute,
    }));

const configStyles = (columns) => {
    const configProps = {
        orientation: '',
        fontStyle: {},
    };

    if (columns.length > 5) {
        configProps.orientation = 'l';
        configProps.fontStyle = {fontSize: 8};
    } else if (columns.length >= 4) {
        configProps.orientation = 'l';
        configProps.fontStyle = {fontSize: 12};
    } else {
        configProps.orientation = 'p';
        configProps.fontStyle = {fontSize: 16};
    }

    return configProps;
};

const generatePdf = (columns, rows) => {
    const config = configStyles(columns);
    const doc = new jsPDF(config.orientation);

    doc.autoTable(columns, rows, {
        margin: {horizontal: 10},
        bodyStyles: {valign: 'top'},
        styles: {overflow: 'linebreak', fontStyle: config.fontStyle},
        columnStyles: {
            text: {cellWidth: 'auto'},
            name: {fontStyle: 'bold'},
        },
    });

    doc.save(`relatório_inteligente_membros_app.pdf`);
};

export const reportSmart = (members, reportValues) => {
    const fields = getFields(reportValues);
    const columns = getColumnsHeaderBy(fields);
    const rows = populateRows(members);
    generatePdf(columns, rows);
};
