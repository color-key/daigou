import React, {CSSProperties, ReactNode} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import End from './end';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      overflow: "auto",
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
  })
);

interface Props{
  next: () => any;
  hasMore: boolean;
  children: ReactNode;
  loader?: ReactNode;
  style?: CSSProperties;
  height?: number | string;
  dataLength: number;
  initialScrollY?: number;
  key?: string;
  className?: string;
}

const Loading = () => <div style={{textAlign: 'center'}}><CircularProgress size={24}/></div>;

export default ({hasMore=true, loader, children, next, dataLength, className, ...props}: Props) => {
  const classes = useStyles();

  const autoNext = () => {
    const dom = document.getElementById('components-infinite-scroll');
    if(dom && dataLength > 0 && dom.clientHeight > dom.scrollHeight - 17* dataLength){
      next();
    }
  };

  React.useEffect(() => {
    window.onresize = () => {
      hasMore && autoNext();
    }
  });

  React.useEffect(() => {
    hasMore && autoNext();
  }, [dataLength]);

  return (
    <div id="components-infinite-scroll" className={clsx(classes.root, className)}>
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={loader || <Loading/>}
        scrollableTarget="components-infinite-scroll"
        endMessage={<End/>}
        {...props}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
}
