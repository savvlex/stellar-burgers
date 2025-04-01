import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { selectFeedList } from '../../services/slices/feedSlice';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feedData = useSelector(selectFeedList);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [feedData]);

  if (!feedData.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={feedData} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
