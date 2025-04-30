import { FC } from 'react';
import { OrdersListProps } from './type';
import { OrderCard } from '@components';

export const OrdersList: FC<OrdersListProps> = ({ orders }) => (
  <div>
    {orders.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
