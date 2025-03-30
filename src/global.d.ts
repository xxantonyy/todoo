import { StoreEnhancer } from 'redux';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: (args: { trace: boolean }) => StoreEnhancer<
      {
        dispatch: unknown;
      },
      object
    >;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(): any;
    __data: any; // initial redux state, maybe undefined
  }

declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare const __PLATFORM__: 'mobile' | 'desktop';
declare const __ENV__: 'production' | 'development';
declare const __API__: string;
