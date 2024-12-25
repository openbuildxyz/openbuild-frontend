import clsx from 'clsx';

import { Card, CardHeader, CardBody, CardFooter } from '@/controls';

import type { Post } from '../../typing';

type PostCardWidgetProps = {
  dataSource: Post;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

function PostCardWidget({ dataSource, className, headerClassName, bodyClassName, footerClassName }: PostCardWidgetProps) {
  return (
    <Card className={className}>
      <CardHeader className={clsx('flex-col items-start leading-none', headerClassName)}>
        <span className="text-lg/tight font-semibold">{dataSource.title}</span>
      </CardHeader>
      <CardBody className={clsx('py-0 text-sm font-light break-all', bodyClassName)}>{dataSource.description || 'No description'}</CardBody>
      <CardFooter className={footerClassName}>
        {[dataSource.date.getFullYear(), (dataSource.date.getMonth() + 1), dataSource.date.getDate()].join('-')}
      </CardFooter>
      <a
        className="absolute inset-0 z-50"
        href={dataSource.url}
        target="_blank"
        rel="external nofollow"
      />
    </Card>
  );
}

export default PostCardWidget;
