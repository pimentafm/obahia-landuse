import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import HtmlParser from 'react-html-parser';

import { oba } from '../../services';

import { Modal, Popover, Button } from 'antd';

import OlMap from 'ol/Map';

import { Select } from 'antd';
import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

import ChangeLanguage from './ChangeLanguage';

import ToolsMenu from './ToolsMenu';
import ZoomControl from './ZoomControl';
import Scalebar from './ScaleBar';

import StaticLayerSwitcher from '../StaticLayerSwitcher';
import LayerSwitcher from '../LayerSwitcher';

import { Container, Header, Footer, Content } from './styles';

import { useTranslation } from 'react-i18next';

interface CodeNameData {
  code: number;
  name: string;
}

interface MenuProps {
  ishidden: number;
  defaultCategory: string;
  defaultCodeName?: CodeNameData;
  defaultWatershed?: string;
  defaultYear: number;
  handleWatershed?(year: string): void;
  handleCodeName?(codename: string): void;
  handleYear(year: number): void;
  map: OlMap;
}

const { Option } = Select;

const Menu: React.FC<MenuProps> = ({
  ishidden,
  defaultCategory,
  defaultCodeName,
  defaultWatershed,
  defaultYear,
  handleCodeName,
  handleWatershed,
  handleYear,
  map,
  ...rest
}) => {
  const { t } = useTranslation();
  document.title = t('appname');

  const [hidden, setHidden] = useState(ishidden);
  const [termsOfUseModal, setTermsOfUseModal] = useState<boolean>(false);
  const [metadataModal, setMetadataModal] = useState<boolean>(false);

  const history = useHistory();
  const [category, setCategory] = useState(defaultCategory);

  const [codenames, setCodenames] = useState([]);
  const [watersheds_list] = useState(['Grande', 'Corrente', 'Carinhanha']);

  const [downloadURL, setDownloadURL] = useState('');

  const termsOfUse = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> ${t(
      'modal_terms_title',
    )}</span>`,
  );

  const additionalInformation = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> ${t(
      'modal_info_title',
    )}</span>`,
  );

  const [categories, setCategories] = useState([
    [t('select_region'), 'regional'],
    [t('select_watershed'), 'gcc'],
    [t('select_drainage'), 'drainage'],
    [t('select_municipal'), 'counties'],
  ]);

  const [years] = useState(
    Array.from(new Array(29), (_, index) => index + 1990),
  );

  const showTermsOfUseModal = () => {
    setTermsOfUseModal(true);
  };

  const showMetadataModal = () => {
    setMetadataModal(true);
  };

  const handleOk = () => {
    setTermsOfUseModal(false);
    setMetadataModal(false);
  };

  const handleCancel = () => {
    setTermsOfUseModal(false);
    setMetadataModal(false);
  };

  const handleMenu = useCallback(() => {
    if (hidden === 0) {
      setHidden(1);
    } else {
      setHidden(0);
    }
  }, [hidden]);

  const handleCategory = useCallback(
    e => {
      setCategory(e);
      history.push(e);
    },
    [history],
  );

  const handleLayerVisibility = useCallback(
    (e, id) => {
      const lyr_name = id; //obj.target.name;

      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setVisible(e);
        }
      });
    },
    [map],
  );

  const handleLayerOpacity = useCallback(
    (opacity, lyr_name) => {
      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setOpacity(opacity);
        }
      });
    },
    [map],
  );

  let watershedsLabel = null;
  let watershedSelect = null;

  if (category === 'gcc') {
    watershedsLabel = <label>{t('label_name')}</label>;
    watershedSelect = (
      <Select
        id="select"
        defaultValue={defaultWatershed}
        onChange={handleWatershed}
        style={{ color: '#000' }}
      >
        {watersheds_list.map(c => (
          <Option key={c} value={c} style={{ color: '#000' }}>
            {c}
          </Option>
        ))}
      </Select>
    );
  } else {
    watershedSelect = null;
  }

  let codeNameLabel = null;
  let codeNameSelect = null;

  if (category === 'drainage' || category === 'counties') {
    codeNameLabel = <label>{t('label_name')}</label>;
    codeNameSelect = (
      <Select
        id="select"
        defaultValue={defaultCodeName?.name}
        onChange={handleCodeName}
      >
        {codenames.map(c => (
          <Option key={c} value={c} style={{ color: '#000' }}>
            {c}
          </Option>
        ))}
      </Select>
    );
  } else {
    codeNameSelect = null;
  }

  useEffect(() => {
    oba
      .post('geom/', {
        table_name: category === 'counties' ? 'counties' : 'drainage',
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(response => {
        const data = response.data;

        const names = data.map((n: CodeNameData) => n.name);
        const codes = data.map((c: CodeNameData) => c.code);

        const codenames = names.map(
          (n: string, c: number) => n + ' - ' + codes[c],
        );
        setCodenames(codenames);
      })
      .catch(e => {
        throw new Error('Do not load codenames');
      });

    switch (category) {
      case 'regional':
        setDownloadURL(
          `ftp://obahia.dea.ufv.br/landuse/region/landuse${defaultYear}.tif`,
        );
        break;
      case 'gcc':
        setDownloadURL(
          `ftp://obahia.dea.ufv.br/landuse/gcc/${defaultWatershed?.toLowerCase()}/landuse${defaultYear}.tif`,
        );
        break;
      case 'drainage':
        setDownloadURL(
          `ftp://obahia.dea.ufv.br/landuse/drainage/${defaultCodeName?.code}/landuse_${defaultCodeName?.code}_${defaultYear}.tif`,
        );
        break;
      case 'counties':
        setDownloadURL(
          `ftp://obahia.dea.ufv.br/landuse/counties/landuse_${defaultCodeName?.code}_${defaultYear}.tif`,
        );
        break;
    }

    setCategories([
      [t('select_region'), '/'],
      [t('select_watershed'), 'gcc'],
      [t('select_drainage'), 'drainage'],
      [t('select_municipal'), 'counties'],
    ]);
  }, [
    category,
    defaultYear,
    defaultCategory,
    defaultWatershed,
    defaultCodeName,
    t,
  ]);

  return (
    <Container id="menu" ishidden={hidden}>
      <ChangeLanguage ishidden={hidden} />
      <ToolsMenu ishidden={hidden} />
      <ZoomControl ishidden={hidden} map={map} />
      <Scalebar id="scalebar" map={map} />

      <Header ishidden={hidden}>
        <a href="http://obahia.dea.ufv.br">
          <img
            src="http://obahia.dea.ufv.br/static/geonode/img/logo.png"
            alt="Obahia"
          />
        </a>

        <Popover placement="right" content={t('tooltip_menu')}>
          <FiMenu
            id="handleMenu"
            type="menu"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleMenu}
          />
        </Popover>
      </Header>

      <Content>
        <div className="card-menu">
          <span>{t('appname')}</span>
        </div>

        <div className="static-layers">
          <span className="span-text">
            <label>{t('description_title')}</label> {t('description_content')}{' '}
            <FaInfoCircle
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showMetadataModal}
            />
            . {t('description_terms')}{' '}
            <GoAlert
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showTermsOfUseModal}
            />
            .
          </span>
        </div>

        <label>{t('label_level')}</label>
        <Select
          id="select-category"
          defaultValue={category}
          onChange={handleCategory}
        >
          {categories.map(c => (
            <Option key={c[1]} value={c[1]}>
              {c[0]}
            </Option>
          ))}
        </Select>

        {watershedsLabel}
        {watershedSelect}

        {codeNameLabel}
        {codeNameSelect}

        <label>{t('label_year')}</label>
        <Select
          id="select-year"
          defaultValue={defaultYear}
          onChange={handleYear}
          style={{ color: '#000' }}
        >
          {years.map(y => (
            <Option key={y} value={y} style={{ color: '#000' }}>
              {y}
            </Option>
          ))}
        </Select>

        <LayerSwitcher
          name="landuse"
          label={t('label_landuse')}
          handleLayerOpacity={handleLayerOpacity}
          handleLayerVisibility={handleLayerVisibility}
          layerIsVisible={true}
          legendIsVisible={true}
          layerInfoIsVisible={true}
          switchColor="#1f5582"
          downloadURL={downloadURL}
        />

        <div className="static-layers">
          <StaticLayerSwitcher
            name="hidrography"
            label={t('label_hidrography')}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#0000ff"
          />
          <StaticLayerSwitcher
            name="highways"
            label={t('label_highways')}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#800000"
          />

          {category === 'regional' && (
            <>
              <StaticLayerSwitcher
                name="watersheds"
                label={t('label_watersheds')}
                handleLayerVisibility={handleLayerVisibility}
                layerIsVisible={true}
                legendIsVisible={false}
                layerInfoIsVisible={false}
                switchColor="#000000"
              />
              <StaticLayerSwitcher
                name="counties"
                label={t('label_counties')}
                handleLayerVisibility={handleLayerVisibility}
                layerIsVisible={false}
                legendIsVisible={false}
                layerInfoIsVisible={false}
                switchColor="#696969"
              />
            </>
          )}
        </div>
        <div className="final-space"></div>
      </Content>

      <Footer ishidden={hidden}>
        <Popover placement="right" content={t('tooltip_terms')}>
          <GoAlert
            className="footer_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showTermsOfUseModal}
          />
        </Popover>
        <Popover placement="right" content={t('tooltip_info')}>
          <FaInfoCircle
            className="footer_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showMetadataModal}
          />
        </Popover>
      </Footer>

      <Modal
        title={termsOfUse}
        style={{ top: 20 }}
        visible={termsOfUseModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            style={{
              background: '#1f5582',
              color: '#fff',
              borderColor: '#fff',
            }}
            onClick={handleOk}
          >
            Continue
          </Button>,
        ]}
      >
        <p style={{ textAlign: 'justify' }}>{t('terms_of_use')}</p>
      </Modal>

      <Modal
        title={additionalInformation}
        width={800}
        style={{ top: 20 }}
        visible={metadataModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            style={{
              background: '#1f5582',
              color: '#fff',
              borderColor: '#fff',
            }}
            onClick={handleOk}
          >
            Continue
          </Button>,
        ]}
      >
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph01')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph02')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph03')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph04')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph05')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph06')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph07')}</p>
      </Modal>
    </Container>
  );
};

export default Menu;
