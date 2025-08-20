import { Button, Form, Input, Select, Typography, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useCitiesList } from '../../tours/hooks/queryies';
import { useCreateSubtours } from '../../subtours/hooks/mutation';
import CustomEditor from './CustomEditor';
import { Link, useNavigate } from 'react-router-dom';


const Index = () => {
    const [form] = useForm();
    const navigate = useNavigate()
    const [descriptions, setDescriptions] = useState({
        text_uz: "my <b>HTML</b>",
        text_en: "",
        text_ru: "",
        text_tr: "",
      });
    const { mutate: createMutate, isPending: isCreating } = useCreateSubtours();
    // const { mutate: updateMutate, isPending: isUpdating } = useUpdateMembers();
    const { data: cities } = useCitiesList({ page: 1, limit: 10 });

    const handleChange = (lang:any, value:any) => {
        setDescriptions((prev) => ({
          ...prev,
          [lang]: value.target.value,
        }));
      };

      const [days, setDays] = useState([
        { en: "", uz: "", ru: "", tr: "" },
      ]);
    
    const handleChangeDay = (index:any, lang:any, value:any) => {
        setDays((prev) =>
          prev.map((day, i) =>
            i === index ? { ...day, [lang]: value } : day
          )
        );
    };
    
    const addDay = () => {
        setDays((prev) => [...prev, { en: "", uz: "", ru: "", tr: "" }]);
    };

    const removeDay = (index:any) => {
        setDays((prev) => prev.filter((_, i) => i !== index));
    };
  
    const [fileList, setFileList] = useState<any[]>([]);
  
    const handleSubmit = (values: any) => {
      const formData = new FormData();

      // Basic fields
      formData.append('name_uz', values.name_uz);
      formData.append('name_en', values.name_en);
      formData.append('name_ru', values.name_ru);
      formData.append('name_tr', values.name_tr);
      if (values.city_id !== undefined && values.city_id !== null) {
        formData.append('city_id', String(values.city_id));
      }

      // Rich text descriptions
      formData.append('text_uz', descriptions.text_uz ?? '');
      formData.append('text_en', descriptions.text_en ?? '');
      formData.append('text_ru', descriptions.text_ru ?? '');
      formData.append('text_tr', descriptions.text_tr ?? '');

      // Days array as JSON
      formData.append('days', JSON.stringify(days));

      // Multiple images
      fileList.forEach((file: any) => {
        if (file?.originFileObj) {
          formData.append('images', file.originFileObj as File);
          // If backend expects an array key, use: formData.append('images[]', file.originFileObj as File);
        }
      });

      createMutate(formData as any, {
        onSuccess: () => {
          navigate("/admin-layout/events")
        }
      });
    };
    return (
        <>
         <Link to={'/admin-layout/events'}>
            <Button>Back</Button>
        </Link>
        <Typography.Title className='mt-2' level={2}>Tour paket yaratish</Typography.Title>
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

        <div className="space-y-6 mt-8">
            {days.map((day, index) => (
                <div key={index} className="border p-4">
                <div className="grid grid-cols-2 gap-4">
                    <textarea
                      placeholder="English"
                      value={day.en}
                      onChange={(e:any) => handleChangeDay(index, "en", e.target.value)}
                      className="border p-2 rounded"
                    />
                    <textarea
                      placeholder="Uzbek"
                      value={day.uz}
                      onChange={(e:any) => handleChangeDay(index, "uz", e.target.value)}
                      className="border p-2 rounded"
                    />
                    <textarea
                      placeholder="Russian"
                      value={day.ru}
                      onChange={(e:any) => handleChangeDay(index, "ru", e.target.value)}
                      className="border p-2 rounded"
                    />
                    <textarea
                      placeholder="Turkish"
                      value={day.tr}
                      onChange={(e:any) => handleChangeDay(index, "tr", e.target.value)}
                      className="border p-2 rounded"
                    />
                </div>
                <Button
                    color="danger" variant="solid"
                    onClick={() => removeDay(index)}
                    className="text-red-500 cursor-pointer mt-2"
                >
                    Remove
                </Button>
                </div>
            ))}

            <Button
                type="primary"
                onClick={addDay}
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
            >
                + Add Day
            </Button>

            {/* <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(days, null, 2)}
            </pre> */}
        </div>

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
