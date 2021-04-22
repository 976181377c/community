import { useState, useEffect } from "react";
import { Button, Image, message, Space } from "antd";
import { image, MyModel, _http, _tools } from "@components";
import { CloudUploadOutlined } from "@ant-design/icons";
import MyUpload from "./upload";
export default () => {
  const [data, setdata] = useState<image[]>([]);

  const getData = async () => {
    try {
      const res = await _http.get(`/getAlbun?uid=${_tools.getUid()}`, null);
      setdata(res);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div>
        <MyModel
          content={
            <div>
              <MyUpload />
            </div>
          }
          modalProps={{
            title: "图片上传",
            footer: null,
          }}
        >
          <Button
            type={"primary"}
            icon={<CloudUploadOutlined />}
            className={"upload-button"}
          >
            上传
          </Button>
        </MyModel>
      </div>
      <br />
      <div className={"center-card-albun"}>
        <Image.PreviewGroup>
          <Space size={[16, 8]} wrap>
            {data?.map((item) => {
              return (
                <Image
                  key={item.id}
                  className={"center-card-albun-image"}
                  height={180}
                  width={180}
                  style={{ objectFit: "cover" }}
                  fallback={_tools.badImage}
                  src={`${_tools.imgUrl + item.address}`}
                />
              );
            })}
          </Space>
        </Image.PreviewGroup>
      </div>
    </div>
  );
};
