import React, { useState, useEffect } from "react";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchProps } from "@typings/datatable";
import { useDebounce } from "@utils";

const Search: React.FC<SearchProps> = ({ setState }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        if (setState) setState(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            keyword: debouncedSearchTerm
          },
          pagination: {
            ...prevState.pagination,
            current: 1
          },
          updated: prevState.updated + 1
        }))
      } else {
        if (setState) setState(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            keyword: ""
          },
          pagination: {
            ...prevState.pagination,
            current: 1
          },
          updated: prevState.updated + 1
        }))
      }
    },
    [debouncedSearchTerm]
  );
  return (
    <>
      <Space>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Space>
    </>
  )
};

export default Search;