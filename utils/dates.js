import {parse, format} from 'date-fns';
import {ptBr} from 'date-fns/locale';

const locale = {locale: ptBr};

moment.updateLocale(locale, {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
});

moment.locale(locale);

const DATE_FORMAT_PT_BR = 'DD/MM/YYYY';
const TIME_FORMAT_PT_BR = 'HH:mm';
const DATE_TIME_FORMAT_PT_BR = `${DATE_FORMAT_PT_BR} ${TIME_FORMAT_PT_BR}`;
export const TIMEZONE_DEFAULT = 'America/Sao_Paulo';

export const dateToMoment = (date) => moment(date || new Date());

export const nameCurrentlyMonth = moment().format('MMMM');

export const formatDate = (date) => moment(date || new Date()).format(DATE_FORMAT_PT_BR);

export const parseDate = (date) => moment(date, DATE_FORMAT_PT_BR).toDate();

export const formatDateTime = (dateTime) => moment(dateTime || new Date()).format(DATE_TIME_FORMAT_PT_BR);

export const parseDateTime = (dateTime) => moment(dateTime, DATE_TIME_FORMAT_PT_BR).toDate();

export const formatTime = (time) => moment(time || new Date()).format(TIME_FORMAT_PT_BR);

export const parseTime = (time) => moment(time, TIME_FORMAT_PT_BR).toDate();

export const getDayOfWeekNumber = (date) => moment(date || new Date()).day();

export const weekDays = [
    {i: 0, key: 'sun', value: 'Domingo'},
    {i: 1, key: 'mon', value: 'Segunda'},
    {i: 2, key: 'tue', value: 'Terça'},
    {i: 3, key: 'wed', value: 'Quarta'},
    {i: 4, key: 'thu', value: 'Quinta'},
    {i: 5, key: 'fri', value: 'Sexta'},
    {i: 6, key: 'sat', value: 'Sábado'},
];

export const convertDate = (date) => {
    const result = moment(date).format('DD/MM/YYYY');
    return result !== 'Invalid date' ? result : 'Sem data informada';
};

export const showByYear = (date) => moment().diff(moment(date), 'years');

const changeYearOf = (date) => moment(date).set({year: '1910'});

export const compareOf = (dateX, dateY) => {
    const newDateX = changeYearOf(dateX);
    const newDateY = changeYearOf(dateY);

    if (newDateX.isAfter(newDateY)) {
        return 1;
    }
    if (newDateX.isBefore(newDateY)) {
        return -1;
    }
    // a must be equal to b
    return 0;
};

export const isBirthdayToday = (date) => {
    const birthDayMonth = moment(date, DATE_FORMAT_PT_BR).format('DD/MM');
    const today = moment(new Date(), DATE_FORMAT_PT_BR).format('DD/MM');
    return birthDayMonth === today;
};

// export const handleDays = date => {
//   const days = moment(date)
//     .startOf('day')
//     .diff(moment().startOf('day'), 'days');
//   if (days > 4) {
//     return 4;
//   }
//   if (days < -1) {
//     return -1;
//   }
//   return days;
// };

export const nowFormatted = () => moment().format('DD-MM-YYYY');
