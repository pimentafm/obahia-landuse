import React, { useState, useCallback } from 'react';

import { Popover } from 'antd';

import i18n from '../../../i18n';

import { Container } from './styles';

import ReactCountryFlag from 'react-country-flag';

import { useTranslation } from 'react-i18next';

interface ChangeLanguageProps {
  ishidden: number;
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({ ishidden }) => {
  const { t } = useTranslation();
  const [flag, setFlag] = useState('US');

  const handleLanguage = useCallback(locale => {
    i18n.changeLanguage(locale);
  }, []);

  const handleFlag = useCallback(() => {
    if (flag === 'US') {
      setFlag('BR');
      handleLanguage('en');
    } else {
      setFlag('US');
      handleLanguage('pt');
    }
  }, [flag, handleLanguage]);

  return (
    <Container ishidden={ishidden}>
      <Popover placement="right" content={t('language_menu')}>
        <ReactCountryFlag
          countryCode={flag}
          svg
          onClick={handleFlag}
          style={{
            fontSize: '25px',
            cursor: 'pointer',
          }}
        />
      </Popover>
    </Container>
  );
};

export default ChangeLanguage;
