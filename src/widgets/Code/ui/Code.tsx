import { memo, useCallback, useRef, useState } from 'react';
import { Icon, IconTheme } from '@/shared/ui/Icon/Icon';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import CopySuccessIcon from '@/shared/assets/icons/copy-success-icon.svg';
import cls from './Code.module.scss';


interface CodeProps {
   className?: string;
   text: string;
}

export const Code = memo((props: CodeProps) => {
    const {
        className,
        text,
    } = props;
    const [isCopy, setIsCopy] = useState(false); // for copyIcon animation
    const timerRef = useRef<ReturnType<typeof setTimeout>>(); // for copyIcon animation

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
        setIsCopy(true);
        timerRef.current = setTimeout(() => setIsCopy(false), 1000)
    }, [text])

    return (
        <div className={classNames(cls.Code, {}, [className])}>
            <pre>
                <code className={cls.codeContent}>
                    {text}
                </code>
            </pre>
            <Button
                className={cls.copyBtn}
                onClick={onCopy}
                theme={ButtonTheme.ICON}
            >
                <Icon 
                    theme={IconTheme.PIRMARY} 
                    Svg={ isCopy ? CopySuccessIcon : CopyIcon }
                    excludeFill
                />
            </Button>
        </div>
    );
});
