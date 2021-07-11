import {Result} from 'antd';
import {ResultStatusType} from 'antd/lib/result';
import React from 'react';
import BaseButton from '../Buttons/BaseButton';
import BoldLabel from '../shared/BoldLabel';

interface AsyncResultProps {
  status?: ResultStatusType;
  title?: string;
  onActionButtonClick?: () => void;
}

const AsyncResult: React.FC<AsyncResultProps> = ({
  status,
  title,
  onActionButtonClick,
}) => (
  <Result
    extra={
      <BaseButton
        onClick={onActionButtonClick}
        testId="refetch-button"
        type="primary"
      >
        <BoldLabel>Retry</BoldLabel>
      </BaseButton>
    }
    status={status}
    subTitle={<BoldLabel>Oops! Something went wrong!!</BoldLabel>}
    title={title || status}
  />
);

export default AsyncResult;
