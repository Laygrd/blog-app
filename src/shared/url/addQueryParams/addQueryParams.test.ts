import { getQueryParams } from './addQueryParams'

describe('addQueryParams.test', () => {

    test('getQueryParams With only 1 param', () => {
        const params = {
            param1: 'value1'
        }
        expect(getQueryParams(params)).toBe('?param1=value1');
    });

    test('getQueryParams With 2 params', () => {
        const params = {
            param1: 'value1',
            param2: 'value2'
        }
        expect(getQueryParams(params)).toBe('?param1=value1&param2=value2');
    });
    test('getQueryParams With undefined param', () => {
        const params = {
            param1: 'value1',
            param2: undefined
        }
        expect(getQueryParams(params)).toBe('?param1=value1');
    });



})