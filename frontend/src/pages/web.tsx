/* eslint-disable react/no-unknown-property */
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { HomeOutlined, RedoOutlined, ReloadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Button, Input, Slider, Space } from 'antd';
import { useRef, useState } from 'react';
import './web.less';

const trueAsStr = 'true' as any;

export default () => {
  const [settingInfo, setSettingInfo] = useState<any>({ visible: true });
  const [cssKey, setCssKey] = useState<any>();
  const ifrRef = useRef<any>(null);

  function toggleSetting() {
    setSettingInfo((origin: any) => ({ ...origin, visible: !origin.visible }));
  }

  function goHome() {
    setSettingInfo((origin: any) => ({ ...origin, url: '' }));
    ifrRef.current?.loadURL('data:text/plain');
  }
  function reload() {
    // https://www.electronjs.org/zh/docs/latest/api/webview-tag
    ifrRef.current?.reload();
  }

  return (
    <div className="container">
      <div className="toggle" onClick={toggleSetting}></div>

      <div className="control" style={{ display: settingInfo.visible ? 'block' : 'none' }}>
        <div className="drag"></div>

        <div className="setting">
          <Space direction="horizontal">
            <Button size="small" icon={<HomeOutlined />} onClick={goHome} />
            <Button size="small" icon={<ReloadOutlined />} onClick={reload} />
            <Input.Search
              size="small"
              style={{ width: 230 }}
              defaultValue="https://weread.qq.com"
              onSearch={(val) => {
                if (!val) {
                  goHome();
                  return;
                }
                let url = val.trim();
                if (!url.startsWith('http')) {
                  url = 'https://' + url;
                }
                if (settingInfo.url === url) {
                  reload();
                  return;
                }
                setSettingInfo((origin: any) => ({ ...origin, url }));
              }}
              placeholder="URL"
              allowClear
            />
          </Space>
          <Slider
            min={0.1}
            max={1}
            step={0.1}
            defaultValue={1}
            onChangeComplete={(value) => {
              ipc.send(ipcApiRoute.setOpacity, { value });
            }}
          />
          <Space direction="horizontal">
            <Button
              size="small"
              icon={<ZoomInOutlined />}
              onClick={() => {
                if (!ifrRef.current) return;
                const zoomFactor = ifrRef.current!.getZoomFactor();
                ifrRef.current!.setZoomFactor(zoomFactor + 0.1);
              }}
            />
            <Button
              size="small"
              icon={<RedoOutlined />}
              onClick={() => {
                if (!ifrRef.current) return;
                ifrRef.current!.setZoomFactor(1);
              }}
            />
            <Button
              size="small"
              icon={<ZoomOutOutlined />}
              onClick={() => {
                if (!ifrRef.current) return;
                const zoomFactor = ifrRef.current!.getZoomFactor();
                ifrRef.current!.setZoomFactor(zoomFactor - 0.1);
              }}
            />
            <Button
              size="small"
              onClick={() => {
                if (!ifrRef.current) return;
                if (cssKey) {
                  ifrRef.current!.removeInsertedCSS(cssKey);
                  setCssKey(undefined);
                } else {
                  ifrRef.current!.insertCSS('::-webkit-scrollbar { display:none; }').then((key: any) => setCssKey(key));
                }
              }}
            >
              {(!!cssKey ? '显示' : '隐藏') + '滚动条'}
            </Button>
          </Space>
        </div>
      </div>

      {settingInfo.url && (
        <webview
          ref={ifrRef}
          className="ifr"
          src={settingInfo.url}
          plugins={trueAsStr}
          useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
          allowpopups
        ></webview>
      )}
    </div>
  );
};
