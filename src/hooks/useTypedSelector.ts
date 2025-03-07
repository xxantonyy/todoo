import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

export const useTypedSelector = useSelector.withTypes<RootState>();
