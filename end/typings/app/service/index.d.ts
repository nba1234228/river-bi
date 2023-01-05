// This file is created by egg-ts-helper@1.33.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCard from '../../../app/service/card';
import ExportDataset from '../../../app/service/dataset';
import ExportReport from '../../../app/service/report';
import ExportTemplate from '../../../app/service/template';
import ExportCommonFilefs from '../../../app/service/common/filefs';
import ExportCommonPage from '../../../app/service/common/page';

declare module 'egg' {
  interface IService {
    card: AutoInstanceType<typeof ExportCard>;
    dataset: AutoInstanceType<typeof ExportDataset>;
    report: AutoInstanceType<typeof ExportReport>;
    template: AutoInstanceType<typeof ExportTemplate>;
    common: {
      filefs: AutoInstanceType<typeof ExportCommonFilefs>;
      page: AutoInstanceType<typeof ExportCommonPage>;
    }
  }
}
