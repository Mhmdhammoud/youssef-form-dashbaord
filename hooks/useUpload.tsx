import React, { useState } from 'react';
import { useUploadFileMutation } from '../src/generated/graphql';

const useUpload = () => {
  const [isUploaded, setIsUploaded] = useState<boolean>(true);

  const [upload, { loading, error }] = useUploadFileMutation({
    notifyOnNetworkStatusChange: true,
  });

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploaded(false);

    if (event.target.files) {
      console.log(event.target.files[0]);
      return upload({ variables: { file: event.target.files[0] } })
        .then((res) => {
          setIsUploaded(true);
          return res?.data?.uploadFile?.file;
        })
        .catch((err) => {
          setIsUploaded(false);
          console.log(err);
        });
    }
  };

  return {
    isUploaded,
    handleUpload,
    loading,
    error,
  };
};

export default useUpload;
