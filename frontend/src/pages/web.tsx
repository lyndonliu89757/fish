/* eslint-disable react/no-unknown-property */
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { Input, Slider } from 'antd';
import { useRef, useState } from 'react';
import './web.less';

const trueAsStr = 'true' as any;

export default () => {
  const [settingInfo, setSettingInfo] = useState<any>({ visible: true });
  const ifrRef = useRef<any>(null);

  function toggleSetting() {
    setSettingInfo((origin: any) => ({ ...origin, visible: !origin.visible }));
  }

  return (
    <div className="container">
      <div className="toggle" onClick={toggleSetting}></div>

      <div className="control" style={{ display: settingInfo.visible ? 'block' : 'none' }}>
        <div className="drag"></div>

        <div className="setting">
          <Input.Search
            defaultValue="https://weread.qq.com"
            onSearch={(val) => {
              if (!val) return;
              setSettingInfo((origin: any) => ({ ...origin, url: val }));
            }}
            placeholder="URL"
            size="small"
            allowClear
          />
          <Slider
            min={0.1}
            max={1}
            step={0.1}
            defaultValue={1}
            onChangeComplete={(value) => {
              ipc.send(ipcApiRoute.setOpacity, { value });
            }}
          />
        </div>
      </div>

      {settingInfo.url && (
        <webview
          ref={ifrRef}
          className="ifr"
          src={settingInfo.url}
          plugins={trueAsStr}
          useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
        ></webview>
      )}
    </div>
  );
};
