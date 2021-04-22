import { _tools } from "@components";
import { Upload } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export default () => {
  const [fileList, setfileList] = useState<any>([]);
  // const handleChange = (fileList: any) => {
  //   console.log(fileList);
  // };
  const handleChange = ({ fileList }: any) => {
    fileList?.map((item: any) => {
      item.url = _tools.imgUrl + item.name;
    });
    setfileList(fileList);
  };
  return (
    <div>
      <Upload
        action="http://119.29.79.248:8080/image/upload"
        listType="picture-card"
        data={{ uid: _tools.getUid() }}
        fileList={fileList}
        // onPreview={this.handlePreview}
        onChange={handleChange}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>上传</div>
        </div>
        );
      </Upload>
    </div>
  );
};
