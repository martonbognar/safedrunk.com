import {UNITS} from './data/units';

function intervalToText(date) {
  const diff = Math.floor(((new Date()).getTime() - date.getTime()) / 1000);

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

function getDots(drinks) {
  let time = new Date(drinks[0].startTime.getTime());
  let lastDot = new Date(drinks[drinks.length - 1].startTime.getTime());
  drinks.forEach((drink) => {
    const current = new Date(drink.startTime.getTime());
    if (current < time) {
      time = current;
    }
    if (lastDot < current) {
      lastDot = current;
    }
  });
  lastDot.setHours(lastDot.getHours() + 2);
  return {first: time, last: lastDot};
}

function ebacSteps(drinks, userData) {
  const data = {
    output: [],
    comeDown: [],
  };

  if (drinks.length === 0) {
    return data;
  }

  const currentTime = new Date();
  const dots = getDots(drinks);
  const time = dots['first'];
  const lastDot = dots['last'];

  let bac = 0;
  let consideredDrinks = [];

  do {
    consideredDrinks = drinks.filter((drink) => drink.startTime <= time);
    bac = calculateEbac(consideredDrinks, time, userData);
    if (time < lastDot) {
      const label = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2);
      data['output'].push({[label]: bac});
    }
    time.setMinutes(time.getMinutes() + 30);
  } while ((bac > 0.01 || drinks.length !== consideredDrinks.length) && time < currentTime);

  if (time > currentTime) {
    const label = ('0' + currentTime.getHours()).slice(-2) + ':' + ('0' + currentTime.getMinutes()).slice(-2);
    bac = calculateEbac(drinks, currentTime, userData);
    data['output'].push({[label]: bac});
  } else {
    const label = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2);
    data['comeDown'] = Array(labels.length - 1).fill(null);
    data['comeDown'][data['comeDown'].length - 1] = data['output'][data['output'].length - 1];
    bac = calculateEbac(drinks, time, userData);
    data['comeDown'].push({[label]: bac});
  }

  return data;
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

  const period = (endTime.getTime() - earliest) / (1000 * 60 * 60);

  const grams = drinks.map((drink) => {
    const amount = UNITS[drink.unit]['multiplier'] * drink.amount;
    const alcoholml = (amount / 10) * drink.percentage;
    return alcoholml * 0.789;
  }).reduce((a, b) => a + b, 0);

  return ebac(grams, period, userData).toFixed(5);
}

function ebac(alcohol, period, userData) {
  if (period < 0) {
    return 0;
  }
  const bw = userData.sex === 'male' ? 0.58 : 0.49;
  const result = ((0.806 * (alcohol / 10) * 1.2) / (bw * userData.weight)) - (0.017 * period);
  return result > 0 ? result : 0;
}

export {intervalToText, calculateEbac, ebacSteps};
