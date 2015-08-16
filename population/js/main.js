/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];
var responses = {};
var countryOrCityName = window.prompt('Type a country or continent name');
var i;

for (i = 0; i < 3; i++) {
    var request = requests[i];
    /**
     * Описание исправления:
     *
     * Внутри функции callback происходил доступ к внешней переменной request,
     * которая изменялась на каждом шаге цикла.
     *
     * В API внутри setTimeout функция обратного вызова выполнялась после
     * прохождения цикла с вызовом getData (т.к. даже время задержки == 0
     * ставит выполнение функции, переданной в setTimeout, в конец очереди)
     *
     * Из-за этих двух особенностей при выполенении функции обратного вызова
     * в переменной request хранилась последний элемент массива requests,
     * т.е. '/population'
     *
     * Для исправления ошибки требуется объявить функцию обратного вызова
     * внутри замыкания, что не позволит переменной request внутри замыкания
     * изменяться на каждом шаге цикла
     */
    var calc = (function (request, countryOrCityName) {
        'use strict';
        return function callback(error, result) {
            responses[request] = result;
            var l = [],
                K,
                i,
                j;
            for (K in responses) {
                if (responses.hasOwnProperty(K)) {
                    l.push(K);
                }
            }

            if (l.length === 3) {
                if (countryOrCityName === '') {
                    var c = [], cc = [], p = 0;
                    for (i = 0; i < responses['/countries'].length; i++) {
                        if (responses['/countries'][i].continent === 'Africa') {
                            c.push(responses['/countries'][i].name);
                        }
                    }

                    for (i = 0; i < responses['/cities'].length; i++) {
                        for (j = 0; j < c.length; j++) {
                            if (responses['/cities'][i].country === c[j]) {
                                cc.push(responses['/cities'][i].name);
                            }
                        }
                    }

                    for (i = 0; i < responses['/populations'].length; i++) {
                        for (j = 0; j < cc.length; j++) {
                            if (responses['/populations'][i].name === cc[j]) {
                                p += responses['/populations'][i].count;
                            }
                        }
                    }
                    console.log('Total population in African cities: ' + p);
                } else {
                    var countryName = '',
                        cityNames = [],
                        population = 0;
                    for (i = 0; i < responses['/countries'].length; i++) {
                        if (responses['/countries'][i].name === countryOrCityName) {
                            countryName = responses['/countries'][i].name;
                        }
                    }

                    if (countryName !== '') {
                        for (i = 0; i < responses['/cities'].length; i++) {
                            if (responses['/cities'][i].country === countryName) {
                                cityNames.push(responses['/cities'][i].name);
                            }
                        }
                    } else {
                        for (i = 0; i < responses['/cities'].length; i++) {
                            if (responses['/cities'][i].name === countryOrCityName) {
                                cityNames.push(responses['/cities'][i].name);
                            }
                        }
                    }

                    if (cityNames.length === 0) {
                        console.log('We cant find any country or city with name: ' + countryOrCityName);
                        return;
                    }

                    for (i = 0; i < responses['/populations'].length; i++) {
                        for (j = 0; j < cityNames.length; j++) {
                            if (responses['/populations'][i].name === cityNames[j]) {
                                population += responses['/populations'][i].count;
                            }
                        }
                    }

                    if (countryName !== '') {
                        console.log('Total population in ' + countryName + ' cities ' + population);
                    } else {
                        if (cityNames.length === 1) {
                            console.log('Total population in ' + cityNames[0] + ' ' + population);
                        }
                    }
                }
            }
        };
    })(request, countryOrCityName);
    getData(request, calc);
}