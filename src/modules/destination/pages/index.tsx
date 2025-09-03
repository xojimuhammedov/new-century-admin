import { useEffect, useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Table, ConfirmDelete, Search } from '../../../components';
import { type TablePaginationConfig } from 'antd/lib';
import { useDeleteDestination } from '../hooks/mutation';
import { useDestination } from '../hooks/queryies';

const Index = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: '',
    page: 1,
    limit: 100,
  });
  const query = useDestination(params);
  const { data } = query;
  const countries = data?.data || []; // API: data → data[]
  const total = data?.total || 0; // API: total
  const { mutate } = useDeleteDestination();

  useEffect(() => {
    const pageFromParams = searchParams.get('page') || '1';
    const limitFromParams = searchParams.get('limit') || '100';
    const searchFromParams = searchParams.get('keyword') || '';
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

  const columns: ColumnsType = [
    {
      title: 'Name (Uz)',
      dataIndex: 'title_uz',
    },
    {
      title: 'Name (En)',
      dataIndex: 'title_en',
    },
    {
      title: 'Name (Ru)',
      dataIndex: 'title_ru',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <ConfirmDelete
            id={record.id}
            deleteItem={(id: string | number) => {
              mutate(id)
            }}
          />
          <Tooltip title="Sub-category"></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between p-">
          <Search params={params} setParams={setParams} />
          <Button
            type="primary"
            className="btn"
            onClick={() => navigate('/admin-layout/destination-create')}
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
            pageSizeOptions: ['2', '5', '10', '25', '50', '100'],
          }}
          handleChange={handleTableChange}
        />
      </div>
    </>
  );
};

export default Index;
