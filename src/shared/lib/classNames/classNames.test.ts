import { classNames } from "./classNames";

describe('shared/classNames', () => {
    test('With only first param', () => {
        expect(classNames('simpleClass')).toBe('simpleClass');
    });
    test('With mods', () => {
        expect(classNames('simpleClass', {'mod1': true, 'mod2': false})).toBe('simpleClass mod1');
    });
    test('With additioanl param', () => {
        expect(classNames('simpleClass', {}, ['additional'])).toBe('simpleClass additional');
    });
    test('With all params', () => {
        expect(classNames(
            'simpleClass',
            {'mod1': true, 'mod2': false},
            ['additional1', 'additioanl2'])
        ).toBe('simpleClass additional1 additioanl2 mod1');
    });
})