import { UNITS } from './data/units';

function intervalToText(date) {
    let diff = Math.floor(((new Date()).getTime() - date.getTime()) / 1000);

    if (diff < 0) {
        return 'in the future';
    } else if (diff < 10) {
        return 'just now';
    } else if (diff < 60) {
        return diff + ' seconds ago';
    } else if (diff < 120) {
        return 'a minute ago';
    } else if (diff < 60 * 60) {
        return Math.floor(diff / 60) + ' minutes ago';
    } else if (diff < 60 * 60 * 2) {
        return 'an hour ago';
    } else if (diff < 60 * 60 * 24) {
        return Math.floor(diff / (60 * 60)) + ' hours ago';
    } else if (diff < 2 * 60 * 60 * 24) {
        return 'a day ago';
    } else {
        return Math.floor(diff / (60 * 60 * 24)) + ' days ago';
    }
}

function calculateEbac(drinks, endTime, userData) {
    if (drinks.length === 0) {
        return 0;
    }

    let earliest = drinks[0].startTime.getTime();
    drinks.forEach((drink) => {
        if (drink.startTime.getTime() < earliest) {
            earliest = drink.startTime.getTime();
        }
    });

    let period = (endTime.getTime() - earliest) / (1000 * 60 * 60);

    let grams = drinks.map(drink => {
        let amount = UNITS[drink.unit]['multiplier'] * drink.amount;
        let alcoholml = (amount / 10) * drink.percentage;
        return alcoholml * 0.789;
    }).reduce((a, b) => a + b, 0);

    return ebac(grams, period, userData).toFixed(5);
}

function ebac(alcohol, period, userData) {
    if (period < 0) {
        return 0;
    }
    let bw = userData.sex === 'male' ? 0.58 : 0.49;
    let result = ((0.806 * (alcohol / 10) * 1.2) / (bw * userData.weight)) - (0.017 * period);
    return result > 0 ? result : 0;
}

export { intervalToText, calculateEbac };
