import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import { counterActions } from "../model/slice/counterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import cls from "./Counter.module.scss";


interface CounterProps {
    className?: string;
}

export const Counter = ({ className }: CounterProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const increment = () => {
        dispatch(counterActions.increment());
    };
    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    const count = useSelector(getCounterValue);

    return (
        <div 
            className={ classNames(cls.Counter, {}, [className]) }
            data-testid="counter"
        >
            <span>{t('Counter.title')}</span>
            <div 
                className={cls.result}
                data-testid="counter-value"
            >
                {t('Counter.count')}
                {count}
            </div>
            <div className={cls.btns}>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={decrement}
                    data-testid="decrement-btn"
                >
                    {t('Counter.decrementBtn')}
                </Button>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={increment}
                    data-testid="increment-btn"
                >
                    {t('Counter.incrementBtn')}
                </Button>
            </div>
        </div>
    );
};
