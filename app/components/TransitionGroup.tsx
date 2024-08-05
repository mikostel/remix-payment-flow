import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from '@remix-run/react';
import clsx from 'clsx';

interface TransitionGroupProps {
  path: string;
  title: string;
  step: number;
  canEdit?: boolean;
}

const TransitionGroup = ({
  path,
  title,
  step,
  canEdit
}: TransitionGroupProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOpen = location.pathname.includes(path);

  const handleEdit = () => {
    navigate(`${path}`, { state: { ...location.state } });
  };

  return (
    <li className="px-8 md:px-12">
      <div className="flex gap-4 items-center py-5">
        <div
          className={clsx('w-6 h-6 font-semibold rounded-full text-center', {
            'bg-abc-active text-white': isOpen,
            'bg-abc-grey-30 text-abc-grey-80': !isOpen
          })}
        >
          {step}
        </div>
        <h2>{title}</h2>
        {canEdit && !isOpen && (
          <button
            onClick={handleEdit}
            className="font-bold text-abc-active hover:text-abc-primary focus:text-abc-primary ml-auto"
          >
            Edit
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet /> {/* This is where the child route will render */}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default TransitionGroup;
