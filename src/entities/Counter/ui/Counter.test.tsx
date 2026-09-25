import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from "./Counter";
import userEvent from '@testing-library/user-event';

describe('widgets/Counter', () => {
    test('default render', () => {
        componentRender(<Counter />)
        expect(screen.getByTestId('counter')).toBeInTheDocument();
    });
    test('counter contain value', () => {
        componentRender(<Counter />,
            { 
                initialState: { counter: { value: 10}}
            }
        );
        expect(screen.getByTestId('counter-value')).toHaveTextContent('Counter.count10');
    });
    test('counter decrement button click', () => {
        componentRender(<Counter />,
            { 
                initialState: { counter: { value: 10}}
            }
        );
        userEvent.click(screen.getByTestId('decrement-btn'));
        expect(screen.getByTestId('counter-value')).toHaveTextContent('Counter.count10');
    });
    test('counter increment button click', () => {
        componentRender(<Counter />,
            { 
                initialState: { counter: { value: 10}}
            }
        );
        userEvent.click(screen.getByTestId('increment-btn'));
        expect(screen.getByTestId('counter-value')).toHaveTextContent('Counter.count10');
    });
    test('counter empty state check', () => {
        componentRender(<Counter />);
        expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
    });
})