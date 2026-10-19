import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button/Button";


// ONLY FOR TESTING. REMOVE BEFORE PRODUCTION BUILD!
export const BugButton = () => {
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const doError = () => {
        setError(true)
    };

    useEffect(() => {
        if (error) {
            throw new Error('Sintetic error for testing')
        };
    }, [error])

    return (
        <Button
            onClick={doError}
        >
            {t('BugButton.text')}
        </Button>
    );
};
