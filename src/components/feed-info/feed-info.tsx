import { FC } from 'react';
import { useSelector } from '../../services/store';
import {
  selectFeedList,
  selectFeedTotal,
  selectFeedToday
} from '../../services/slices/feedSlice';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';

const extractNumbers = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedList);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedToday);

  const done = extractNumbers(orders, 'done');
  const pending = extractNumbers(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={done}
      pendingOrders={pending}
      feed={{ total, totalToday }}
    />
  );
};
