import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';
import { useCountries } from '../hooks/queryies';
import { useDeleteCountry } from '../hooks/mutations';
import { Table, ConfirmDelete, Search } from '../../../components';
import Modal from './modal';
import { type TablePaginationConfig } from 'antd/lib';

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: '',
    page: 1,
    limit: 5,
  });
  const query = useCountries(params);
  const { data } = query;
  const countries = data?.data || []; // API: data → data[]
  const total = data?.total || 0; // API: total
  const { mutate } = useDeleteCountry();

  useEffect(() => {
    const pageFromParams = searchParams.get('page') || '1';
    const limitFromParams = searchParams.get('limit') || '5';
    const searchFromParams = searchParams.get('search') || '';
    setParams(prev => ({
      ...prev,
      page: Number(pageFromParams),
      limit: Number(limitFromParams),
      search: searchFromParams,
    }));
  }, [searchParams]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = pagination;
    setSearchParams({
      page: String(current),
      limit: String(pageSize),
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setUpdate(null);
  };

  const columns: ColumnsType = [
    {
      title: 'Name (EN)',
      dataIndex: 'title_en',
    },
    {
      title: 'Name (UZ)',
      dataIndex: 'title_uz',
    },
    {
      title: 'Name (RU)',
      dataIndex: 'title_ru',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          {/* <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
            />
          </Tooltip> */}
          <ConfirmDelete
            id={record.id}
            deleteItem={(id: string | number) => mutate(id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <Modal
          open={modalVisible}
          handleCancel={handleCancel}
          update={update}
        />
        <div className="flex justify-between p-">
          <Search params={params} setParams={setParams} />
          <Button
            type="primary"
            className="btn"
            onClick={() => setModalVisible(true)}
          >
            Add Category
          </Button>
        </div>
        <Table
          data={countries}
          columns={columns}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ['2', '5', '7', '10'],
          }}
          handleChange={handleTableChange}
        />
      </div>
    </>
  );
};

export default Index;
