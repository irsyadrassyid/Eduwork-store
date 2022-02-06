import { FaFileInvoiceDollar } from "@meronex/icons/fa";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, LayoutOne, Table, Text } from "upkit";
import { getOrder } from "../../app/api/order";
import TopBar from "../../components/TopBar";

const columns = [
  {
    Header: "",
    id: "Status",
    accessor: (order) => {
      return (
        <div>
          #{order.order_number} <br />
        </div>
      );
    },
  },
  {
    Header: "Items",
    accessor: (order) => {
      return (
        <div>
          {order.order_item.map((item) => {
            return (
              <div key={item._id}>
                {item.name} {item.qty}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    Header: "Total",
    accessor: (order) => {
      return <div>{order.delivery_fee}</div>;
    },
  },
  {
    Header: "Invoice",
    accessor: (order) => {
      return (
        <div>
          <Link to={`/invoice/${order._id}`}>
            <Button color="gray" iconBefore={<FaFileInvoiceDollar />}>
              Invoice
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default function UserOrder() {
  const [pesanan, setPesanan] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchPesanan = useCallback(async () => {
    setStatus("process");

    let { data } = await getOrder({ limit, page });

    if (data.error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setPesanan(data.data);
    setCount(data.count);
  }, [page, limit]);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);
  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Pesanan Anda </Text>
      <br />

      <Table
        items={pesanan}
        totalItems={count}
        columns={columns}
        onPageChange={(page) => setPage(page)}
        page={page}
        isLoading={status === "process"}
      />
    </LayoutOne>
  );
}
