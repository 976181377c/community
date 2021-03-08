import { Modal, ModalProps } from "antd";
import { useState, cloneElement, ReactElement } from "react";
interface props {
  children: ReactElement;
  content: ReactElement;
  /** 确定事件  */
  success?: (closeModel: Function) => void;
  modalProps: ModalProps;
}
export default ({ content, children, success, modalProps }: props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };
  const onOk = () => {
    if (success) {
      success(close);
    }
  };
  return (
    <>
      {cloneElement(children, { onClick: show })}
      <Modal
        visible={visible}
        onCancel={close}
        maskClosable={false}
        onOk={onOk}
        {...modalProps}
      >
        {cloneElement(content, { close: close })}
      </Modal>
    </>
  );
};
