import {
  Button,
  Dialog,
  IconButton,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import {
  IoClose,
  IoWarning,
  IoCheckmark,
  IoInformationCircle,
} from 'react-icons/io5';

const types = {
  success: {
    icon: <IoCheckmark className="text-green-500 size-14" />,
    buttonColor: 'green',
  },
  error: {
    icon: <IoClose className="text-red-500 size-14" />,
    buttonColor: 'red',
  },
  info: {
    icon: <IoInformationCircle className="text-blue-500 size-14" />,
    buttonColor: 'blue',
  },
  warn: {
    icon: <IoWarning className="text-gray-400 size-14" />,
    buttonColor: 'blue',
  },
  delete: {
    icon: <FaTrashRestoreAlt className="text-gray-400 size-14" />,
    buttonColor: 'red',
  },
};

const Modal = ({
  open,
  onClose,
  cancelLabel,
  onCancel,
  acceptLabel,
  acceptColor,
  onAccept,
  onlyCancel = false,
  type = 'info',
  title,
  description,
  icon,
}) => {
  return (
    <Dialog size="xs" open={open} handler={onClose}>
      <DialogHeader>
        <IconButton variant="text" className="ml-auto" onClick={onClose}>
          <IoClose className="text-gray-500 size-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex flex-col items-center text-center text-gray-500">
        {icon ? icon : type ? types[type].icon : null}
        <h6 className="mt-6 mb-1 text-xl font-bold">{title}</h6>
        <p className="text-lg">{description}</p>
      </DialogBody>
      <DialogFooter className="flex items-center justify-center gap-2 mb-7">
        <Button
          variant="outlined"
          color={acceptColor || types[type].buttonColor}
          onClick={onCancel || onClose}
          className="capitalize"
        >
          <span>{cancelLabel || 'Cancel'}</span>
        </Button>
        {!onlyCancel && (
          <Button
            variant="gradient"
            color={acceptColor || types[type].buttonColor}
            onClick={onAccept}
            className="capitalize"
          >
            {acceptLabel || 'Accept'}
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default Modal;
