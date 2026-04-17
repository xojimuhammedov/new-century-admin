import { Button, Form, Input, Select, Typography, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useCitiesList } from '../../tours/hooks/queryies';
import CustomEditor from './CustomEditor';
import { Link, useNavigate } from 'react-router-dom';
import { useCountries } from '../../countries/hooks/queryies';
import { useCreateDestination } from '../../destination/hooks/mutation';


const Index = () => {
    const [form] = useForm();
    const navigate = useNavigate()
    const [descriptions, setDescriptions] = useState({
        text_uz: "my <b>HTML</b>",
        text_en: "",
        text_ru: "",
        text_tr: "",
      });
    const { mutate: createMutate, isPending: isCreating } = useCreateDestination();
    const { data: cities } = useCitiesList({ page: 1, limit: 100 });
    const { data: countries } = useCountries({ page: 1, limit: 100 });

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
      formData.append('title_uz', values.title_uz);
      formData.append('title_en', values.title_en);
      formData.append('title_ru', values.title_ru);
      formData.append('title_tr', values.title_tr);
      if (values.city_id !== undefined && values.city_id !== null) {
        formData.append('city_id', String(values.city_id));
      }

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
        }
      });

      createMutate(formData as any, {
        onSuccess: () => {
          navigate("/admin-layout/destination")
        }
      });
    };
    return (
        <>
         <Link to={'/admin-layout/destination'}>
            <Button>Back</Button>
        </Link>
        <Typography.Title className='mt-2' level={2}>Destination paket yaratish</Typography.Title>
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
        </div>
        <div className='grid grid-cols-2 gap-8'>
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

        <Form.Item
          label="Country"
          name="country_id"
          rules={[{ required: true, message: 'Select countries' }]}
        >
          <Select size="large" placeholder="Select countries">
            {countries?.data?.map((c: any) => (
              <Select.Option key={c.id} value={c.id}>
                {c?.title_en}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Country */}
        <Form.Item
          label="Cities"
          name="city_id"
          rules={[{ required: true, message: 'Select cities' }]}
        >
          <Select size="large" placeholder="Select cities">
            {cities?.data?.map((c: any) => (
              <Select.Option key={c.id} value={c.id}>
                {c.title_en}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

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
            Create tour
          </Button>
        </Form.Item>
        </Form>
        </>
    );
}

export default Index;
