// This file is created by egg-ts-helper@1.33.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCard from '../../../app/controller/card';
import ExportDataset from '../../../app/controller/dataset';
import ExportReport from '../../../app/controller/report';
import ExportTemplate from '../../../app/controller/template';

declare module 'egg' {
  interface IController {
    card: ExportCard;
    dataset: ExportDataset;
    report: ExportReport;
    template: ExportTemplate;
  }
}
