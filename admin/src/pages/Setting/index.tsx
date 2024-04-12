import { useEffect, useState } from "react";
import { PAGE_LIMIT, PAGE_SIZE } from "@configs/index";
import { InitalState } from "@typings/datatable";
import { API, ITEM_NAME, SEARCH_COLUMNS, SettingState, TYPES, REQUIRES } from "./constant";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Table, Row, Col, Space, Card, Button, Tooltip, message, Dropdown, Checkbox, MenuProps } from "antd";
import { Helmet } from "react-helmet";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { convertFilter } from "@utils";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { initTable, toggleColumnHidden } from "@redux/reducers/tableSlice";
import Add from "./Add";
import Action from "./Action";
import Delete from "./Delete";
import Edit from "./Edit";
import Search from "./Search";

const initialState: InitalState = {
  pagination: {
    current: 1,
    pageSize: PAGE_SIZE,
    pageSizeOptions: PAGE_LIMIT,
    showSizeChanger: true
  },
  data: [],
  loading: false,
  selectedRowKeys: [],
  updated: 0
}
const Setting = () => {
  const tableKey = "setting";
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);
  const fetchData = async () => {
    try {
      setState(prevState => ({
        ...prevState,
        loading: true
      }))
      const response = await API.getAll({
        pageSize: state.pagination.pageSize,
        current: state.pagination.current,
        searchColumn: SEARCH_COLUMNS,
        search: state?.filters,
        field: state.sort?.field,
        order: state.sort?.order
      });
      setState((prevState) => ({
        ...prevState,
        data: response.data.data,
        selectedRowKeys: [],
        pagination: {
          ...prevState.pagination,
          total: response.data.recordsFiltered,
        },
      }))
    } catch (ex) {
      message.open({
        type: "error",
        content: ex?.response?.data?.message || ex?.message || "Đã xảy ra lỗi"
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false
      }))
    }
  }
  useEffect(() => {
    fetchData();
  }, [state.filters, state.pagination.current, state.sort, state.updated]);
  const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any>) => {
    setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        ...filters
      },
      pagination: {
        ...prevState.pagination,
        current: pagination.current || 1,
        pageSize: pagination.pageSize || PAGE_SIZE
      },
      sort: {
        field: sorter.field?.toString(),
        order: sorter.order,
      }
    }))
  }
  const handleReload = () => {
    setState(prevState => ({
      ...prevState,
      updated: prevState.updated + 1
    }))
  }
  const TABLE_COLUMNS: ColumnsType<SettingState> = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      sorter: true,
      showSorterTooltip: false,
      render: (value: string) => {
        return (
          <span>{value}</span>
        )
      }
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      sorter: true,
      showSorterTooltip: false,
      render: (value: any, record) => {
        return (
          <>
            {
              record.type == "string" || record.type == "number" ? <span>{value}</span> :
                record.type == "boolean" ?
                  <Button type={value === "true" ? "primary" : "default"}>{value === "true" ? "Active" : "Deactive"}</Button> :
                  <Tooltip title={value}>
                    <Button>{record.type}</Button>
                  </Tooltip>
            }
          </>
        )
      }
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: true,
      showSorterTooltip: false,
      filters: [...convertFilter(TYPES)],
      render: (value: string) => {
        return (
          <Button>{value}</Button>
        )
      }
    },
    {
      title: "Required",
      dataIndex: "required",
      key: "required",
      sorter: true,
      showSorterTooltip: false,
      filters: [...convertFilter(REQUIRES)],
      render: (value: boolean) => {
        return (
          <Button type={value ? "primary" : "default"}>{value ? "Active" : "Deactive"}</Button>
        )
      }
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      sorter: true,
      showSorterTooltip: false,
      render: (value: string) => {
        return (
          <>
            {value ? <Tooltip title={value}><Button>Note</Button></Tooltip> : ""}
          </>
        )
      }
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (_: string, record) => {
        return (
          <>
            <Space>
              <Edit item={record} onReload={handleReload} />
              <Delete item={record} onReload={handleReload} />
            </Space>
          </>
        )
      }
    }
  ];

  // visible columns
  const hiddenColumns = useAppSelector((state) => state.table[tableKey]);
  if (!hiddenColumns) {
    dispatch(initTable(tableKey));
  }

  const handleColumnVisibility = (column: string) => {
    dispatch(toggleColumnHidden({
      table: tableKey,
      column
    }))
  };
  const VISIBLE_COLUMNS = TABLE_COLUMNS.filter(
    (column) => !hiddenColumns.includes(String(column.key))
  );

  const items: MenuProps["items"] = TABLE_COLUMNS.map((column) => ({
    key: column.key,
    label: (
      <Checkbox
        checked={!hiddenColumns.includes(String(column.key))}
        onChange={() => handleColumnVisibility(String(column.key))}
      >
        {String(column.title)}
      </Checkbox>
    )
  }));

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ITEM_NAME}</title>
      </Helmet>
      <Card style={{
        marginTop: 16
      }}>
        <Row gutter={[16, 16]} className="row-actions">
          <Col md={12} sm={24} className="ant-col-filters">
            <Tooltip title="Reload">
              <Button icon={<ReloadOutlined />} onClick={handleReload} loading={state.loading} />
            </Tooltip>
            <Dropdown menu={{ items }}>
              <Button icon={<SettingOutlined />} />
            </Dropdown>
            <Search
              setState={setState}
            />
          </Col>
          <Col md={12} sm={24} className="right-aligned ant-col-actions">
            <Space>
              <Action ids={state.selectedRowKeys} onReload={handleReload} />
              <Add onReload={handleReload} />
            </Space>
          </Col>
        </Row>
        <Table
          scroll={{ x: 1000 }}
          columns={VISIBLE_COLUMNS}
          onChange={handleTableChange}
          dataSource={state.data}
          pagination={state.pagination}
          loading={state.loading}
          tableLayout="auto"
          rowKey="id"
          rowSelection={{
            selectedRowKeys: state.selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            onChange: (key: React.Key[]) => {
              setState(prevState => ({
                ...prevState,
                selectedRowKeys: key
              }))
            }
          }}
        />
      </Card>
    </>
  );
}

export default Setting;