import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { type ModalPropType } from '../../../types';
import { useCreateMembers, useUpdateMembers } from '../hooks/mutations';
import { useCountries } from '../../countries/hooks/queryies';
const { TextArea } = Input;

const ModalComponent = ({ open, handleCancel, update }: ModalPropType) => {
  const [form] = useForm();
  const { mutate: createMutate, isPending: isCreating } = useCreateMembers();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateMembers();
  const { data: countries } = useCountries({ page: 1, limit: 10 });

  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (open && update) {
      form.setFieldsValue({
        title_uz: update.title_uz,
        title_en: update.title_en,
        title_ru: update.title_ru,
        title_tr: update.title_tr,
        country_id: update.country_id,
      });
      if (update.image) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: update.image,
          },
        ]);
      }
    } else if (open) {
      form.resetFields();
      setFileList([]);
    }
  }, [open, update, form]);

  const handleSubmit = (values: any) => {
    if (!fileList.length && !update) {
      return alert('Please select an image');
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value as string)
    );
    if (fileList[0]?.originFileObj) {
      formData.append('images', fileList[0].originFileObj);
    }

    if (update) {
      updateMutate(
        { id: update.id, formData },
        { onSuccess: () => handleCancel() }
      );
    } else {
      createMutate(formData as any, { onSuccess: () => handleCancel() });
    }
  };

  return (
    <Modal
      open={open}
      title={update ? 'Edit tours and cities' : 'Add tours and cities'}
      onCancel={handleCancel}
      footer={null}
      centered={true}
    >
      <Form
        form={form}
        name="memberForm"
        layout="vertical"
        onFinish={handleSubmit}
        style={{ width: '100%', marginTop: 20 }}
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

        {/* Country */}
        <Form.Item
          label="Country"
          name="country_id"
          rules={[{ required: true, message: 'Select country' }]}
        >
          <Select size="large" placeholder="Select country">
            {countries?.data?.map((c: any) => (
              <Select.Option key={c.id} value={c.id}>
                {c.title_en}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Upload */}
        <Form.Item
          label="Image"
          rules={[{ required: !update, message: 'Upload image' }]}
        >
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
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
