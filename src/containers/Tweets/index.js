import TweetCard from '@components/TweetCard';
import {
  CellMeasurer, CellMeasurerCache, List, WindowScroller,
} from 'react-virtualized';
import { useEffect, useState } from 'react';
import { InfiniteScroll, PullToRefresh } from 'antd-mobile';
import { getNewsFeeds } from '@services/tweets';
// import style from './index.module.scss';

const defaultData = [];

/**
* Tweets page
*/
const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 50,
});
const noRowsRenderer = () => 'Loading...';

const Tweets = () => {
  const [data, setData] = useState(defaultData);
  // initialize some tweets data
  useEffect(() => {
    const init = async () => {
      const res = await getNewsFeeds();
      setData(res);
    };
    init();
  }, []);
  const rowRenderer = ({
    index, key, style: sy, parent,
  }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ registerChild }) => (
        <div style={sy} key={key} ref={registerChild}>
          <TweetCard dataSource={data[index]} />
        </div>
      )}
    </CellMeasurer>
  );

  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = async () => {
    const res = await getNewsFeeds();
    setData((prevValue) => [...prevValue, ...res]);
    // temporary solution, since we always return 2 more tweets after sending requests
    if (res.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <>
      <PullToRefresh onRefresh={async () => {
        const res = await getNewsFeeds();
        setData((prevValue) => [...prevValue, ...res]);
      }}
      >
        <WindowScroller>
          {({
            isScrolling, registerChild, onChildScroll, height, scrollTop,
          }) => (
            <div ref={registerChild}>
              <List
                height={height}
                overscanRowCount={3}
                deferredMeasurementCache={cache}
                noRowsRenderer={noRowsRenderer}
                rowCount={data.length}
                rowRenderer={rowRenderer}
                width={360}
                rowHeight={cache.rowHeight}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                autoHeight
                scrollTop={scrollTop}
              />
            </div>
          )}
        </WindowScroller>
      </PullToRefresh>
      <InfiniteScroll hasMore={hasMore} loadMore={handleLoadMore} />
    </>
  );
};

export default Tweets;
