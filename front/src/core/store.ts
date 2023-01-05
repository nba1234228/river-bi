import { createStore } from 'vuex';
import root from '@/core/root';
import reportHome from '@/views/reportHome/store';
import reportPreview from '@/views/reportPreview/store';
import reportDesign from '@/views/reportDesign/store/index';
import cardDesign from '@/components/cardDesign/store/index';

export default createStore({
  modules: {
    root,
    reportHome,
    reportPreview,
    ...reportDesign,
    ...cardDesign,
  },
});
