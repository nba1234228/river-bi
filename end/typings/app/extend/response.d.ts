// This file is created by egg-ts-helper@1.33.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendResponse from '../../../app/extend/response';
type ExtendResponseType = typeof ExtendResponse;
declare module 'egg' {
  interface Response extends ExtendResponseType { }
}