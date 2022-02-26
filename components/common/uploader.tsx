import { CameraIcon } from '@heroicons/react/solid';
import React, { useRef } from 'react';

type FileTypes =
  | 'document'
  | 'image'
  | 'presentation'
  | 'source'
  | 'video'
  | 'all'
  | 'model';

interface IProps {
  text?: string;
  disabled?: boolean;
  id: string;
  //@ts-ignore
  onChange: (event) => void;
  classNames?: string;
  accept: FileTypes;
  hidden?: boolean;
  variant?: 'button' | 'svg';
}

const UploadButtons: React.FC<IProps> = (props) => {
  const {
    onChange,
    text,
    disabled,
    id,
    classNames,
    accept,
    hidden,
    variant = 'button',
  } = props;
  const returnAcceptType = () => {
    switch (accept) {
      case 'document':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/pdf';
      case 'image':
        return 'image/png,image/jpeg,image/webp';
      case 'presentation':
        return 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf';
      case 'source':
        return 'application/json,text/javascript,text/html,text/css';
      case 'video':
        return 'video/mp4';
      case 'model':
        return 'model/stl';
      default:
        return '*';
    }
  };
  const uploadRef = useRef<HTMLInputElement>();
  if (variant === 'svg') {
    return (
      <div
        className="cursor-pointer mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center items-center"
        //@ts-ignore
        onClick={() => uploadRef.current.click()}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
            //@ts-ignore
            // onClick={() => uploadRef.current.click()}
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                onChange={onChange}
                className="sr-only"
                accept={returnAcceptType()}
                autoComplete="nope"
                hidden
                //@ts-ignore
                ref={uploadRef}
              />
            </label>
            <p className="pr-1">{text}</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF, STL up to 10MB</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <input
        hidden
        autoComplete="nope"
        id={id}
        type="file"
        onChange={onChange}
        //@ts-ignore
        ref={uploadRef}
        accept={returnAcceptType()}
      />
      {!hidden && (
        <button
          hidden={hidden}
          disabled={disabled}
          className={classNames}
          //@ts-ignore
          onClick={() => uploadRef.current.click()}
        >
          {text} <CameraIcon />
        </button>
      )}
    </div>
  );
};

export default UploadButtons;
