import { Button, Form, Input, Modal, Upload, Image } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { type ModalPropType } from '../../../types';
import { useCreateCountry, useUpdateCountry } from '../hooks/mutations';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const ModalComponent = ({ open, handleCancel, update }: ModalPropType) => {
  const [form] = useForm();
  const { mutate: createMutate, isPending: isCreating } = useCreateCountry();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateCountry();

  useEffect(() => {
    if (open && update) {
      form.setFieldsValue({
        title_uz: update.title_uz,
        title_en: update.title_en,
        title_ru: update.title_ru,
        title_tr: update.title_tr,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, update, form]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append('title_uz', values.title_uz);
    formData.append('title_en', values.title_en);
    formData.append('title_ru', values.title_ru);
    formData.append('title_tr', values.title_tr);

    if (fileList[0]?.originFileObj) {
      formData.append('images', fileList[0].originFileObj as File);
    }

    if (update) {
      updateMutate(
        { id: update.id, formData },
        {
          onSuccess: () => handleCancel(),
        }
      );
    } else {
      createMutate(formData as any, {
        onSuccess: () => handleCancel(),
      });
    }
  };

  return (
    <Modal
      open={open}
      title={update ? 'Edit Country' : 'Add Country'}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        name="countryForm"
        style={{ width: '100%', marginTop: '20px' }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Name (UZ)"
          name="title_uz"
          rules={[{ required: true, message: 'Enter name in Uzbek' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Name (EN)"
          name="title_en"
          rules={[{ required: true, message: 'Enter name in English' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Name (Ru)"
          name="title_ru"
          rules={[{ required: true, message: 'Enter name in Russian' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Name (Tr)"
          name="title_tr"
          rules={[{ required: true, message: 'Enter name in Turk' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item label="Upload Image" name="file">
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
            accept="image/*"
            maxCount={1}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: visible => setPreviewOpen(visible),
              afterOpenChange: visible => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}

        <Form.Item>
          <Button
            size="large"
            style={{ width: '100%' }}
            type="primary"
            className="btn"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {update ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
