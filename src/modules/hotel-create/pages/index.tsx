import { Button, Form, Input, Select, Typography, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CustomEditor from './CustomEditor';
import { Link, useNavigate } from 'react-router-dom';
import { useCountries } from '../../countries/hooks/queryies';
import { useCreateHotel } from '../../hotel/hooks/mutation';


const Index = () => {
    const [form] = useForm();
    const navigate = useNavigate()
    const [descriptions, setDescriptions] = useState({
        text_uz: "",
        text_en: "",
        text_ru: "",
        text_tr: "",
      });
    const { mutate: createMutate, isPending: isCreating } = useCreateHotel();
    const { data: countries } = useCountries({ page: 1, limit: 10 });

    const handleChange = (lang:any, value:any) => {
        setDescriptions((prev) => ({
          ...prev,
          [lang]: value.target.value,
        }));
      };
  
    const [fileList, setFileList] = useState<any[]>([]);
  
    const handleSubmit = (values: any) => {
      const formData = new FormData();

      // Basic fields
      formData.append('name_uz', values.name_uz);
      formData.append('name_en', values.name_en);
      formData.append('name_ru', values.name_ru);
      formData.append('name_tr', values.name_tr);
      formData.append('address', values.address);
      formData.append('rating', values.rating);
      if (values.country_id !== undefined && values.country_id !== null) {
        formData.append('country_id', String(values.country_id));
      }

      // Rich text descriptions
      formData.append('text_uz', descriptions.text_uz ?? '');
      formData.append('text_en', descriptions.text_en ?? '');
      formData.append('text_ru', descriptions.text_ru ?? '');
      formData.append('text_tr', descriptions.text_tr ?? '');

      // Multiple images
      fileList.forEach((file: any) => {
        if (file?.originFileObj) {
          formData.append('images', file.originFileObj as File);
          // If backend expects an array key, use: formData.append('images[]', file.originFileObj as File);
        }
      });

      createMutate(formData as any, {
        onSuccess: () => {
          navigate("/admin-layout/hotel")
        }
      });
    };
    return (
        <>
        <Link to={'/admin-layout/hotel'}>
            <Button>Back</Button>
        </Link>
        <Typography.Title className='mt-2' level={2}>Mehmonxona paket yaratish</Typography.Title>
        <Form
            form={form}
            name="memberForm"
            layout="vertical"
            onFinish={handleSubmit}
            style={{ width: '100%', marginTop: 20 }}
      >
        <div className='grid grid-cols-2 gap-8'>
            <Form.Item
            label="Name (UZ)"
            name="name_uz"
            rules={[{ required: true, message: 'Enter name in Uzbek' }]}
            >
                <Input size="large" />
            </Form.Item>

            <Form.Item
            label="Name (EN)"
            name="name_en"
            rules={[{ required: true, message: 'Enter name in English' }]}
            >
                <Input size="large" />
            </Form.Item>
        </div>
        <div className='grid grid-cols-2 gap-8'>
            <Form.Item
            label="Name (Ru)"
            name="name_ru"
            rules={[{ required: true, message: 'Enter name in Russian' }]}
            >
            <Input size="large" />
            </Form.Item>
            <Form.Item
            label="Name (Tr)"
            name="name_tr"
            rules={[{ required: true, message: 'Enter name in Turk' }]}
            >
            <Input size="large" />
            </Form.Item>
        </div>
        <div className='grid grid-cols-2 gap-8'>
            <div className='flex flex-col'>
                Description (Uz)
                <CustomEditor value={descriptions.text_uz} onChange={(val:any) => handleChange("text_uz", val)} />
            </div>
            <div className='flex flex-col'>
                Description (En)
                <CustomEditor value={descriptions.text_en} onChange={(val:any) => handleChange("text_en", val)} />
            </div>
        </div>
        <div className='grid grid-cols-2 gap-8 mt-4'>
            <div className='flex flex-col'>
                Description (Ru)
                <CustomEditor value={descriptions.text_ru} onChange={(val:any) => handleChange("text_ru", val)} />
            </div>
            <div className='flex flex-col'>
                Description (Tr)
                <CustomEditor value={descriptions.text_tr} onChange={(val:any) => handleChange("text_tr", val)} />
            </div>
        </div>

        {/* Country */}
        <div className='grid grid-cols-3 gap-4 mt-4'>
          <Form.Item
            label="Country"
            name="country_id"
            rules={[{ required: true, message: 'Select country' }]}
          >
            <Select size="large" placeholder="Select cities">
              {countries?.data?.map((c: any) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.title_en}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Enter name in Address' }]}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
            label="Narxi"
            name="rating"
            rules={[{ required: true, message: 'Enter name in Price' }]}
            >
                <Input type='number' size="large" />
            </Form.Item>
        </div>

        {/* Upload */}
        <Form.Item
          label="Images"
          rules={[{ required:false, message: 'Upload at least one image' }]}
        >
          <Upload
            listType="picture"
            multiple={true}
            accept="image/*"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
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
            loading={isCreating}
          >
            Create hotel
          </Button>
        </Form.Item>
        </Form>
        </>
    );
}

export default Index;
